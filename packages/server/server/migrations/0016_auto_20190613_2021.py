# Generated by Django 2.2.1 on 2019-06-13 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0015_history_closed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='history',
            name='closed',
        ),
        migrations.AlterField(
            model_name='historyline',
            name='answer',
            field=models.CharField(choices=[('left', 'left'), ('right', 'right')], max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='historyline',
            name='correct_answer',
            field=models.CharField(choices=[('left', 'left'), ('right', 'right')], max_length=5),
        ),
        migrations.AlterField(
            model_name='question',
            name='correct_answer',
            field=models.CharField(choices=[('left', 'left'), ('right', 'right')], max_length=5),
        ),
    ]
