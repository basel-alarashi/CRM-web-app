from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from .serializers import *


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def customers_list(request, format=None):
    customers = list(Customer.objects.all().order_by('user'))
    serializer = CustomerSerializer(customers, many=True)
    data = serializer.data
    for c in customers:
        index = customers.index(c)
        data[index]['name'] = c.user.username
    return Response(
        data=data,
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def customer_details(request, pk, format=None):
    customer = Customer.objects.get(id=pk)
    if customer:
        serializer = CustomerSerializer(customer)
        res = serializer.data
        res['username'] = customer.user.username
        res['request_id'] = request.user.id
        return Response(data=res, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def delete_customer(request, pk, format=None):
    customer = Customer.objects.get(id=pk)
    if request.user.id == customer.user.id:
        customer.delete()
        return Response(
            'Customer Deleted Successfully',
            status=status.HTTP_200_OK
        )
    return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def create_customer(request, format=None):
    user = User.objects.get(id=request.user.id)
    try:
        customer = Customer.objects.get(user=user)
        if customer:
            return Response(
                "You've Already Created a Customer!",
                status=status.HTTP_208_ALREADY_REPORTED
            )
    except Exception:
        data = request.data
        data['user'] = user.id
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def update_customer(request, pk, format=None):
    customer = Customer.objects.get(id=pk)
    serializer = CustomerSerializer(instance=customer, data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def check_user(request, format=None):
    try:
        user = User.objects.get(username=request.user.username)
        auth = user.is_authenticated
        return Response({'auth': auth}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'auth': False}, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def register_user(request, format=None):
    data = request.data
    serializer = RegisterSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        user = serializer.create(data['username'], data['password'])
        if user:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(
            'Try Another Username',
            status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS
        )
    return Response('Invalid Data', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([AllowAny])
def login_user(request, format=None):
    data = request.data
    serializer = LoginSerializer(data=data, context={'request': request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    try:
        login(request, user)
        print('auth: ', user.is_authenticated)
        return Response(status=status.HTTP_202_ACCEPTED)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([BasicAuthentication, SessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_user(request, format=None):
    logout(request)
    return Response(status=status.HTTP_200_OK)
