from rest_framework.authtoken import views as authtoken_views
from rest_framework.routers import DefaultRouter

from django.urls import path, include

from . import views

router = DefaultRouter()
router.register(r'access-token', views.AccessTokenView,
                base_name='AccessToken')
router.register(r'user', views.UserView, basename='User')
router.register(r'history', views.HistoryView, basename='History')
router.register(r'history-line', views.HistoryLineView,
                basename='HistoryLine')

urlpatterns = [
    path('', include(router.urls)),
]
