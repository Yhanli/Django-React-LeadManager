from .models import Lead, Game, SubscribedGame
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer, GameSerializer, SubGameSerializer
from rest_framework.response import Response


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
        game_subed = [int(i) for i in (subGames.subGames.replace('*',"").split('|'))[:-1]]
        game_subed.append(game_id)
        game_subed.sort()
        string = ''
        for game in game_subed:
            string += f'*{game}|'

        subGames.subGames = string
        subGames.save()
        return Response({"msg": "sucess"})

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
        return Response({"msg": "sucess"})


class GameViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    serializer_class = GameSerializer

    def list(self, request):
        queryset = Game.objects.all()
        serializer = GameSerializer(queryset.filter(active=True), many=True)
        if len(serializer.data) > 0:
            return Response(serializer.data)
        else:
            serializer = GameSerializer(queryset, many=True)
            return Response(serializer.data)


class SubGameViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    serializer_class = SubGameSerializer

    def list(self, request, *args, **kwargs):
        return Response(SubGameSerializer(self.request.user.sub_games).data)
