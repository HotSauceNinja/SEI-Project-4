from scheduling_slots.serializers.common import SlotSerializer
from ..serializers.common import CinemaSerializer

class PopulatedCinemaSerializer(CinemaSerializer):
    slots = SlotSerializer(many=True)
