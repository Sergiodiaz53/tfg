from django.contrib import admin

from server import models

admin.site.register(models.UserProfile)
admin.site.register(models.QuestionLevel)
admin.site.register(models.Question)
admin.site.register(models.History)
admin.site.register(models.HistoryLine)
admin.site.register(models.Questionary)
