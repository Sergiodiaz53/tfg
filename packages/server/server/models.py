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
    ('male', 'male'),
    ('female', 'female')
)

FREQUENCY_CHOICES = (
    ('never', 'never'),
    ('rarely', 'rarely'),
    ('sometimes', 'sometimes'),
    ('many times', 'many times'),
    ('usually', 'usually'),
    ('always', 'always')
)

PAIN_CHOICES = (
    ('none', 'none'),
    ('a little', 'a little'),
    ('some', 'some'),
    ('lot', 'lot')
)

LOVE_CHOICES = (
    ('charmed', 'charmed'),
    ('very satisfied', 'very satisfied'),
    ('satisfied', 'satisfied'),
    ('confused', 'confused'),
    ('dissatisfied', 'dissatisfied'),
    ('discontent', 'discontent'),
    ('fatal', 'fatal')
)


class UserProfile(models.Model):
    level = models.PositiveIntegerField(default=1)
    sex = models.CharField(
        choices=SEX_CHOICES, max_length=6, null=True)
    years = models.PositiveSmallIntegerField(null=True)
    weight = models.PositiveSmallIntegerField(null=True)
    height = models.PositiveSmallIntegerField(null=True)

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
    extension = os.path.splitext(filename)[1]

    answers = {ANSWER_CHOICES[0][0]: 'I', ANSWER_CHOICES[1][0]: 'D'}
    return 'questions/{}/{}-{}{}'.format(
        instance.question_level.level,
        answers[instance.correct_answer],
        timezone.now().strftime('%Y-%m-%d'),
        extension
    )


class QuestionLevel(models.Model):

    level = models.PositiveIntegerField(unique=True)
    average_duration = models.PositiveIntegerField(
        default=0,
        validators=[
            validators.MinValueValidator(0)
        ])
    duration_threshold = models.PositiveIntegerField(
        default=0,
        validators=[
            validators.MinValueValidator(0),
            validators.MaxValueValidator(100)
        ])

    class Meta:
        verbose_name = _('Question level')
        verbose_name_plural = _('Question levels')

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

    image = models.ImageField(
        upload_to=question_image_directory_path, blank=True)
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


@receiver(models.signals.post_delete, sender=Question)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)


@receiver(models.signals.pre_save, sender=Question)
def auto_delete_file_on_change(sender, instance, **kwargs):
    if not instance.pk:
        return False

    try:
        old_file = sender.objects.get(pk=instance.pk).image
    except sender.DoesNotExist:
        return False

    new_file = instance.image
    if not old_file == new_file:
        if os.path.isfile(old_file.path):
            os.remove(old_file.path)


class History(models.Model):

    created = models.DateTimeField(auto_now=True)
    valoration = models.FloatField(
        validators=[
            validators.MinValueValidator(0.0),
            validators.MaxValueValidator(1.0)
        ]
    )
    user = models.ForeignKey(settings.AUTH_USER_MODEL, models.CASCADE)
    # question level
    level = models.PositiveIntegerField()

    class Meta:
        verbose_name = _('History')
        verbose_name_plural = _('Historys')

    def __str__(self):
        return '{}/{}'.format(self.user.pk, self.created)

    def get_absolute_url(self):
        return reverse('History_detail', kwargs={'pk': self.pk})

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
        blank=True, null=True, choices=FREQUENCY_CHOICES, max_length=10
    )
    pee_pain = models.BooleanField()
    sexual_relations_pain = models.BooleanField(default=False)
    pain_intensity = models.PositiveIntegerField(
        blank=True,
        null=True,
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
        get_user_model(),
        null=True,
        on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('Questionary')
        verbose_name_plural = _('Questionaries')

    def __str__(self):
        return '{}'.format(self.user)

    def get_absolute_url(self):
        return reverse('Survey', kwargs={'pk': self.pk})
