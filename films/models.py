from django.db import models
from django.core.validators import MinValueValidator

# Film model
class Film(models.Model):
    title = models.CharField(max_length=50, unique=True)
    director = models.CharField(max_length=100)
    year_released = models.PositiveIntegerField(validators=[MinValueValidator(1900)])
    country = models.CharField(max_length=50)
    run_time = models.DurationField()
    plot = models.CharField(max_length=600)
    poster = models.CharField(max_length=500)
    distributor = models.CharField(max_length=50)
    film_format = models.CharField(max_length=50)
    submission_date = models.DateTimeField(auto_now_add=True)

    # Many to Many Relationships:
    genre = models.ManyToManyField('genres.Genre', related_name='films')
    section = models.ManyToManyField(
      'sections.Section',
      blank=True,
      related_name='films')

    # One to many Relationship - a user can create many films
    creator = models.ForeignKey(
      "jwt_auth.User",
      related_name="posted_films",
      # If a user is deleted I want to still be able to access the films they created
      on_delete=models.DO_NOTHING
    )

    def __str__(self):
        return f"{self.title} - {self.director}"
