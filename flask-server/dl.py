import numpy as np
# import matplotlib
# matplotlib.use('Agg')
import matplotlib.pyplot as plt

import tensorflow as tf
import tensorflow_hub as hub



unique_breeds= ['affenpinscher', 'afghan_hound', 'african_hunting_dog', 'airedale',
       'american_staffordshire_terrier', 'appenzeller',
       'australian_terrier', 'basenji', 'basset', 'beagle',
       'bedlington_terrier', 'bernese_mountain_dog',
       'black-and-tan_coonhound', 'blenheim_spaniel', 'bloodhound',
       'bluetick', 'border_collie', 'border_terrier', 'borzoi',
       'boston_bull', 'bouvier_des_flandres', 'boxer',
       'brabancon_griffon', 'briard', 'brittany_spaniel', 'bull_mastiff',
       'cairn', 'cardigan', 'chesapeake_bay_retriever', 'chihuahua',
       'chow', 'clumber', 'cocker_spaniel', 'collie',
       'curly-coated_retriever', 'dandie_dinmont', 'dhole', 'dingo',
       'doberman', 'english_foxhound', 'english_setter',
       'english_springer', 'entlebucher', 'eskimo_dog',
       'flat-coated_retriever', 'french_bulldog', 'german_shepherd',
       'german_short-haired_pointer', 'giant_schnauzer',
       'golden_retriever', 'gordon_setter', 'great_dane',
       'great_pyrenees', 'greater_swiss_mountain_dog', 'groenendael',
       'ibizan_hound', 'irish_setter', 'irish_terrier',
       'irish_water_spaniel', 'irish_wolfhound', 'italian_greyhound',
       'japanese_spaniel', 'keeshond', 'kelpie', 'kerry_blue_terrier',
       'komondor', 'kuvasz', 'labrador_retriever', 'lakeland_terrier',
       'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese_dog',
       'mexican_hairless', 'miniature_pinscher', 'miniature_poodle',
       'miniature_schnauzer', 'newfoundland', 'norfolk_terrier',
       'norwegian_elkhound', 'norwich_terrier', 'old_english_sheepdog',
       'otterhound', 'papillon', 'pekinese', 'pembroke', 'pomeranian',
       'pug', 'redbone', 'rhodesian_ridgeback', 'rottweiler',
       'saint_bernard', 'saluki', 'samoyed', 'schipperke',
       'scotch_terrier', 'scottish_deerhound', 'sealyham_terrier',
       'shetland_sheepdog', 'shih-tzu', 'siberian_husky', 'silky_terrier',
       'soft-coated_wheaten_terrier', 'staffordshire_bullterrier',
       'standard_poodle', 'standard_schnauzer', 'sussex_spaniel',
       'tibetan_mastiff', 'tibetan_terrier', 'toy_poodle', 'toy_terrier',
       'vizsla', 'walker_hound', 'weimaraner', 'welsh_springer_spaniel',
       'west_highland_white_terrier', 'whippet',
       'wire-haired_fox_terrier', 'yorkshire_terrier']


# Function for Loading a Model
def load_model(model_path):
  """
  Loads a saved model from `model_path`
  """
  print(f"Loading saved model from {model_path}")
  model = tf.keras.models.load_model(model_path,
                                     custom_objects = {"KerasLayer" : hub.KerasLayer})
  return model


#Define Image Size
IMG_SIZE = 224
#Create a Function for preprocessing Images
def process_image(image_path, img_size=IMG_SIZE):
  """
  Takes the image file path and turns them into a Tensor.
  """
  #Reading the image file
  image = tf.io.read_file(image_path)

  #Turn the jpg image into numerical tensors with 3 colour channels(Red, Green, Blue)
  image = tf.image.decode_jpeg(image, channels=3)

  #Convert the colour channel values from 0-255 to 0-1
  image = tf.image.convert_image_dtype(image, tf.float32)

  #Resize the image to our desired values(224, 224)
  image = tf.image.resize(image, size=[img_size, img_size])
  return image


def get_pred_labels(predictions):
  """
  Turns an array of predictions probabilities into a label
  """
  return unique_breeds[np.argmax(predictions)]



#Turning our data into Batches
#Define the batch size, 32 is a good start
BATCH_SIZE = 32
#Create a function to turn data into batches
def predict_image_label(file_path, batch_size= BATCH_SIZE):
  """
  Gets Prediction Probabilities of an image on path=`filepath`...
  """
  print("Processing and batching the image...")
  processed_image = process_image(file_path)

  # Expand dimensions to simulate a batch of size 1
  data_batch = tf.expand_dims(processed_image, axis=0)

  # Load the MobileNetV2 model
  model = load_model('model/2024-04_31_1728534692-full-image-set-mobilenetv2-Adam.h5')


  # Making the Prediction on Data Batch
  pred_probs = model.predict(data_batch)

  return pred_probs



def plot_pred_conf(prediction_probabilities, filename):
    """
    Plots the top 10 highest prediction confidences and saves the plot as an image.
    Returns the file path of the saved plot.
    """
    pred_prob = prediction_probabilities
    pred_prob = pred_prob[0]

    print("Length of pred_prob is : ", len(pred_prob))

    # Find the top 10 prediction confidence indexes
    top_10_pred_indexes = pred_prob.argsort()[-10:][::-1]

    # Find the top 10 prediction confidence values
    top_10_pred_values = pred_prob[top_10_pred_indexes]

    # Find the top 10 prediction labels
    top_10_pred_labels = [unique_breeds[i] for i in top_10_pred_indexes]

    # Plot
    # plt.figure(figsize=(10,6))
    # top_plot = plt.bar(np.arange(len(top_10_pred_labels)),
    #                    top_10_pred_values,
    #                    color="salmon")
    # plt.xticks(np.arange(len(top_10_pred_labels)),
    #            labels=top_10_pred_labels,
    #            rotation="vertical")

    # Change color of true label
    # top_plot[np.argmax(top_10_pred_labels == np.max(pred_prob))].set_color("green")
    # true_label_index = np.argmax(pred_prob)  # Index of the highest probability
    # if true_label_index in top_10_pred_indexes:
    #     top_plot[np.where(top_10_pred_indexes == true_label_index)[0][0]].set_color("green")

    # Save the plot as an image file
    # image_path = "../my-app/public/predicted_plot/" + filename  # Adjust path as needed
    # plt.tight_layout()
    # plt.savefig(image_path, format="png")
    # plt.close()  # Close the plot to free memory

    return top_10_pred_values, top_10_pred_labels

