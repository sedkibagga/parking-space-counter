// src/services/websocket.ts
import { Client, IFrame, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ReservationResponse, ZoneStatus } from '../DataResponse/dataResponse';



type WebSocketCallbacks = {
  onZonesUpdate?: (zones: ZoneStatus[]) => void;
  onReservationResponse?: (response: ReservationResponse) => void;
  onOccupiedZones?: (zones: ZoneStatus[]) => void;
  onFreeZones?: (zones: ZoneStatus[]) => void;
  onConnected?: () => void;
};

class WebSocketService {
  private client: Client | null = null;
  private subscriptions: Record<string, any> = {};
  private callbacks: WebSocketCallbacks = {};

  constructor() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.reserveZone = this.reserveZone.bind(this);
    this.requestOccupiedZones = this.requestOccupiedZones.bind(this);
    this.requestFreeZones = this.requestFreeZones.bind(this);
  }

  public connect(token: string): void {
    if (this.client && this.client.connected) return;

    this.client = new Client({
      //brokerURL: 'http://192.168.1.2:8080/ws',
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('http://192.168.1.2:8080/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log('WebSocket connected');
        this.subscribeToChannels();
        if (this.callbacks.onConnected) {
          this.callbacks.onConnected();
        }
      },
      onStompError: (frame: IFrame) => {
        console.error('WebSocket error:', frame);
      },
      onDisconnect: () => {
        console.log('WebSocket disconnected');
      },
      onWebSocketError: (error: Event) => {
        console.error('WebSocket error:', error);
      }
    });

    this.client.activate();
  }

  public disconnect(): void {
    if (this.client) {
      this.unsubscribeAll();
      this.client.deactivate();
      this.client = null;
    }
  }

  public setCallbacks(callbacks: WebSocketCallbacks): void {
    this.callbacks = callbacks;
  }

  private subscribeToChannels(): void {
    this.subscriptions.zonesStatus = this.client?.subscribe(
      '/topic/zones/status',
      (message: IMessage) => {
        if (this.callbacks.onZonesUpdate) {
          this.callbacks.onZonesUpdate(JSON.parse(message.body));
        }
      }
    );

    this.subscriptions.privateReservations = this.client?.subscribe(
      '/user/queue/private/reservations',
      (message: IMessage) => {
        if (this.callbacks.onReservationResponse) {
          this.callbacks.onReservationResponse(JSON.parse(message.body));
        }
      }
    );

    this.subscriptions.occupiedZones = this.client?.subscribe(
      '/topic/zones/occupied',
      (message: IMessage) => {
        if (this.callbacks.onOccupiedZones) {
          this.callbacks.onOccupiedZones(JSON.parse(message.body));
        }
      }
    );

    this.subscriptions.freeZones = this.client?.subscribe(
      '/topic/zones/free',
      (message: IMessage) => {
        if (this.callbacks.onFreeZones) {
          this.callbacks.onFreeZones(JSON.parse(message.body));
        }
      }
    );
  }

  private unsubscribeAll(): void {
    Object.values(this.subscriptions).forEach((sub) => sub.unsubscribe());
    this.subscriptions = {};
  }

  public reserveZone(zoneId: number, reservation: any): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/zones/reserve',
        body: JSON.stringify(reservation),
        headers: { zoneId: zoneId.toString() },
      });
    }
  }

  public requestOccupiedZones(): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/zones/request/occupied',
        body: '',
      });
    }
  }

  public requestFreeZones(): void {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination: '/app/zones/request/free',
        body: '',
      });
    }
  }
}

export const webSocketService = new WebSocketService();