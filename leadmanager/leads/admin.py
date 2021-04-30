from django.contrib import admin
from .models import *

# Register your models here.

admin.sites.site_header = "Game Sub Admin"
admin.site.site_title = "Game Admin Portal"
admin.site.index_title = "Welcome"


class SubscribedGamePageAdmin(admin.ModelAdmin):
    list_display = ['owner', 'subGames']


class GamePageAdmin(admin.ModelAdmin):
    list_display = ['name', 'active', 'official_site']


# admin.site.register(Lead)
admin.site.register(Game, GamePageAdmin)
admin.site.register(SubscribedGame, SubscribedGamePageAdmin)
