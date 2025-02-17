# Generated by Django 2.2.1 on 2019-05-16 21:12

from django.db import migrations, models
import server.models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_auto_20190513_2138'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='history',
            name='question_level',
        ),
        migrations.RemoveField(
            model_name='historyline',
            name='history',
        ),
        migrations.RemoveField(
            model_name='historyline',
            name='question',
        ),
        migrations.AddField(
            model_name='history',
            name='level',
            field=models.PositiveIntegerField(default=1, unique=True, verbose_name='level'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='historyline',
            name='correct_answer',
            field=models.CharField(choices=[('LEFT', 'left'), ('RIGHT', 'right')], default=1, max_length=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='historyline',
            name='image',
            field=models.ImageField(default='', upload_to=server.models.question_image_directory_path),
            preserve_default=False,
        ),
    ]
