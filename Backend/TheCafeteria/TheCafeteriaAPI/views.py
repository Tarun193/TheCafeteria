# Important Imports
from .Serializer import ProductSerializer, CustomUserSerilizer
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, CustomUser, ProductImages


@api_view(["GET", "POST"])
def GetProducts(request):
    if request.method == "GET":
        AllProducts = Product.objects.all()
        SerializedProducts = ProductSerializer(AllProducts, many=True)
        return Response(SerializedProducts.data)

    elif request.method == "POST":
        images = request.data.pop("images")
        product = ProductSerializer(data=request.data)
        if product.is_valid():
            productsaved = product.save()
        for image in images:
            img = ProductImages.objects.create(product=productsaved, image=image)
            img.save()

    return Response("item")


@api_view(["POST"])
def SignUp(request):
    if CustomUser.objects.filter(email__iexact=request.data["email"]).exists():
        return Response({"message": "Email alredy exists"}, status=400)
    try:
        user = CustomUserSerilizer(data=request.data)
        if user.is_valid():
            print(user)
            user.save()
            return Response({"message": "success"}, status=200)
        else:
            return Response({"message": "In valid form."}, status=400)
    except:
        print(Exception)
        return Response({"message": "unknown error ouccured"}, status=500)
