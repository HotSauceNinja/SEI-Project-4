from scheduling_slots.serializers.common import SlotSerializer
from genres.serializers.common import GenreSerializer
from sections.serializers.common import SectionSerializer
from jwt_auth.serializers.common import NestedUserSerializer
from ..serializers.common import FilmSerializer

class PopulatedFilmSerializer(FilmSerializer):
    slots = SlotSerializer(many=True)
    genre = GenreSerializer(many=True)
    section = SectionSerializer(many=True)
    # shows the creator of this film:
    creator = NestedUserSerializer()

