from copy import copy

from .models import Lead, Game, SubscribedGame
from rest_framework import viewsets, permissions, status
from .serializers import LeadSerializer, GameSerializer, SubGameSerializer
from rest_framework.response import Response
from django.db.models import Q
import json


# Lead Viewset
class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def create(self, request, *args, **kwargs):
        game_id = int(request.body)
        game_subed_id = request.user.sub_games.id
        subGames = SubscribedGame.objects.get(id=game_subed_id)
        game_subed = [int(i) for i in (subGames.subGames.replace('*', "").split('|'))[:-1]]
        game_subed.append(game_id)
        game_subed.sort()
        string = ''
        for game in game_subed:
            string += f'*{game}|'

        subGames.subGames = string
        subGames.save()
        return Response({"msg": "sucess"}, status=status.HTTP_201_CREATED)

    # def perform_create(self, serializer):
    #     # serializer.save(owner=self.request.user)
    #     print('testing')
    #     # return Response({"msg": "sucess"})

    def destroy(self, request, *args, **kwargs):
        game_id = kwargs['pk']
        game_subed_id = request.user.sub_games.id
        game_subed = (request.user.sub_games.subGames.split('|'))
        game_subed = list(filter(lambda k: f'*{game_id}' != k or len(k) < 0, game_subed))

        subGames = SubscribedGame.objects.get(id=game_subed_id)
        subGames.subGames = '|'.join(game_subed)
        subGames.save()
        return Response({"msg": "sucess"}, status=status.HTTP_200_OK)


class GameViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    serializer_class = GameSerializer

    def list(self, request):
        record_type = request.query_params['gameType']
        if 'user' in request.query_params.keys():
            owner = json.loads(request.query_params['user'])['id']
        else:
            owner = None
        queryset = Game.objects.filter(Q(record_type=record_type) | Q(owner=owner))
        serializer = GameSerializer(queryset.filter(active=True), many=True)
        if len(serializer.data) > 0:
            return Response(serializer.data)
        else:
            serializer = GameSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"msg": "failed, need login"}, status=status.HTTP_401_UNAUTHORIZED)
        req_data = copy(request.data)

        if req_data['id'] == '':
            duplicate_obj = Game.objects.filter(official_site=req_data['official_site'], owner=request.user.id)
            if len(duplicate_obj) > 0:
                return Response({'msg': f"there is already a notification for {req_data['official_site']}, try fresh the site"},
                                status=status.HTTP_400_BAD_REQUEST)
            req_data['record_type'] = 'pr'
            req_data['active'] = True
            req_data['owner'] = request.user.id
            serializer = GameSerializer(data=req_data)
        else:
            if req_data['logo'] == '':
                req_data.pop('logo')
            game_obj = Game.objects.get(id=int(req_data['id']))
            req_data['active'] = game_obj.active
            serializer = GameSerializer(game_obj, data=req_data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": req_data}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubGameViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = SubGameSerializer

    def list(self, request, *args, **kwargs):
        return Response(SubGameSerializer(self.request.user.sub_games).data, status=status.HTTP_200_OK)
