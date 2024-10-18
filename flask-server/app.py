from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np


from dl import get_pred_labels, predict_image_label, plot_pred_conf

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def home():
    return "<h1>Hello World</h1>"


# Define a directory to save the uploaded files temporarily
UPLOAD_FOLDER = 'uploaded_images'  # Update this to an appropriate directory
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)  # Save the file to the specified path

    # Log the full path for debugging
    print("File saved at:", file_path)
    
    # Pass the file path to your model
    predicted_breed = str()  # Replace this with your prediction logic

    # Processing the Image

    #Finding the Predicted Probabilities / Confidence Levels
    pred_probs = predict_image_label(file_path)

    predicted_breed = get_pred_labels(pred_probs)

    # Generate the plot of prediction confidences
    pred_values, pred_labels = plot_pred_conf(pred_probs, filename)

    # Clean up the saved file after processing, if necessary
    os.remove(file_path)

    # Prepare the predicted values and labels
    # pred_values = pred_values  # Convert to a list if necessary
    # pred_labels = pred_labels)  # Ensure this is a list of breed names

    # print("Predicted Values:", pred_values)
    # print("Predicted Labels:", pred_labels)

    # print("Data Sent...")
    # Return the prediction and image path

    # response_data = {
    #     "breed": predicted_breed,
    #     "value0": pred_values[0],
    #     "value1": pred_values[1],
    #     "value2": pred_values[2],
    #     "value3": pred_values[3],
    #     "value4": pred_values[4],
    #     "value5": pred_values[5],
    #     "value6": pred_values[6],
    #     "value7": pred_values[7],
    #     "value8": pred_values[8],
    #     "value9": pred_values[9],
    #     "label0": pred_labels[0],
    #     "label1": pred_labels[1],
    #     "label2": pred_labels[2],
    #     "label3": pred_labels[3],
    #     "label4": pred_labels[4],
    #     "label5": pred_labels[5],
    #     "label6": pred_labels[6],
    #     "label7": pred_labels[7],
    #     "label8": pred_labels[8],
    #     "label9": pred_labels[9]  }
    
    response_data = [
        {
            "breed" : predicted_breed
        },
        {
            "value" : str(pred_values[0]),
            "label": str(pred_labels[0])
        },
        {
            "value" :str(pred_values[1]),
            "label": str(pred_labels[1])
        },
        {
            "value" :str(pred_values[2]),
            "label": str(pred_labels[2])
        },
        {
            "value" :str(pred_values[3]),
            "label": str(pred_labels[3])
        },
        {
            "value" :str(pred_values[4]),
            "label": str(pred_labels[4])
        },
        {
            "value" :str(pred_values[5]),
            "label": str(pred_labels[5])
        }
        # {
        #     "value" :str(pred_values[6]),
        #     "label": str(pred_labels[6])
        # },
        # {
        #     "value" :str(pred_values[7]),
        #     "label": str(pred_labels[7])
        # },
        # {
        #     "value" :str(pred_values[8]),
        #     "label": str(pred_labels[8])
        # },
        # {
        #     "value" :str(pred_values[9]),
        #     "label": str(pred_labels[9])
        # }
    ]
    print(response_data)
    return jsonify(response_data)


if __name__ == "__main__":
    app.run(debug=True)
