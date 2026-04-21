import cv2

def detect_face(gray):

    cascade = cv2.CascadeClassifier(
        cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
    )

    faces = cascade.detectMultiScale(gray,1.1,4)

    if len(faces)==0:
        return None

    x,y,w,h = faces[0]

    return gray[y:y+h,x:x+w]
