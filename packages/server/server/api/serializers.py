from django.apps import apps
from django.conf import settings
from django.contrib.auth import get_user_model

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
        model = get_user_model()
        fields = ('username', 'email', 'profile',)


class AnswerSerializer(serializers.ModelSerializer):

    question_id = serializers.IntegerField()

    class Meta:
        model = models.HistoryLine
        fields = ('answer', 'duration', 'question_id',)
        required_fields = ('answer', 'duration', 'question_id',)


class HistoryLineDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoryLine
        fields = ('id', 'answer', 'duration', 'image', 'correct_answer',)


class HistoryCreateSerializer(serializers.ModelSerializer):

    answers = AnswerSerializer(many=True)

    class Meta:
        model = models.History
        fields = ('level', 'valoration', 'answers',)
        depth = 1

    def create(self, validated_data):
        answers = validated_data.pop('answers')

        history = models.History.objects.create(
            **validated_data, user=self.context.user)

        for answer in answers:
            question = models.Question.objects.get(
                id=answer.get('question_id'))
            models.HistoryLine.objects.create(
                answer=answer.get('answer'),
                duration=answer.get('duration'),
                image=question.image,
                correct_answer=question.correct_answer,
                history=history,
            )

        return history


class HistoryDetailSerializer(serializers.ModelSerializer):

    history_lines = HistoryLineDetailSerializer(many=True)

    class Meta:
        model = models.History
        fields = ('id', 'level', 'created', 'valoration', 'history_lines',)
        depth = 1


class HistoryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.History
        fields = ('id', 'level', 'created',)


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = ('id', 'image',)


class AnswerBatchSerializer(serializers.Serializer):

    valoration = serializers.FloatField()
    answers = AnswerSerializer(many=True)

    class Meta:
        fields = ('answers', 'valoration',)
        depth = 1


class HistoryStatsSerializer(serializers.Serializer):

    day = serializers.DateTimeField()
    correct_answers = serializers.IntegerField()
    valoration = serializers.FloatField()

    class Meta:
        fields = ('day', 'correct_answers', 'valoration',)


class QuestionarySerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Questionary
        fields = '__all__'


class UserCreateSerializer(serializers.ModelSerializer):

    questionary = QuestionarySerializer(many=False)
    confirm_password = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = ('username', 'password', 'confirm_password', 'questionary',)

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError(
                "Please enter a password and confirm it.")

        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Passwords don't match.")

        return data

    def create(self, validated_data):
        user = get_user_model().objects.create(
            username=validated_data['username'])
        user.set_password(validated_data['password'])

        user.save()

        return user
