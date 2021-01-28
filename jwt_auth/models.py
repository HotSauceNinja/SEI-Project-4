from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """ Extending the existing django User model """

    email = models.CharField(max_length=50, unique=True) 
    username = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    profile_photo = models.CharField(max_length=300)
