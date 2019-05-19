from random import randint

from django.db.models.aggregates import Count

from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework import serializers

from .. import models

class HistoryLineSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoryLine
        fields = ('id', 'image',)

class HistoryLineDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HistoryLine
        fields = ('id', 'answer', 'time', 'image', 'correct_answer',)

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

class HistoryView(mixins.CreateModelMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = HistoryListSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return models.History.objects.all().filter(user=self.request.user)
    
    def get_serializer_class(self):
        if (self.action == 'list'):
            return HistoryListSerializer
        elif (self.action == 'retrieve'):
            return HistoryDetailSerializer

        return HistoryListSerializer
    
    def create(self, request):
        question_levels = models.QuestionLevel.objects.all()

        # TODO: Change to get level from the user account
        count = question_levels.aggregate(count=Count('id'))['count']
        random_index = randint(0, count - 1)
        question_level = question_levels.all()[random_index]

        history = models.History(level=question_level.level, user=request.user)
        history.save()

        return Response(HistoryListSerializer(history, many=False).data)
    
    @action(detail=True, methods=['get'])
    def next(self, request, *args, **kwargs):
        history = self.get_object()

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

        return Response(HistoryLineSimpleSerializer(history_line).data)
