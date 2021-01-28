from jwt_auth.serializers.common import NestedUserSerializer
from films.serializers.common import FilmSerializer
from cinemas.serializers.common import CinemaSerializer
from ..serializers.common import SlotSerializer

class PopulatedSlotSerializer(SlotSerializer):
    film = FilmSerializer()
    cinema = CinemaSerializer()
    # shows user who created slot
    scheduled_by = NestedUserSerializer()
