from scheduling_slots.serializers.common import SlotSerializer
from genres.serializers.common import GenreSerializer
from sections.serializers.common import SectionSerializer
from ..serializers.common import FilmSerializer

class PopulatedFilmSerializer(FilmSerializer):
    slots = SlotSerializer(many=True)
    genre = GenreSerializer(many=True)
    section = SectionSerializer(many=True)
