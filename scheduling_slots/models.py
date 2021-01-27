from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

# Slot model
class Slot(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.start_time > timezone.now():
            raise ValidationError('start_time must be greater than current time')

        if not self.end_time > self.start_time:
            raise ValidationError('end_time must be greater than start_time')

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.start_time} - Run Time: {self.end_time - self.start_time}"
