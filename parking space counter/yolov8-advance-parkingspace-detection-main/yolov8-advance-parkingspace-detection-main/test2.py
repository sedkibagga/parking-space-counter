import cv2
import numpy as np
import pickle
import pandas as pd
from ultralytics import YOLO
import cvzone
import websockets
import asyncio
import json
from threading import Thread
import time

# Load zone data
with open("ps", "rb") as f:
    data = pickle.load(f)
    polylines, area_names = data['polylines'], data['area_names']

# Load class list
with open("coco.txt", "r") as my_file:
    class_list = my_file.read().split("\n")

# Load YOLO model
try:
    model = YOLO('yolov8s.pt')
except Exception as e:
    print(f"Error loading YOLO model: {e}")

cap = cv2.VideoCapture('easy1.mp4')

# Initialize zone status
zone_status = {i+1: 'free' for i in range(len(polylines))}
frame_counter = 0
sync_interval = 300
ws_connected = False

class WebSocketClient:
    def __init__(self):
        self.websocket = None
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
        self.connected = False
        
    async def connect(self):
        uri = "ws://localhost:8080/ws"
        try:
            self.websocket = await websockets.connect(uri)
            print("WebSocket connected")
            self.connected = True
            
            # Subscribe to zone status updates
            await self.websocket.send(json.dumps({
                "type": "subscribe",
                "destination": "/topic/zones/status"
            }))
            
            # Start listening for messages
            asyncio.create_task(self.receive_messages())
            return True
        except Exception as e:
            print(f"WebSocket connection error: {e}")
            self.connected = False
            return False
        
    async def receive_messages(self):
        try:
            while self.connected:
                message = await self.websocket.recv()
                data = json.loads(message)
                if isinstance(data, list):  # Zone status updates
                    for zone in data:
                        zone_status[zone['zoneId']] = zone['status']
        except Exception as e:
            print(f"WebSocket receive error: {e}")
            self.connected = False
            
    async def request_zones(self, status_type):
        if not self.connected:
            print(f"WebSocket not connected, cannot request {status_type} zones")
            return False
        try:
            await self.websocket.send(json.dumps({
                "type": "request",
                "destination": f"/app/zones/request/{status_type}"
            }))
            return True
        except Exception as e:
            print(f"Error requesting {status_type} zones: {e}")
            self.connected = False
            return False
            
    async def update_zone_status(self, zone_id, status):
        if not self.connected:
            print(f"WebSocket not connected, cannot update zone {zone_id}")
            return False
        try:
            await self.websocket.send(json.dumps({
                "type": "update",
                "destination": "/app/zones/updateStatus",
                "zoneId": zone_id,
                "status": status
            }))
            print(f"Sent update for zone {zone_id}: {status}")
            return True
        except Exception as e:
            print(f"Error updating zone status: {e}")
            self.connected = False
            return False
            
    def start(self):
        try:
            self.loop.run_until_complete(self.connect())
        except Exception as e:
            print(f"Failed to start WebSocket client: {e}")
        
    def stop(self):
        if self.websocket and self.connected:
            try:
                self.loop.run_until_complete(self.websocket.close())
            except:
                pass
        self.loop.close()

# Create and start WebSocket client
ws_client = WebSocketClient()
ws_thread = Thread(target=ws_client.start)
ws_thread.daemon = True
ws_thread.start()

# Wait a moment for connection to establish
time.sleep(2)

def process_frame(frame):
    global frame_counter
    
    frame = cv2.resize(frame, (1020, 500))
    results = model.predict(frame)
    detections = results[0].boxes.data

    if len(detections) == 0:
        print("No detections in the frame.")

    detected_cars = pd.DataFrame(detections).astype("float")

    car_centers = []
    for _, row in detected_cars.iterrows():
        x1, y1, x2, y2 = map(int, row[:4])
        class_id = int(row[5])
        class_name = class_list[class_id]
        if 'car' in class_name:
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
            car_centers.append([cx, cy])

    for i, polyline in enumerate(polylines):
        zone_id = i + 1
        color = (0, 255, 0) if zone_status[zone_id] == 'free' else (0, 0, 255)
        cv2.polylines(frame, [polyline], True, color, 2)
        cvzone.putTextRect(frame, f'{area_names[i]}', tuple(polyline[0]), 1, 1)

        # Check if any car is in the zone
        occupied = False
        for cx, cy in car_centers:
            result = cv2.pointPolygonTest(polyline, (cx, cy), False)
            if result >= 0:
                occupied = True
                cv2.circle(frame, (cx, cy), 5, (255, 0, 0), -1)

        # Update zone status if changed
        new_status = 'occupied' if occupied else 'free'
        if zone_status[zone_id] != new_status:
            zone_status[zone_id] = new_status
            if ws_client.connected:
                try:
                    asyncio.run(ws_client.update_zone_status(zone_id, new_status))
                except:
                    ws_client.connected = False

    # Synchronize zone status periodically
    if frame_counter % sync_interval == 0 and ws_client.connected:
        try:
            asyncio.run(ws_client.request_zones("free"))
            asyncio.run(ws_client.request_zones("occupied"))
        except:
            ws_client.connected = False
        frame_counter = 0

    # Display free and occupied zones count
    free_zones = sum(1 for status in zone_status.values() if status == 'free')
    occupied_zones = len(zone_status) - free_zones
    cvzone.putTextRect(frame, f'FREE: {free_zones}', (50, 60), 2, 2)
    cvzone.putTextRect(frame, f'OCCUPIED: {occupied_zones}', (50, 160), 2, 2)

    cv2.imshow('FRAME', frame)
    frame_counter += 1

count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to capture frame, restarting...")
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        continue

    count += 1
    if count % 3 != 0:  # Process every 3rd frame
        continue

    process_frame(frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Cleanup
ws_client.stop()
ws_thread.join()
cap.release()
cv2.destroyAllWindows()