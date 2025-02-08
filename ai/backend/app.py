import os
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)
from PIL import Image
from dotenv import load_dotenv
import uuid
from inference import TreeDetectionModel  # Import the inference class

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS
api = Api(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'super-secret')
jwt = JWTManager(app)

# Load YOLOv8 model
model_path = "/home/kalie/work/projects/Community-Tree/ai/yolov8_model/best.pt"
tree_detector = TreeDetectionModel(model_path)  # Initialize the detection model

class DetectionResource(Resource):
    @jwt_required()
    def post(self):
        try:
            # Validate request
            if 'file' not in request.files:
                return {'error': 'No file uploaded'}, 400

            file = request.files['file']
            if file.filename == '':
                return {'error': 'Empty filename'}, 400

            # Save temporary image
            img_path = f"temp_{uuid.uuid4().hex}.jpg"
            file.save(img_path)

            # Run inference
            detections = tree_detector.detect(img_path)

            # Extract geotag
            geotag = tree_detector.extract_geotag(img_path)

            # Cleanup
            os.remove(img_path)

            return {
                'detections': detections,
                'geotag': geotag
            }, 200

        except Exception as e:
            return {'error': str(e)}, 500

# Authentication Endpoints
class Login(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        # Add your authentication logic here
        if username != 'admin' or password != 'secret':
            return {'error': 'Invalid credentials'}, 401

        access_token = create_access_token(identity=username)
        return {'access_token': access_token}, 200

# Add resources
api.add_resource(DetectionResource, '/detect')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000, debug=True)