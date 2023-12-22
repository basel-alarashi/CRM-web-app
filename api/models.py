from django.db import models
from django.contrib.auth.models import User


class Customer(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    city = models.CharField(max_length=63)
    district = models.CharField(max_length=63)
    zipcode = models.CharField(max_length=63)
    email = models.CharField(max_length=127)
    phone = models.CharField(max_length=63)
    user = models.OneToOneField(
        User,
        related_name='customer',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.user.username
