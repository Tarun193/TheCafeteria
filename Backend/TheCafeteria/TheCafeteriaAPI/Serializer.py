from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["name"] = user.first_name + " " + user.last_name
        token["id"] = user.id
        # ...

        return token


from .models import Product, ProductImages


class ProductImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ["image"]


class ProductSerializer(serializers.ModelSerializer):
    # Setting related field to seiralize all the images related to a Product.
    images = ProductImagesSerializer(many=True, read_only=True)

    # model to to serilize to serialize and which fields should be serialized
    class Meta:
        model = Product
        fields = [
            "id",
            "title",
            "subTitle",
            "price",
            "description",
            "stock",
            "likes",
            "images",
        ]
