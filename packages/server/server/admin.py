from django.contrib import admin

from server.models import QuestionLevel, Question, History, HistoryLine

admin.site.register(QuestionLevel)
admin.site.register(Question)
admin.site.register(History)
admin.site.register(HistoryLine)

