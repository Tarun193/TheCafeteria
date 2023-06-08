# Important Imports
from .Serializer import ProductSerializer, CustomUserSerilizer, BrandSerializer
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Product, CustomUser, ProductImages, Brand


@api_view(["GET", "POST"])
def GetProducts(request, id=None):
    if request.method == "GET":
        AllProducts = Product.objects.all()
        SerializedProducts = ProductSerializer(AllProducts, many=True)
        return Response(SerializedProducts.data)

    elif request.method == "POST":
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response("Unauthorized", status=401)
        product = ProductSerializer(data=request.data)
        try:
            if product.is_valid():
                product = product.save()
                return Response(ProductSerializer(product).data, status=200)
            else:
                return Response({"message": "Invalid Form"}, status=400)
        except Exception:
            return Response({"message": "server error"}, status=500)


@api_view(["PUT", "DELETE"])
@permission_classes([IsAdminUser])
def product(request, id=None):
    if request.method == "PUT":
        product = ProductSerializer(
            data=request.data, instance=Product.objects.get(pk=id)
        )
        try:
            if product.is_valid():
                product = product.save()

                return Response(ProductSerializer(product).data, status=200)
            else:
                print("Error", product.errors)
                return Response({"message": "Invalid Form"}, status=400)
        except Exception as e:
            print(e)
            return Response({"message": "server error"}, status=500)
    if request.method == "DELETE":
        product = Product.objects.get(pk=id)
        product.delete()
        return Response(id, status=200)


@api_view(["GET"])
def Brands(request):
    if request.method == "GET":
        AllBrands = Brand.objects.all()
        SerializedBrands = BrandSerializer(AllBrands, many=True)
        return Response(SerializedBrands.data)


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


@api_view(["DELETE", "GET"])
def Image(request, id=None):
    print(id)
    if request.method == "DELETE":
        image = ProductImages.objects.filter(pk=id)
        image.delete()
        return Response({"message": "success"}, status=200)

    return Response({"message": "success"}, status=200)
