# Generated by Django 3.1.8 on 2021-06-19 00:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0013_game_check_frequency_hours'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='logo',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
