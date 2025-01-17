import cv2
import numpy as np
import pickle
import pandas as pd
from ultralytics import YOLO
import cvzone
import requests

# Charger les polygones et les noms de zones
with open("ps", "rb") as f:
    data = pickle.load(f)
    polylines, area_names = data['polylines'], data['area_names']

# Charger les classes COCO
with open("coco.txt", "r") as my_file:
    data = my_file.read()
    class_list = data.split("\n")

# Charger le modèle YOLO
try:
    model = YOLO('yolov8s.pt')
except Exception as e:
    print(f"Error loading YOLO model: {e}")

cap = cv2.VideoCapture('easy1.mp4')

# Dictionnaire pour gérer l'état des zones
zone_status = {i: 'free' for i in range(len(polylines))}

# Compteur pour la synchronisation périodique
frame_counter = 0
sync_interval = 300  # Synchronize with server every 300 frames (adjust as needed)

def sync_zones_with_server():
    """Synchronise les états des zones avec le serveur Spring Boot."""
    try:
        response = requests.get("http://localhost:8080/api/zones/permit/free")
        if response.status_code == 200:
            print("free " , response)
            free_zones = response.json()
            for zone in free_zones:
                zone_status[zone['zoneId']] = 'free'
        response = requests.get("http://localhost:8080/api/zones/permit/occupied")
        if response.status_code == 200:
            occupied_zones = response.json()
            for zone in occupied_zones:
                  zone_status[zone['zoneId']] = 'occupied'
    except Exception as e:
        print(f"Erreur de synchronisation avec le serveur : {e}")

def update_server_status(zone_id, status):
    """Met à jour le statut d'une zone sur le serveur."""
    try:
        print(f"Updating Zone {zone_id} to {status}")  # Log status update
        response = requests.post(f"http://localhost:8080/api/zones/updateStatus/{zone_id}", params={'status': status})
        if response.status_code == 200:
            print(f"Zone {zone_id} mise à jour avec succès à {status}")
        else:
            print(f"Failed to update Zone {zone_id}, Status Code: {response.status_code}")
    except Exception as e:
        print(f"Erreur lors de la mise à jour du statut de la zone : {e}")

# Synchroniser l'état des zones avec le serveur au début
sync_zones_with_server()

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

    frame = cv2.resize(frame, (1020, 500))  # Resize frame for faster processing
    results = model.predict(frame)  # YOLO inference

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
        # Dessiner les polygones et points des voitures pour débogage
        color = (0, 255, 0) if zone_status[i] == 'free' else (0, 0, 255)
        cv2.polylines(frame, [polyline], True, color, 2)
        cvzone.putTextRect(frame, f'{area_names[i]}', tuple(polyline[0]), 1, 1)

        # Debugging: Dessiner les points des voitures
        for cx, cy in car_centers:
            cv2.circle(frame, (cx, cy), 5, (255, 0, 0), -1)

        # Vérifier si une voiture est dans la zone
        occupied = False
        for cx, cy in car_centers:
            result = cv2.pointPolygonTest(polyline, (cx, cy), False)
            if result >= 0:
                occupied = True
                cv2.circle(frame, (cx, cy), 5, (255, 0, 0), -1)

        # Mettre à jour l'état local et synchroniser avec le serveur
        new_status = 'occupied' if occupied else 'free'
        if zone_status[i] != new_status:
            zone_status[i] = new_status
            update_server_status(i, new_status)

    # Synchronize zone status with server every 300 frames (approximately every 10 seconds)
    if frame_counter % sync_interval == 0:
        sync_zones_with_server()
        frame_counter = 0

    # Afficher les zones occupées et libres
    free_zones = sum(1 for status in zone_status.values() if status == 'free')
    occupied_zones = len(zone_status) - free_zones
    cvzone.putTextRect(frame, f'FREE: {free_zones}', (50, 60), 2, 2)
    cvzone.putTextRect(frame, f'OCCUPIED: {occupied_zones}', (50, 160), 2, 2)

    cv2.imshow('FRAME', frame)

    frame_counter += 1
    if cv2.waitKey(0) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
