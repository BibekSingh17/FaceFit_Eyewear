import tensorflow as tf
import cv2
import numpy as np
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "facial_keypoints_model.h5")

model = tf.keras.models.load_model(MODEL_PATH)

def predict_landmarks(face_img):

    img = cv2.resize(face_img, (96,96))
    img = img.reshape(1,96,96,1) / 255.0

    preds = model.predict(img)

    return preds[0]

