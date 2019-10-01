from rest_framework.authtoken import views as authtoken_views
# from rest_framework.routers import DefaultRouter
from drf_auto_endpoint.router import router
from django.contrib.auth import get_user_model
from django.urls import path, include

from . import views
from . import serializers
from .. import models

router.registerViewSet(r'access-token', views.AccessTokenView,
                       base_name='AccessToken')
router.registerViewSet(r'user', views.UserView, basename='User')
router.registerViewSet(r'history', views.HistoryView, basename='History')
router.registerViewSet(r'question', views.QuestionView, basename='Question')

router.register(models.Question, url=r'admin/question')
router.register(models.QuestionLevel, url=r'admin/question-level')
router.register(models.History, url=r'admin/history')
router.register(models.HistoryLine, url=r'admin/history-line'),
router.register(models.Questionary, url=r'admin/questionary',
                serializer=serializers.QuestionarySerializer),
router.register(get_user_model(), url=r'admin/user')

urlpatterns = [
    path('', include(router.urls))
]
