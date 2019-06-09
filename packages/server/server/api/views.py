
from random import randint

from django.db.models.aggregates import Count
from django.apps import apps
from django.conf import settings
from django.utils.decorators import method_decorator

from rest_framework import viewsets, mixins, status, authtoken
from rest_framework.decorators import action
from rest_framework.authentication import (
    TokenAuthentication, SessionAuthentication)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from drf_yasg.utils import swagger_auto_schema, no_body

from .. import models
from . import serializers


class AccessTokenView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = authtoken.serializers.AuthTokenSerializer
    authentication_classes = ()

    @swagger_auto_schema(
        operation_id='access-token',
        responses={200: serializers.AccessTokenSerializer(many=False)}
    )
    def create(self, request):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = authtoken.models.Token.objects.get_or_create(
            user=user)
        return Response(serializers.AccessTokenSerializer(token).data)


class UserView(mixins.ListModelMixin, viewsets.ViewSet):
    serializer_class = serializers.UserDetailSerializer
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        operation_id='User',
        responses={200: serializers.UserDetailSerializer(many=False)}
    )
    def list(self, request):
        return Response(
            serializers.UserDetailSerializer(self.request.user).data)


class HistoryView(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.HistoryListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return models.History.objects.all().filter(user=self.request.user)

    def get_serializer_context(self):
        print(self.request)
        return {'request': self.request}

    def get_serializer_class(self):
        if (self.action == 'list'):
            return serializers.HistoryListSerializer
        elif (self.action == 'retrieve'):
            return serializers.HistoryDetailSerializer

        return serializers.HistoryListSerializer

    @swagger_auto_schema(
        request_body=no_body,
        responses={200: serializers.HistoryLineSimpleSerializer(many=False)}
    )
    def create(self, request):
        question_level = models.QuestionLevel.objects.get(
            level=self.request.user.profile.level)

        history = models.History(level=question_level.level, user=request.user)
        history.save()

        return Response(
            serializers.HistoryListSerializer(history, many=False).data)

    @swagger_auto_schema(
        responses={200: serializers.HistoryLineSimpleSerializer(many=False)}
    )
    @action(['get'], detail=True)
    def next(self, request, *args, **kwargs):
        history = self.get_object()

        if (history.closed):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        question_level = models.QuestionLevel.objects.get(level=history.level)
        questions = question_level.questions

        count = questions.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        question = questions.all()[random_index]

        history_line = models.HistoryLine(
            image=question.image.url,
            correct_answer=question.correct_answer,
            history=history
        )

        history_line.save()

        if (history.history_lines.count() == 10):
            history.closed = True
            history.save()

        return Response(
            serializers.HistoryLineSimpleSerializer(
                history_line, context={'request': request}
            ).data)


@method_decorator(name='update', decorator=swagger_auto_schema(
    request_body=serializers.HistoryLineAnswerSerializer
))
class HistoryLineView(mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = models.HistoryLine.objects.all()
    serializer_class = serializers.HistoryLineDetailSerializer
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if (self.action == 'update'):
            return serializers.HistoryLineAnswerSerializer
        else:
            return self.serializer_class
