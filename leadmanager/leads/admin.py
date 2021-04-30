from django.contrib import admin
from .models import *

# Register your models here.

admin.sites.site_header = "Game Sub Admin"
admin.site.site_title = "Game Admin Portal"
admin.site.index_title = "Welcome"


class PageAdmin(admin.ModelAdmin):
    inlines = []


admin.site.register(Lead)
admin.site.register(Game)
admin.site.register(SubscribedGame)
