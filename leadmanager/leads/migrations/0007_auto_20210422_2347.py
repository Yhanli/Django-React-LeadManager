# Generated by Django 3.2 on 2021-04-22 23:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('leads', '0006_game_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='descriptions',
            field=models.TextField(blank=True),
        ),
        migrations.CreateModel(
            name='SubscribedGames',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subGames', models.TextField(default='')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sub_games', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
