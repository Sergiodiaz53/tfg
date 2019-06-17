
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


class QuestionView(viewsets.GenericViewSet):
    serializer_class = serializers.QuestionSerializer
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        responses={200: serializers.QuestionSerializer(many=False)}
    )
    @action(['get'], detail=False)
    def random(self, request, *args, **kwargs):

        question_level = models.QuestionLevel.objects.get(
            level=self.request.user.profile.level)
        questions = question_level.questions

        count = questions.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        question = questions.all()[random_index]

        return Response(
            self.get_serializer(
                question, context={'request': request}
            ).data)


class HistoryView(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.HistoryListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return models.History.objects.all().filter(
            user=self.request.user).order_by('pk').reverse()

    def get_serializer_context(self):
        return {'request': self.request}

    def get_serializer_class(self):
        if (self.action == 'list'):
            return serializers.HistoryListSerializer
        elif (self.action == 'retrieve' or self.action == 'create'):
            return serializers.HistoryDetailSerializer

        return serializers.HistoryListSerializer

    @swagger_auto_schema(
        request_body=serializers.AnswerBatchSerializer,
        responses={201: serializers.HistoryDetailSerializer}
    )
    def create(self, request):

        historyData = {
            "level": request.user.profile.level,
            "answers": serializers.AnswerBatchSerializer(request.data)
            .data.get('answers')
        }

        serializer = serializers.HistoryCreateSerializer(
            data=historyData,
            context=request)

        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        history = serializer.save()

        return Response(
            self.get_serializer_class()(history, many=False).data,
            status=status.HTTP_201_CREATED
        )
