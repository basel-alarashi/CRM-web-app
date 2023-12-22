from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, username, password):
        try:
            user = User(username=username, password=password)
            user.save()
            return user
        except Exception:
            return None


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        label='username',
        write_only=True
    )
    password = serializers.CharField(
        label='password',
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(
                request=self.context.get('request'),
                username=username, password=password
            )
            if not user:
                msg = 'Access denied: wrong username or password.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Both "username" and "password" are required.'
            raise serializers.ValidationError(msg, code='authorization')
        attrs['user'] = user
        return attrs


'''
1 username: basel
1 password: basel.images
2 username: bashar
2 password: besho12345
3 username: baraa
3 password: baroro12345

def check(self, user_name):
        obs = User.objects.filter(username=user_name)
        if obs:
            user = obs[0]
            print(user)
            return user
        print('No User')
        return None
'''
