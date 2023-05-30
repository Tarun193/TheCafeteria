from rest_framework import serializers
from .models import Product, ProductImages

class ProductImagesSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImages
        fields = ['image']

class ProductSerializer(serializers.ModelSerializer):
    # Setting related field to seiralize all the images related to a Product.
    images = ProductImagesSerializer(many = True, read_only = True)
    # model to to serilize to serialize and which fields should be serialized
    class Meta:
        model = Product
        fields = ['title', 'subTitle', 'price', 'description', 'stock','likes', 'images']
    