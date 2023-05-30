# Important Imports
from django.http import HttpResponse
from .Serializer import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product


@api_view(['GET', 'POST'])
def GetProducts(request):
    AllProducts = Product.objects.all()
    SerializedProducts = ProductSerializer(AllProducts, many = True)
    print(repr(SerializedProducts))
    return Response(SerializedProducts.data)

