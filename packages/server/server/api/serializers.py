from django.apps import apps
from django.conf import settings

from rest_framework import serializers

from .. import models


class UserProfileDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserProfile
        fields = ('level',)


class UserDetailSerializer(serializers.ModelSerializer):
    profile = UserProfileDetailSerializer(many=False)

    class Meta:
        model = apps.get_model(settings.AUTH_USER_MODEL)
        fields = ('username', 'email', 'profile',)


class HistoryLineSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoryLine
        fields = ('id', 'image',)


class HistoryLineDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.HistoryLine
        fields = ('id', 'answer', 'duration', 'image', 'correct_answer',)


class HistoryDetailSerializer(serializers.ModelSerializer):

    history_lines = HistoryLineDetailSerializer(many=True)

    class Meta:
        model = models.History
        fields = ('id', 'level', 'history_lines',)
        depth = 1


class HistoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.History
        fields = ('id', 'level',)
