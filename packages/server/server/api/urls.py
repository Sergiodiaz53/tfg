from rest_framework.authtoken import views as authtoken_views
from drf_auto_endpoint.router import router
from django.contrib.auth import get_user_model
from django.urls import path, include

from . import views, serializers, endpoints
from .. import models

router.registerViewSet(r'access-token', views.AccessTokenView,
                       base_name='AccessToken')
router.registerViewSet(r'user', views.UserView, basename='User')
router.registerViewSet(r'history', views.HistoryView, basename='History')
router.registerViewSet(r'question', views.QuestionView, basename='Question')

router.registerViewSet(r'admin/question', views.AdminQuestionViewSet)
router.register(models.QuestionLevel, url=r'admin/question-level')
# router.register(models.History, url=r'admin/history')
router.register(endpoint=endpoints.HistoryEndpoint, url=r'admin/history')
router.register(models.HistoryLine, url=r'admin/history-line'),
router.register(models.Questionary, url=r'admin/questionary',
                serializer=serializers.QuestionarySerializer),
router.register(get_user_model(), url=r'admin/user')
router.registerViewSet(
    r'admin', views.AdminExportView, basename='export')

urlpatterns = router.urls
