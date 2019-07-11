import os.path
import pytz

from django.utils.translation import gettext as _
from django.utils import timezone
from django.db import models
from django.db.models import Sum, F, Avg
from django.contrib.auth import get_user_model
from django.conf import settings
from django.urls import reverse
from django.dispatch import receiver
from django.core import validators

ANSWER_CHOICES = (
    ('left', 'left'),
    ('right', 'right'),
)

SEX_CHOICES = (
    ('male', 'female'),
    ('male', 'female')
)

FREQUENCY_CHOICES = (
    ('never', 'never'),
    ('rarely', 'rarely'),
    ('sometimes', 'sometimes'),
    ('many_times', 'many_times'),
    ('usually', 'usually'),
    ('always', 'always')
)

PAIN_CHOICES = (
    ('none', 'none'),
    ('a_little', 'a little'),
    ('some', 'some'),
    ('lot', 'lot')
)

LOVE_CHOICES = (
    ('charmed', 'charmed'),
    ('very_satisfied', 'very satisfied'),
    ('satisfied', 'satisfied'),
    ('confused', 'confused'),
    ('dissatisfied', 'dissatisfied'),
    ('discontent', 'discontent'),
    ('fatal', 'fatal')
)


class UserProfile(models.Model):
    level = models.PositiveIntegerField(default=1)
    sex = models.CharField(
        choices=SEX_CHOICES, max_length=6)
    years = models.PositiveSmallIntegerField()
    weigh = models.PositiveSmallIntegerField()
    heigh = models.PositiveSmallIntegerField()

    user = models.OneToOneField(
        get_user_model(),
        related_name='profile',
        on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('UserProfile')
        verbose_name_plural = _('UserProfile')

    def __str__(self):
        return '{}'.format(self.user)

    def get_absolute_url(self):
        return reverse('User_profile', kwargs={'pk': self.pk})

    def level_up(self):
        self.level = min(self.level + 1, 10)
        self.save()

    def level_down(self):
        self.level = max(self.level - 1, 1)
        self.save()


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
    average_duration = models.PositiveIntegerField(
        validators=[
            validators.MinValueValidator(0)
        ])
    duration_threshold = models.PositiveIntegerField(
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(100)
        ])

    class Meta:
        verbose_name = _('QuestionLevel')
        verbose_name_plural = _('QuestionLevels')

    def __str__(self):
        return '{}'.format(self.level)

    def get_absolute_url(self):
        return reverse('QuestionLevel_detail', kwargs={'pk': self.pk})

    @property
    def level_down_threshold(self):
        return self.average_duration * ((100 + self.duration_threshold) / 100)

    @property
    def level_up_threshold(self):
        return self.average_duration * ((100 - self.duration_threshold) / 100)


class Question(models.Model):

    image = models.ImageField(upload_to=question_image_directory_path)
    correct_answer = models.CharField(
        choices=ANSWER_CHOICES, max_length=5)
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

    created = models.DateTimeField('created', 'created')
    valoration = models.FloatField(
        'valoration',
        'valoration',
        validators=[
            validators.MinValueValidator(0.0),
            validators.MaxValueValidator(1.0)
        ]
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    # question level
    level = models.PositiveIntegerField('level', 'level')

    class Meta:
        verbose_name = _('History')
        verbose_name_plural = _('Historys')

    def __str__(self):
        return '{}/{}'.format(self.user.pk, self.created)

    def get_absolute_url(self):
        return reverse('History_detail', kwargs={'pk': self.pk})

    def save(self, *args, **kwargs):
        if self.created is None:
            self.created = timezone.now()
        super(History, self).save(*args, **kwargs)

    @property
    def correct_answers(self):
        return self.history_lines.filter(answer=F('correct_answer')).count()

    @property
    def average_duration(self):
        return self.history_lines.aggregate(
            Avg('duration')).get('duration__avg')


class HistoryLine(models.Model):

    answer = models.CharField(
        choices=ANSWER_CHOICES, max_length=5)
    duration = models.PositiveIntegerField()

    # question
    image = models.CharField(max_length=50)
    correct_answer = models.CharField(
        choices=ANSWER_CHOICES, max_length=5)

    history = models.ForeignKey(
        History, models.CASCADE, related_name='history_lines')

    class Meta:
        verbose_name = _('HistoryLine')
        verbose_name_plural = _('HistoryLines')

    def __str__(self):
        return '{}/{}'.format(self.history, self.pk)

    def get_absolute_url(self):
        return reverse('HistoryLine_detail', kwargs={'pk': self.pk})

    @property
    def is_correct(self):
        return self.answer == self.correct_answer


class Questionary(models.Model):

    perineal_area_pain = models.BooleanField()
    vulva_pain = models.BooleanField()
    clitoris_pain = models.BooleanField()
    bladder_pain = models.BooleanField()
    pain_frequency = models.CharField(
        choices=FREQUENCY_CHOICES, max_length=10
    )
    pee_pain = models.BooleanField()
    sexual_relations_pain = models.BooleanField(null=True)
    pain_intensity = models.PositiveIntegerField(
        validators=[validators.MinValueValidator(0), validators.MaxValueValidator(10)])
    stop_doing_things = models.CharField(
        choices=PAIN_CHOICES, max_length=8
    )
    think_symptoms = models.CharField(
        choices=PAIN_CHOICES, max_length=8
    )
    same_health_life = models.CharField(
        choices=LOVE_CHOICES, max_length=8
    )

    user = models.OneToOneField(
        get_user_model(), null=True, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Questionary')
        verbose_name_plural = _('Questionaries')

    def __str__(self):
        return '{}'.format(self.user)

    def get_absolute_url(self):
        return reverse('Survey', kwargs={'pk': self.pk})
