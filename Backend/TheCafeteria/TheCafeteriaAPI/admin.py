from django.contrib import admin

from .models import Product, ProductImages, CustomUser, Brand, CartItem

# Register your models here.
admin.site.register(Product)
admin.site.register(ProductImages)
admin.site.register(CustomUser)
admin.site.register(Brand)
admin.site.register(CartItem)
