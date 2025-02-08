## FLASK SERVER Guide

### Features
1. jwt authentication
2. tree plantation detection model with yolov8


### Local setup

1. create virtual env
```bash
    python -m venv myenv
```
2. activating virtual env
- windows 
```bash
    ./myenv/Scripts/Activate
```

- linux
```bash
    source myenv/bin/activate
```

3. Installing necessary files
```bash
    pip install -r requirements.txt
```

3. Starting Flask server
```bash
    python app.py
```

### Sample curl request
```bash
    curl -X POST -H "Authorization: Bearer <JWT_TOKEN>" \
     -F "file=@planting_activity.jpg" \
     http://localhost:6000/detect
```
