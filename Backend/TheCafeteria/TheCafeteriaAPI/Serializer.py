from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product, ProductImages, CustomUser, Brand


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
        fields = ["id", "image"]


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    Brand = serializers.PrimaryKeyRelatedField(queryset=Brand.objects.all())

    class Meta:
        model = Product
        fields = (
            "id",
            "title",
            "subTitle",
            "price",
            "description",
            "stock",
            "likes",
            "images",
            "Brand",
        )

    def create(self, validated_data):
        images_data = validated_data.pop("images")
        product = Product.objects.create(**validated_data)
        for image_data in images_data:
            ProductImages.objects.create(product=product, image=image_data)
        return product

    def update(self, instance, validated_data):
        images_data = validated_data.pop("images", [])
        instance.title = validated_data.get("title", instance.title)
        instance.subTitle = validated_data.get("subTitle", instance.subTitle)
        instance.price = validated_data.get("price", instance.price)
        instance.stock = validated_data.get("stock", instance.stock)
        instance.Brand = validated_data.get("Brand", instance.Brand)
        instance.description = validated_data.get("description", instance.description)

        for image_data in images_data:
            ProductImages.objects.create(product=instance, image=image_data)
        instance.save()
        return instance

    def to_representation(self, instance):
        self.fields["images"] = ProductImagesSerializer(many=True)
        self.fields["Brand"] = BrandSerializer()
        return super(ProductSerializer, self).to_representation(instance)


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
