from django.db import models

class Glass(models.Model):

    FRAME_TYPES = [
        ("round","Round"),
        ("oval","Oval"),
        ("square","Square"),
    ]

    name = models.CharField(max_length=100)
    frame_type = models.CharField(max_length=20,choices=FRAME_TYPES)
    price = models.FloatField()
    image_url = models.URLField()

    def __str__(self):
        return self.name
