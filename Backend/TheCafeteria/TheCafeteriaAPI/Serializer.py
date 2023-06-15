from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Product, ProductImages, CustomUser, Brand, CartItem


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
    images_data = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )
    # for this field get_images method will be called which will return the serialized images data related to product
    images = serializers.SerializerMethodField()
    brand_id = serializers.PrimaryKeyRelatedField(
        source="Brand", queryset=Brand.objects.all(), write_only=True
    )

    Brand = serializers.SerializerMethodField()

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
            "brand_id",
            "images_data",
        )

    # This method will return serialized image data to the images field.
    def get_images(self, obj):
        return ProductImagesSerializer(obj.images.all(), many=True).data

    # This method will return serilized data for brand which is related to product
    def get_Brand(self, obj):
        return BrandSerializer(obj.Brand).data

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


class CartItemSerializer(serializers.ModelSerializer):
    product_id = serializers.PrimaryKeyRelatedField(
        source="product",
        queryset=Product.objects.all(),
        write_only=True,
        required=False,
    )
    user_id = serializers.PrimaryKeyRelatedField(
        source="user",
        queryset=CustomUser.objects.all(),
        write_only=True,
        required=False,
    )
    product = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ("product_id", "product", "quantity", "user_id", "id")

    def get_product(self, cartItem):
        return ProductSerializer(cartItem.product).data

    def update(self, instance, validated_data):
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.save()
        return instance
