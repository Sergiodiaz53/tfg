# Generated by Django 2.2.1 on 2019-05-19 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0007_auto_20190518_1838'),
    ]

    operations = [
        migrations.AlterField(
            model_name='historyline',
            name='answer',
            field=models.CharField(choices=[('LEFT', 'left'), ('RIGHT', 'right')], max_length=5, null=True),
        ),
        migrations.AlterField(
            model_name='historyline',
            name='time',
            field=models.TimeField(null=True),
        ),
    ]
