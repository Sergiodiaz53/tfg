from django.core.files.images import ImageFile
from django.apps import apps
from django.conf import settings
from django.contrib.auth import get_user_model
import zipfile
import re
import os

from rest_framework import serializers, authtoken

from .. import models

FILENAME_REGEX = '^(\d+)\/(M|H)-(I|D)[^.]+.[^.]+$'


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
        fields = ('username', 'email', 'is_superuser', 'is_staff', 'profile',)


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


class QuestionSimpleSerializer(serializers.ModelSerializer):
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


class UserProfileCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.UserProfile
        exclude = ('level', 'user',)


class UserCreateSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField()
    questionary = QuestionarySerializer(many=False)
    profile = UserProfileCreateSerializer(many=False)

    class Meta:
        model = get_user_model()
        fields = (
            'username', 'password', 'confirm_password', 'questionary', 'profile')

    def validate(self, data):
        if not data.get('password') or not data.get('confirm_password'):
            raise serializers.ValidationError(
                "Please enter a password and confirm it.")

        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError("Passwords don't match.")

        return data

    def create(self, validated_data):
        profile = validated_data.pop('profile')
        questionary = validated_data.pop('questionary')
        username = validated_data.pop('username')
        password = validated_data.pop('password')

        user = get_user_model().objects.create(
            username=username)
        user.set_password(password)

        user.save()

        models.UserProfile.objects.filter(user=user).update(**profile)

        models.Questionary.objects.create(**questionary, user=user)

        return user


class AdminQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Question
        fields = '__all__'


DIRECTIONS = {
    'I': models.ANSWER_CHOICES[0][0],
    'D': models.ANSWER_CHOICES[1][0],
}


class AdminQuestionBulkSerializer(serializers.Serializer):

    file = serializers.FileField()

    def create(self, validated_data):
        file = validated_data.get('file', 'r')
        with zipfile.ZipFile(file) as archive:
            for line in archive.filelist:
                match = re.search(FILENAME_REGEX, line.filename)

                if match:
                    path = os.path.join(
                        settings.MEDIA_ROOT, 'questions/temp')

                    archive.extract(line.filename, path)

                    level = match.group(1)
                    sex = match.group(2)
                    direction = DIRECTIONS[match.group(3)]

                    question_level, created = models.QuestionLevel.objects.get_or_create(
                        level=level)

                    with open(os.path.join(path, line.filename), 'rb') as f:
                        image = ImageFile(f)

                        question = models.Question(
                            correct_answer=direction,
                            question_level=question_level)
                        question.image.save(line.filename, image, save=False)

                        question.save()

                    os.remove(os.path.join(path, line.filename))

        return ()
