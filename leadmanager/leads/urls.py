from rest_framework import routers
from .api import LeadViewSet, GameViewSet, SubGameViewSet

router = routers.DefaultRouter()
router.register('leads', LeadViewSet, 'leads')
router.register('games', GameViewSet, 'games')
router.register('sub_games', SubGameViewSet, 'sub_games')
urlpatterns = router.urls
