from rest_framework.authtoken import views as authtoken_views
from rest_framework.routers import DefaultRouter

from django.urls import path, include

from . import views

router = DefaultRouter()
router.register(r'user', views.UserView, basename='User')
router.register(r'histories', views.HistoryView, basename='History')
router.register(r'history-lines', views.HistoryLineView,
                basename='HistoryLine')

urlpatterns = [
    path('api-token-auth', authtoken_views.obtain_auth_token),
    path('', include(router.urls))
]
