import os.path

from django.utils.translation import gettext as _
from django.db import models
from django.conf import settings
from django.urls import reverse
from django.dispatch import receiver

AVAILABLE_ANSWER_CHOICES = (
    ('left', 'left'),
    ('right', 'right'),
)


class UserProfile(models.Model):
    level = models.PositiveIntegerField(default=1)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='profile',
        on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('UserProfile')
        verbose_name_plural = _('UserProfile')

    def __str__(self):
        return '{}'.format(self.user)

    def get_absolute_url(self):
        return reverse('User_profile', kwargs={'pk': self.pk})


@receiver(models.signals.post_save, sender=settings.AUTH_USER_MODEL)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


def question_image_directory_path(instance, filename):
    extenstion = os.path.splitext(filename)[1]
    return 'media/questions/{0}/{1}{2}'.format(
        instance.question_level.pk,
        instance.pk,
        extenstion)


class QuestionLevel(models.Model):

    level = models.PositiveIntegerField('level', 'level', unique=True)

    class Meta:
        verbose_name = _('QuestionLevel')
        verbose_name_plural = _('QuestionLevels')

    def __str__(self):
        return '{}'.format(self.level)

    def get_absolute_url(self):
        return reverse('QuestionLevel_detail', kwargs={'pk': self.pk})


class Question(models.Model):

    image = models.ImageField(upload_to=question_image_directory_path)
    correct_answer = models.CharField(
        choices=AVAILABLE_ANSWER_CHOICES, max_length=5)
    question_level = models.ForeignKey(
        QuestionLevel, models.CASCADE, related_name='questions')

    class Meta:
        verbose_name = _('Question')
        verbose_name_plural = _('Questions')

    def __str__(self):
        return '{}/{}'.format(self.question_level, self.pk)

    def get_absolute_url(self):
        return reverse('Question_detail', kwargs={'pk': self.pk})

    def save(self, *args, **kwargs):
        if self.id is None:
            saved_image = self.image
            self.image = None
            super(Question, self).save(*args, **kwargs)
            self.image = saved_image

        super(Question, self).save(*args, **kwargs)


class History(models.Model):

    datetime = models.DateTimeField('datetime', 'datetime', auto_now=True)
    closed = models.BooleanField(default=False)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    # question level
    level = models.PositiveIntegerField('level', 'level')

    class Meta:
        verbose_name = _('History')
        verbose_name_plural = _('Historys')

    def __str__(self):
        return '{}/{}'.format(self.user.pk, self.datetime)

    def get_absolute_url(self):
        return reverse('History_detail', kwargs={'pk': self.pk})


class HistoryLine(models.Model):

    answer = models.CharField(
        choices=AVAILABLE_ANSWER_CHOICES, max_length=5, null=True)
    duration = models.PositiveIntegerField(null=True)

    # question
    image = models.CharField(max_length=50)
    correct_answer = models.CharField(
        choices=AVAILABLE_ANSWER_CHOICES, max_length=5)

    history = models.ForeignKey(
        History, models.CASCADE, related_name='history_lines')

    class Meta:
        verbose_name = _('HistoryLine')
        verbose_name_plural = _('HistoryLines')

    def __str__(self):
        return '{}/{}'.format(self.history, self.pk)

    def get_absolute_url(self):
        return reverse('HistoryLine_detail', kwargs={'pk': self.pk})
