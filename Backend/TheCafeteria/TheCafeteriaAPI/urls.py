from django.urls import path

from .views import GetProducts
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("products/", view=GetProducts),
    path("token/", view=TokenObtainPairView.as_view(), name="token_obtain_pair"),
]
