from scheduling_slots.serializers.common import SlotSerializer
from ..serializers.common import FilmSerializer

class PopulatedFilmSerializer(FilmSerializer):
    slots = SlotSerializer(many=True)
