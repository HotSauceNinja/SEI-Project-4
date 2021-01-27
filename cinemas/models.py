from django.db import models

# Cinema model
class Cinema(models.Model):
    name = models.CharField(max_length=50, unique=True)
    address = models.CharField(max_length=500)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    phone_number = models.CharField(max_length=14)
    contact_name = models.CharField(max_length=50)
    image = models.CharField(max_length=500)
    # ! Integrate maps API

    def __str__(self):
        return f"{self.name}"
