from rest_framework import serializers

from .. import models


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