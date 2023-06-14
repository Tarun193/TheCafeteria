from django.urls import path

from .views import GetProducts, SignUp, Brands, Image, product, getCart
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("products/", view=GetProducts),
    path("product/<int:id>", view=product),
    path("Brands/", view=Brands),
    path("SignUp/", view=SignUp),
    path("image/<int:id>", view=Image),
    path("<int:pk>/cart/", view=getCart),
    path("token/", view=TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
