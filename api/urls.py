from django.urls import path
from .views import *

urlpatterns = [
    path('', customers_list, name='home'),
    path('create/', create_customer, name='create'),
    path('customer/<int:pk>/', customer_details, name='customer'),
    path('update/<int:pk>/', update_customer, name='update'),
    path('login/', login_user, name='login'),
    path('logout/', logout_user, name='logout'),
    path('register/', register_user, name='register'),
    path('check/', check_user, name='check'),
    path('delete/<int:pk>/', delete_customer, name='delete'),
]
