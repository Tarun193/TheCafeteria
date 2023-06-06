from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product, ProductImages, CustomUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["name"] = user.first_name + " " + user.last_name
        token["id"] = user.id
        token["admin"] = user.is_staff
        print(user)
        # ...

        return token


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


class CustomUserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data["email"],
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
