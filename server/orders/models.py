from django.db import models

class Order(models.Model):
    product_name = models.CharField(max_length=255)
    price = models.FloatField()

    customer_name = models.CharField(max_length=255)
    address = models.TextField()
    phone = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product_name
