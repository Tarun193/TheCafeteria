# Important Imports
from .Serializer import (
    ProductSerializer,
    CustomUserSerilizer,
    BrandSerializer,
    CartItemSerializer,
    AddressSerializer,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_500_INTERNAL_SERVER_ERROR

from .models import Product, CustomUser, ProductImages, Brand, CartItem


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


@api_view(["GET", "PUT", "POST", "DELETE"])
@permission_classes([IsAuthenticated])
def getCartItems(request, pk=None, cart_id=None):
    if request.method == "GET":
        cartItems = CartItem.objects.filter(user=pk)
        cartItemsData = CartItemSerializer(cartItems, many=True).data
        return Response(cartItemsData)

    if request.method == "POST":
        cartItem = CartItem.objects.filter(
            product__id=request.data.get("product_id")
        ).filter(user__id=pk)
        if not cartItem:
            Item = CartItemSerializer(data=request.data)
            if Item.is_valid():
                Item.save()
                return Response(Item.data)
        else:
            return Response({}, status=HTTP_204_NO_CONTENT)

    if request.method == "PUT":
        cart_id = request.data.pop("cartItem_id")
        cartItems = CartItem.objects.get(pk=cart_id)
        print(cartItems)
        newCartItem = CartItemSerializer(instance=cartItems, data=request.data)
        if newCartItem.is_valid():
            newCartItem.save()
            return Response(newCartItem.data)

    if request.method == "DELETE":
        cartItem = CartItem.objects.get(pk=cart_id)
        cartItem.delete()
        return Response({"id": cart_id})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def address(request, pk=None):
    if request.method == "POST":
        try:
            address = AddressSerializer(data=request.data)
            if address.is_valid():
                address.save()
                return Response(address.data, status=200)
            else:
                return Response({"message": address.errors})
        except Exception as e:
            return Response({}, status=HTTP_500_INTERNAL_SERVER_ERROR)
