from django.contrib import admin
from .models import *


# Register your models here.

class GenshinCodesAdmin(admin.ModelAdmin):
    list_display = [field.name for field in GenshinCodes._meta.get_fields()]
    ordering = ['created_at']

class EpicFreeAdmin(admin.ModelAdmin):
    list_display = [field.name for field in EpicFree._meta.get_fields()]
    ordering = ['created_at']

# admin.site.register(Lead)
admin.site.register(GenshinCodes, GenshinCodesAdmin)
admin.site.register(EpicFree, EpicFreeAdmin)
