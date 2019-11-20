import csv
import zipfile
from io import StringIO, BytesIO
from random import randint
from openpyxl import Workbook
from openpyxl.writer.excel import save_virtual_workbook

import pytz

from django.apps import apps
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db.models import Avg, Case, Count, F, IntegerField, Sum, When
from django.db.models.functions import TruncDay
from django.http import HttpResponse
from django.utils import timezone
from django.utils.decorators import method_decorator
from drf_yasg import openapi
from drf_yasg.utils import no_body, swagger_auto_schema
from rest_framework import authtoken, mixins, parsers, status, views, viewsets
from rest_framework.authentication import (SessionAuthentication,
                                           TokenAuthentication)
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .. import models
from . import paginations, serializers

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


class UserView(mixins.ListModelMixin, mixins.CreateModelMixin, viewsets.ViewSet):
    serializer_class = serializers.UserDetailSerializer

    def get_permission_classes(self):
        # if self.action == 'create':
        #     return (AllowAny,)
        # else:
        return (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == 'create':
            return serializers.UserCreateSerializer
        else:
            return serializers.UserDetailSerializer

    @swagger_auto_schema(
        responses={200: serializers.UserDetailSerializer(many=False)}
    )
    def list(self, request):
        return Response(
            self.get_serializer_class()(self.request.user).data)

    @swagger_auto_schema(
        request_body=serializers.UserCreateSerializer,
        responses={200: ''}
    )
    def create(self, request):
        userCreateSerializer = self.get_serializer_class()(
            data=self.request.data,
            context=request)

        userCreateSerializer.is_valid(raise_exception=True)
        userCreateSerializer.save()

        return Response(status=status.HTTP_200_OK)


class QuestionView(viewsets.GenericViewSet):
    serializer_class = serializers.QuestionSimpleSerializer
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        manual_parameters=[question_exclude_param],
        responses={200: serializers.QuestionSimpleSerializer(many=False)}
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
        if (self.action == 'retrieve' or self.action == 'create'):
            return serializers.HistoryDetailSerializer
        elif (self.action == 'stats'):
            return serializers.HistoryStatsSerializer
        else:
            return serializers.HistoryListSerializer

    @swagger_auto_schema(
        request_body=serializers.AnswerBatchSerializer,
        responses={201: serializers.HistoryDetailSerializer}
    )
    def create(self, request):

        answerBatch = serializers.AnswerBatchSerializer(
            data=request.data)

        answerBatch.is_valid(raise_exception=True)

        historyData = {
            'level': request.user.profile.level,
            'valoration': answerBatch.data.get('valoration'),
            'answers': answerBatch.data.get('answers')
        }

        serializer = serializers.HistoryCreateSerializer(
            data=historyData,
            context=request)

        serializer.is_valid(raise_exception=True)

        history = serializer.save()

        print(history.level)

        # test if user go to level up or not
        question_level = models.QuestionLevel.objects.get(level=history.level)

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


class AdminQuestionViewSet(viewsets.ModelViewSet):

    queryset = models.Question.objects.all()
    serializer_class = serializers.AdminQuestionSerializer
    parser_classes = (parsers.MultiPartParser,)
    pagination_class = paginations.PageSizePagination

    def get_serializer_class(self):
        if (self.action == 'bulk'):
            return serializers.AdminQuestionBulkSerializer
        else:
            return super().get_serializer_class()

    def create(self, request):
        question_level = models.QuestionLevel.objects.get(
            pk=request.POST.get('question_level'))

        return super(AdminQuestionViewSet, self).create(request)

    @swagger_auto_schema(
        responses=({200: ''})
    )
    @action(methods=['put'], detail=False)
    def bulk(self, request):
        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            status=status.HTTP_200_OK
        )


class AdminExportView(viewsets.ViewSet):
    # permission_classes = (IsAuthenticated,)

    @action(methods=['get'], detail=False, url_path=r'export(?:\.(?P<ext>[a-z0-9]+))?')
    def export(self, request, ext='csv'):
        if ext == 'xls':
            return self.export_xls()
        else:
            return self.export_csv()

        return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def export_csv(self):
        return self.create_zip(self.create_csv())

    def export_xls(self):
        return self.create_zip(self.create_xls(), True)

    def create_csv(self):
        files = {}
        models = apps.get_app_config('server').get_models()

        for model in models:
            si = StringIO()
            writer = csv.writer(si)

            values = model.objects.all().values_list()
            writer.writerow([field.name for field in model._meta.fields])

            for value in values:
                writer.writerow(value)

            files['{}.csv'.format(model._meta.verbose_name_plural)] = si

        return files

    def create_xls(self):

        wb = Workbook()
        wb.remove_sheet(wb.active)

        for [filename, data] in self.create_csv().items():
            ws = wb.create_sheet(filename.split('.')[0])

            print(data.getvalue())
            for row in csv.reader(data.getvalue().split('\n')):
                ws.append(row)

        bi = BytesIO()
        bi.write(save_virtual_workbook(wb))
        wb.close()

        return {'data.xlsx': bi}

    def create_zip(self, files, bytes=False):
        response = HttpResponse(content_type='application/zip')
        response['Content-Disposition'] = 'attachment; filename=data.zip'

        with zipfile.ZipFile(response, mode='w', compression=zipfile.ZIP_DEFLATED) as zf:
            for [filename, data] in files.items():
                if bytes:
                    zf.writestr(filename, data.getvalue())
                else:
                    zf.writestr(filename, str.encode(data.getvalue(), 'utf-8'))

        return response
