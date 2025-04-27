import { CreateReservationDto } from '../DataParam/dataParam';
import { ReservationResponse, ZoneStatus } from '../DataResponse/dataResponse';
import { webSocketService } from './websocket';

type ReservationCallbacks = {
  onZonesUpdate?: (zones: ZoneStatus[]) => void;
  onReservationResponse?: (response: ReservationResponse) => void;
  onOccupiedZones?: (zones: ZoneStatus[]) => void;
  onFreeZones?: (zones: ZoneStatus[]) => void;
};

export const initReservationService = (
  token: string,
  callbacks: ReservationCallbacks
): void => {
  webSocketService.setCallbacks(callbacks);
  webSocketService.connect(token);
};

export const cleanupReservationService = (): void => {
  webSocketService.disconnect();
};

export const createReservation = (
  zoneId: number,
  reservation: CreateReservationDto
): void => {
  webSocketService.reserveZone(zoneId, reservation);
};

export const getOccupiedZones = (): void => {
  webSocketService.requestOccupiedZones();
};

export const getFreeZones = (): void => {
  webSocketService.requestFreeZones();
};