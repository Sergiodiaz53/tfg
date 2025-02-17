# Generated by Django 2.2.1 on 2019-05-13 21:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Datetime', models.DateTimeField(auto_now=True, verbose_name='Datetime')),
            ],
            options={
                'verbose_name': 'History',
                'verbose_name_plural': 'Historys',
            },
        ),
        migrations.CreateModel(
            name='QuestionLevel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.PositiveIntegerField(unique=True, verbose_name='level')),
            ],
            options={
                'verbose_name': 'QuestionLevel',
                'verbose_name_plural': 'QuestionLevels',
            },
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('correct_answer', models.CharField(choices=[('LEFT', 'left'), ('RIGHT', 'right')], max_length=5)),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.QuestionLevel')),
            ],
            options={
                'verbose_name': 'Question',
                'verbose_name_plural': 'Questions',
            },
        ),
        migrations.CreateModel(
            name='HistoryLine',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.CharField(choices=[('LEFT', 'left'), ('RIGHT', 'right')], max_length=5)),
                ('time', models.TimeField()),
                ('history', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.History')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.Question')),
            ],
            options={
                'verbose_name': 'HistoryLine',
                'verbose_name_plural': 'HistoryLines',
            },
        ),
        migrations.AddField(
            model_name='history',
            name='question_level',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='server.QuestionLevel'),
        ),
        migrations.AddField(
            model_name='history',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
