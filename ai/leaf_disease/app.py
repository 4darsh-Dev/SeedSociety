import gradio as gr
import torch
import torchvision.transforms as transforms
from PIL import Image
import json
import os
from leaf_disease_predict import ResNet9, load_model, predict_image, CLASS_NAMES

# Load the model
model_path = 'ai/leaf_disease/model/leaf_disease_res50_model_epoch_10.pth'
model = load_model(model_path)
model.eval()

# Define the prediction function
def predict(image):
    # Convert Gradio image input to PIL image
    image = Image.fromarray(image.astype('uint8'), 'RGB')
    
    # Save the uploaded file temporarily
    temp_image_path = "temp_image.jpg"
    image.save(temp_image_path)
    
    # Make prediction
    prediction = predict_image(temp_image_path, model)
    
    # Remove temporary file
    os.remove(temp_image_path)
    
    # Get confidence scores
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.ToTensor(),
    ])
    img_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(img_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
    
    # Get top 5 predictions
    top5_prob, top5_catid = torch.topk(probabilities, 5)
    top_predictions = {CLASS_NAMES[top5_catid[i]]: top5_prob[i].item()*100 for i in range(top5_prob.size(0))}
    
    # Create a JSON response
    response = {
        "prediction": prediction,
        "confidence_scores": top_predictions
    }
    
    # For the image output, we'll just return the original image for now
    # You can modify this part to add a bounding box if your model provides localization
    return json.dumps(response), image

# Define Gradio interface
iface = gr.Interface(
    fn=predict,
    inputs=gr.Image(),
    outputs=[gr.JSON(label="Prediction Result"), gr.Image(label="Processed Image")],
    title="Plant Disease Predictor",
    description="Upload an image of a plant leaf to predict if it has a disease."
)

# Launch the app
iface.launch()