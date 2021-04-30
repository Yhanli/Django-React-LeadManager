from django.db import models
from django.contrib.auth.models import User


class Lead(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=False)
    message = models.CharField(max_length=500, blank=True)
    owner = models.ForeignKey(User, related_name="leads", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Game(models.Model):
    active = models.BooleanField(default=True)
    name = models.CharField(max_length=100)
    official_site = models.URLField(blank=True)
    descriptions = models.TextField(blank=True)
    logo = models.ImageField()


class SubscribedGame(models.Model):
    owner = models.OneToOneField(User, related_name='sub_games', on_delete=models.CASCADE, null=True)
    subGames = models.TextField(default="")


