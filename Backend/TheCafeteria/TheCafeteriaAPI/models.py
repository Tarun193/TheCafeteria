from django.db import models
from django.contrib.auth.models import AbstractUser
from .Managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]


class Brand(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    logo = models.ImageField(upload_to="BrandImages/")

    def __str__(self) -> str:
        return self.name


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
    Brand = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=True, default=None)

    def __str__(self):
        return self.title


class ProductImages(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="images"
    )
    image = models.ImageField(upload_to="ProductImages/")


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, name="product")
    quantity = models.IntegerField(default=0)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="user", blank=True, null=True
    )

    def __str__(self):
        return self.user.first_name + " " + self.product.title + " Item"


class Address(models.Model):
    email = models.EmailField(blank=False, null=False)
    mobile = models.CharField(max_length=20, blank=False, null=False)
    first_name = models.CharField(max_length=64, blank=False, null=False)
    last_name = models.CharField(max_length=64, blank=False, null=False)
    Street = models.CharField(max_length=64, blank=False, null=False)
    city = models.CharField(max_length=64, blank=False, null=False)
    country = models.CharField(max_length=64, blank=False, null=False)
    postal = models.CharField(max_length=64, blank=False, null=False)
    province = models.CharField(max_length=64, blank=False, null=False)
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, blank=False, null=False
    )
    selected = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.user.first_name + " Address"
