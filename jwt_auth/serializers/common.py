from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
# from django.contrib.auth import password_validation
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """ To view user model information """

    # never show password:
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    # data = request body data
    def validate(self, data):
      # remove password & password_confirmation from the request body data
        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'password confirmation':'does not match'})

        #! I will comment this out during development to avoid complicated password requirements
        # try:
        #     password_validation.validate_password(password=password)
        # except ValidationError as err:
        #     raise ValidationError({'password':err.messages})

        # now hash password provided and add back into the request
        data['password']=make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

class NestedUserSerializer(serializers.ModelSerializer):
    """ to use in nested serializers to avoid endless loop """
    class Meta:
        model = User
        fields = ('id', 'username', 'profile_photo')
