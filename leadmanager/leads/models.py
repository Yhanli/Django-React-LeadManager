from django.db import models
from django.contrib.auth.models import User
from django_resized import ResizedImageField
from datetime import datetime


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=False)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="leads", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Game(models.Model):
    RECORD_TYPES = [
        ("pr", "Private"),
        ("pb", "Public"),
    ]
    active = models.BooleanField(default=True)
    record_type = models.CharField(
        max_length=2,
        choices=RECORD_TYPES,
        default="pb")
    owner = models.ForeignKey(User, related_name='games', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    official_site = models.URLField(blank=True)
    descriptions = models.TextField(blank=True)
    logo = ResizedImageField(size=[500, 500], blank=True, force_format='PNG')
    # logo = models.ImageField(blank=True)
    hash_value = models.CharField(max_length=1000, null=True, blank=True, default=None)
    last_check = models.DateTimeField(null=True, default=datetime.utcnow)
    check_frequency_hours = models.IntegerField(default=1)


class SubscribedGame(models.Model):
    owner = models.OneToOneField(User, related_name='sub_games', on_delete=models.CASCADE, null=True)
    subGames = models.TextField(default="", blank=True)
