from films.serializers.common import FilmSerializer
from ..serializers.common import SectionSerializer

class PopulatedSectionSerializer(SectionSerializer):

    films = FilmSerializer(many=True)
