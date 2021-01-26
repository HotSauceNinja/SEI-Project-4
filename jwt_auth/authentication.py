from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt

User = get_user_model()

class JWTAuthentication(BasicAuthentication):
    """ Deals with incoming requests; will be applied over every route 
    and once they are through, it will determine what each can do next """

    def authenticate(self, request):
        # This will get any token value:
        header = request.headers.get('Authorization')
        # If there is no header we let them through but give no permissions
        if not header:
            return None

        # If a broken token is sent, permission denied
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail='Invalid Authorization Token Format')
        
        # If all goes well, decode token:
        token = header.replace('Bearer ', '')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        
        # If token is invalid, permission denied
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid Token')
        # if the profile does not exist, permission denied
        except User.DoesNotExist:
            raise PermissionDenied(detail='User Not Found')

        return (user, token)