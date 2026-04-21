import numpy as np

def compute_face_shape(landmarks):

    left_eye = landmarks[0:2]
    right_eye = landmarks[2:4]
    mouth_left = landmarks[12:14]
    mouth_right = landmarks[14:16]

    eye_dist = np.linalg.norm(left_eye-right_eye)
    mouth_dist = np.linalg.norm(mouth_left-mouth_right)

    ratio = mouth_dist/eye_dist

    if ratio < 0.7:
        return "round"
    elif ratio < 1.2:
        return "oval"
    else:
        return "square"