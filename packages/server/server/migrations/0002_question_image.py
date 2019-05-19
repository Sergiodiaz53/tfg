# Generated by Django 2.2.1 on 2019-05-13 21:31

from django.db import migrations, models
import server.models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='image',
            field=models.ImageField(default='', upload_to=server.models.question_image_directory_path),
            preserve_default=False,
        ),
    ]
