from django.db import models


# Create your models here.

class GenshinCodes(models.Model):
    line = models.CharField(max_length=254, null=False, blank=False)
    emailed = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)


class EpicFree(models.Model):
    line = models.CharField(max_length=254, null=False, blank=False)
    emailed = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
