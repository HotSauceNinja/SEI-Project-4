from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth import get_user_model
from django.conf import settings

from .serializers.common import UserSerializer
import jwt

User = get_user_model()

class RegisterView(APIView):
    """ View for post request to /auth/login """

    def post(self, request):
        # request data going into the UserSerialiser to be converted
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response(
                {'message':'Registration Successful'},
                status=status.HTTP_201_CREATED
            )
        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):
    """ View for post request to /auth/login """

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # search for the user in db by email
        try:
            user_to_login = User.objects.get(email=email)
        # if email not found in db, permission denied
        except User.DoesNotExist:
            raise PermissionDenied(detail='Invalid Credentials')

        # if there is an email associated but the password does not match, permission denied
        if not user_to_login.check_password(password):
            raise PermissionDenied(detail='Invalid Credentials')
        
        # otherwise they can have a token; set token expiry time:
        expiry_time = datetime.now() + timedelta(days=7)
        # and encode the token:
        token = jwt.encode({
            'sub':user_to_login.id,
            'exp':int(expiry_time.strftime('%s'))},
            settings.SECRET_KEY,
            algorithm='HS256'
        )

        return Response({'token':token, 'message':f'Welcome back {user_to_login.username}'})