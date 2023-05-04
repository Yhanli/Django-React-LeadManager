from rest_framework import serializers
from leads.models import Lead, Game, SubscribedGame


# Lead Serializer

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = '__all__'


class SubGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscribedGame
        fields = '__all__'


class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'
