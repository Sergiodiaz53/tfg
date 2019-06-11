from django.apps import apps
from django.conf import settings

from rest_framework import serializers, authtoken

from .. import models


class AccessTokenSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    class Meta:
        model = authtoken.models.Token
        fields = ('token',)

    def get_token(self, obj):
        return obj.key


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

    history_closed = serializers.SerializerMethodField()

    class Meta:
        model = models.HistoryLine
        fields = ('id', 'image', 'history_closed',)

    def get_history_closed(self, instance):
        if not instance:
            return False
        else:
            return instance.history.closed


class HistoryLineAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoryLine
        fields = ('id', 'answer', 'duration',)
        extra_kwargs = {
            'answer': {'required': True},
            'duration': {'required': True}
        }


class HistoryLineDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.HistoryLine
        fields = ('id', 'answer', 'duration', 'image', 'correct_answer',)


class HistoryDetailSerializer(serializers.ModelSerializer):

    history_lines = HistoryLineDetailSerializer(many=True)

    class Meta:
        model = models.History
        fields = ('id', 'level', 'closed', 'history_lines',)
        depth = 1


class HistoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.History
        fields = ('id', 'level',)
