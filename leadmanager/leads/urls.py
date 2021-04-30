from rest_framework import routers
from .api import LeadViewSet, GameViewSet, SubGameViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')
router.register('api/games', GameViewSet, 'games')
router.register('api/sub_games', SubGameViewSet, 'sub_games')
urlpatterns = router.urls
