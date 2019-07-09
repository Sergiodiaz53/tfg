
from random import randint
from django.utils import timezone
import pytz

from django.db.models import IntegerField, Count, Sum, F, Avg, Case, When
from django.db.models.functions import TruncDay
from django.apps import apps
from django.conf import settings
from django.utils.decorators import method_decorator

from rest_framework import viewsets, mixins, status, authtoken
from rest_framework.decorators import action
from rest_framework.authentication import (
    TokenAuthentication, SessionAuthentication)
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema, no_body

from .. import models
from . import serializers

question_exclude_param = openapi.Parameter(
    'exclude', openapi.IN_QUERY,
    description="question exclude param",
    type=openapi.TYPE_ARRAY,
    items=openapi.Items(openapi.TYPE_NUMBER))


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
        manual_parameters=[question_exclude_param],
        responses={200: serializers.QuestionSerializer(many=False)}
    )
    @action(['get'], detail=False)
    def random(self, request, *args, **kwargs):

        exclude_param = request.GET.get('exclude')
        exclude_questions = []
        if (exclude_param):
            exclude_questions = [
                int(x) for x in exclude_param.split(',')
            ]

        question_level = models.QuestionLevel.objects.get(
            level=self.request.user.profile.level)
        questions = question_level.questions.exclude(id__in=exclude_questions)

        count = questions.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        question = questions[random_index]

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
        elif (self.action == 'stats'):
            return serializers.HistoryStatsSerializer

        return serializers.HistoryListSerializer

    @swagger_auto_schema(
        request_body=serializers.AnswerBatchSerializer,
        responses={201: serializers.HistoryDetailSerializer}
    )
    def create(self, request):

        answerBatch = serializers.AnswerBatchSerializer(
            data=request.data)

        if not answerBatch.is_valid():
            return Response(
                answerBatch.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        historyData = {
            'level': request.user.profile.level,
            'valoration': answerBatch.data.get('valoration'),
            'answers': answerBatch.data.get('answers')
        }

        serializer = serializers.HistoryCreateSerializer(
            data=historyData,
            context=request)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        history = serializer.save()

        # test if user go to level up or not
        question_level = models.QuestionLevel.objects.get(id=history.level)

        average_duration = history.average_duration
        is_level_down = average_duration >= question_level.level_down_threshold
        is_level_up = average_duration <= question_level.level_up_threshold

        if is_level_down:
            request.user.profile.level_down()
        elif is_level_up:
            request.user.profile.level_up()

        return Response(
            self.get_serializer_class()(history, many=False).data,
            status=status.HTTP_201_CREATED
        )

    @swagger_auto_schema(
        request_body=no_body,
        responses={200: serializers.HistoryStatsSerializer}
    )
    @action(detail=False, methods=['get'])
    def stats(self, request):
        now = timezone.now()
        from_date = now - timezone.timedelta(days=7)

        correct_answers_query = Sum(
            Case(
                When(
                    history_lines__answer=F('history_lines__correct_answer'),
                    then=1
                ),
                default=0,
                output_field=IntegerField())
        )

        stats = models.History.objects.filter(
            user=request.user,
            created__range=(from_date, now)
        ).annotate(
            day=TruncDay('created')
        ).values('day').annotate(
            correct_answers=correct_answers_query,
            valoration=Avg('valoration')
        )

        return Response(
            self.get_serializer_class()(stats, many=True).data
        )
