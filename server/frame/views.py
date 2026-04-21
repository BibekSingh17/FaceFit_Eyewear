from rest_framework.decorators import api_view
from rest_framework.response import Response

import base64
import cv2
import numpy as np

from model.keypoint_model import model
from model.face_detect import detect_face
from model.face_shape import compute_face_shape

from .models import Glass

@api_view(["POST"])
def recommend(request):

    try:
        img_data = request.data.get("image")

        if not img_data:
            return Response({"error": "No image provided"})

        # Decode base64 image
        img_bytes = base64.b64decode(img_data.split(",")[1])
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            return Response({"error": "Invalid image"})

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        face = detect_face(gray)

        if face is None:
            return Response({"error": "No face detected"})

        # Preprocess for model
        face = cv2.resize(face, (96, 96))
        face = face.reshape(1, 96, 96, 1) / 255.0

        # Predict landmarks
        landmarks = model.predict(face)[0]

        # Get face shape
        shape = compute_face_shape(landmarks)

        #  FETCH FROM POSTGRESQL DATABASE
        glasses_queryset = Glass.objects.filter(frame_type=shape).order_by('?')[:3]

        recommendations = []

        for g in glasses_queryset:
            recommendations.append({
                "id": g.id,
                "name": g.name,
                "price": g.price,
                "image": g.image_url
            })

        return Response({
            "face_shape": shape,
            "recommendations": recommendations
        })

    except Exception as e:
        return Response({"error": str(e)})
