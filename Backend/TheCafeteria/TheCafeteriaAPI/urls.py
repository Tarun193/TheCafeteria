from django.urls import path
from .views import GetProducts

urlpatterns = [
    path("products/", view=GetProducts),

]
