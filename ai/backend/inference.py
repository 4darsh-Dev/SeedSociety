import os
from ultralytics import YOLO
from PIL import Image
import uuid

class TreeDetectionModel:
    def __init__(self, model_path):
        """
        Initialize the YOLOv8 model for tree detection.
        Args:
            model_path (str): Path to the trained YOLOv8 model (.pt or .onnx).
        """
        self.model = YOLO(model_path)

    def detect(self, image_path):
        """
        Perform inference on an image.
        Args:
            image_path (str): Path to the input image.
        Returns:
            dict: Detection results including bounding boxes, class labels, and confidence scores.
        """
        results = self.model(image_path)
        detections = []

        for result in results:
            for box in result.boxes:
                detections.append({
                    'class': result.names[int(box.cls)],
                    'confidence': float(box.conf),
                    'bbox': box.xyxy.tolist()[0]
                })

        return detections

    def extract_geotag(self, image_path):
        """
        Extract GPS coordinates from the image's EXIF data.
        Args:
            image_path (str): Path to the input image.
        Returns:
            dict: Geotag information (latitude, longitude, altitude).
        """
        img = Image.open(image_path)
        exif_data = img._getexif()
        if exif_data:
            gps_info = exif_data.get(34853, {})
            return {
                'lat': gps_info.get(2),
                'lon': gps_info.get(4),
                'alt': gps_info.get(6)
            }
        return None