# Important Imports
from django.http import HttpResponse

from .Serializer import ProductSerializer, CustomUserSerilizer
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, CustomUser


@api_view(["GET", "POST"])
def GetProducts(request):
    AllProducts = Product.objects.all()
    SerializedProducts = ProductSerializer(AllProducts, many=True)
    return Response(SerializedProducts.data)


@api_view(["POST"])
def SignUp(request):
    data = request.data
    user = CustomUser.objects.create(
        first_name=data["firstName"], last_name=data["lastName"], email=data["email"]
    )
    user.set_password(data["password1"])
    return HttpResponse("Chill")
