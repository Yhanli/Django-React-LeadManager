# Generated by Django 3.1.8 on 2021-05-16 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('leads', '0011_game_hash_value'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='last_check',
            field=models.TimeField(default=None, null=True),
        ),
    ]
