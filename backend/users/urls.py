from django.urls import path 
from rest_framework_simplejwt import views as jwt_views
from .views import UserCreateView, LoginView, LogoutView

urlpatterns = [
    # login 
    path('login/', LoginView.as_view(), name='login'),
    # get new acces token
    path('logout/', LogoutView.as_view(), name='logout'),
    # register
    path('registrar/', UserCreateView.as_view(), name='user_create')
]
