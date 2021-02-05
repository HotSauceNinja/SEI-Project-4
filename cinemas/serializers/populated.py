# from scheduling_slots.serializers.common import SlotSerializer
# from ..serializers.common import CinemaSerializer

# class PopulatedCinemaSerializer(CinemaSerializer):
#     slots = SlotSerializer(many=True)

from scheduling_slots.serializers.populated import PopulatedSlotSerializer
from ..serializers.common import CinemaSerializer

class PopulatedCinemaSerializer(CinemaSerializer):
    slots = PopulatedSlotSerializer(many=True)
