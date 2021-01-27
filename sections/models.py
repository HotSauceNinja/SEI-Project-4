from django.db import models

# Section model
class Section(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1000)
    certification = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name} - {self.certification}"
