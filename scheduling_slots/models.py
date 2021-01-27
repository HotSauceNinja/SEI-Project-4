from datetime import timedelta
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

# Slot model
class Slot(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)

    # link cinema with slot with one to many relationship
    cinema = models.ForeignKey(
        "cinemas.Cinema",
        related_name="slots",
        on_delete=models.CASCADE
    )

    # link film with slot with one to many relationship
    film = models.ForeignKey(
        "films.Film",
        default='00 00:02:00',
        blank=True,
        null=True,
        related_name="slots",
        on_delete=models.SET_NULL
    )

    def save(self):
        """ before saving the newly created model """

        # check that the start time is in the future
        if not self.start_time > timezone.now():
            raise ValidationError('start_time must be greater than current time')
        
        # if there is not a set end time, make end time two hours from start time
        if not self.end_time:
            self.end_time=self.start_time + timedelta(hours=2)

        # check that the end time is after the start time
        if not self.end_time > self.start_time:
            raise ValidationError('end_time must be greater than start_time')
        
        # if a film has been allocated the end time will be start time plus film run time
        if self.film:
            self.end_time=self.start_time + self.film.run_time

        super().save()

    def __str__(self):
        return f"{self.cinema}: {self.film} {self.start_time} - Run Time: {self.end_time - self.start_time}"
