import cv2
import numpy as np
import cvzone
import pickle

cap = cv2.VideoCapture('easy1.mp4')
drawing = False
area_names = []
polylines = []

# Try to load previously saved zones and names from the pickle file
try:
    with open("ps", "rb") as f:
        data = pickle.load(f)
        polylines, area_names = data['polylines'], data['area_names']
        print("Data loaded successfully from 'ps' file.")
except FileNotFoundError:
    print("No previous data found. Starting fresh.")
except Exception as e:
    print(f"Error loading data: {e}")
    polylines = []

points = []
current_name = ""

def draw(event, x, y, flags, param):
    global points, drawing, current_name
    if event == cv2.EVENT_LBUTTONDOWN:
        points = [(x, y)]  # Start a new polygon
        drawing = True
    elif event == cv2.EVENT_MOUSEMOVE:
        if drawing:
            points.append((x, y))  # Keep adding points to the polygon
    elif event == cv2.EVENT_LBUTTONUP:
        drawing = False
        # Prompt for the area name after finishing the zone trace
        current_name = input('Enter the name for the zone: ')
        if current_name:
            area_names.append(current_name)
            polylines.append(np.array(points, np.int32))
            points = []  # Reset points after saving the polygon
            save_data()  # Save data after each new zone

def save_data():
    """Save the current zones and names to the pickle file."""
    with open("ps", "wb") as f:
        data = {'polylines': polylines, 'area_names': area_names}
        pickle.dump(data, f)
        print("Data saved successfully.")

def delete_last_zone():
    """Delete the last zone traced."""
    if polylines and area_names:
        polylines.pop()  # Remove the last polygon
        area_names.pop()  # Remove the last area name
        save_data()  # Save the updated data
        print("Last zone deleted.")

while True:
    ret, frame = cap.read()
    if not ret:
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        continue
    frame = cv2.resize(frame, (1020, 500))

    # Draw previously saved zones
    for i, polyline in enumerate(polylines):
        cv2.polylines(frame, [polyline], True, (0, 0, 255), 2)
        cvzone.putTextRect(frame, f'{area_names[i]}', tuple(polyline[0]), 1, 1)

    cv2.imshow('FRAME', frame)
    cv2.setMouseCallback('FRAME', draw)

    key = cv2.waitKey(100) & 0xFF
    if key == ord('s'):
        save_data()  # Save when 's' is pressed
    elif key == ord('d'):  # Press 'd' to delete all saved data and reset
        reset_data()
        print("All data has been deleted. Start tracing new zones.")
    elif key == ord('z'):  # Press 'z' to delete the last traced zone
        delete_last_zone()

cap.release()
cv2.destroyAllWindows()
