from films.serializers.common import FilmSerializer
from scheduling_slots.serializers.common import SlotSerializer
from ..serializers.common import UserSerializer

class PopulatedUserSerializer(UserSerializer):
    posted_films = FilmSerializer(many=True)
    scheduled_slots = SlotSerializer(many=True)
