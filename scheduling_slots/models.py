from datetime import timedelta
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError

# Slot model
class Slot(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(blank=True, null=True)

        # One to many Relationship - a user can schedule many slots
    scheduled_by = models.ForeignKey(
        "jwt_auth.User",
        blank=True,
        null=True,
        related_name="scheduled_slots",
        # If a user is deleted I want to still be able to access the slots they created
        on_delete=models.DO_NOTHING
    )

    # One to many relationship - a cinema can have many screening slots 
    cinema = models.ForeignKey(
        "cinemas.Cinema",
        related_name="slots",
        on_delete=models.CASCADE
    )

    # One to many relationship - a film can have many screening slots
    film = models.ForeignKey(
        "films.Film",
        blank=True,
        null=True,
        related_name="slots",
        on_delete=models.SET_NULL
    )

    def save(self, force_insert=False, force_update=False, using=None,
          update_fields=None):
        """ before saving the newly created model """

        # check that the start time is in the future
        if self.start_time <= timezone.now():
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
