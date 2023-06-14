from django.contrib import admin

from .models import Product, ProductImages, CustomUser, Brand, Cart, CartItem

# Register your models here.
admin.site.register(Product)
admin.site.register(ProductImages)
admin.site.register(CustomUser)
admin.site.register(Brand)
admin.site.register(CartItem)
admin.site.register(Cart)
