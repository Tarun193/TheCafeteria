from django.db import models
from django.contrib.auth.models import AbstractUser
from .Managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]


# Create your models here.
class Product(models.Model):
    title = models.CharField(max_length=100, blank=False, null=False)
    subTitle = models.CharField(max_length=200, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    likes = models.IntegerField(default=0)
    # Future attributes.
    # type
    # Reviews Rating
    # Brand

    def __str__(self):
        return self.title


class ProductImages(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="ProductImages/")
