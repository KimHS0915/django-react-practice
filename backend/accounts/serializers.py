import re

from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ['pk', 'username', 'password', 'first_name', 'last_name', 'email']

class SuggestionUserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField('avatar_url_field')

    def avatar_url_field(self, author):
        if re.match(r'^https?://', author.avatar_url):
            return author.avatar_url
        
        if 'request' in self.context:
            scheme = self.context['request'].scheme
            host = self.context['request'].get_host()
            return scheme + '://' + host + author.avatar_url

    class Meta:
        model = User
        fields = ['username', 'name', 'avatar_url']
