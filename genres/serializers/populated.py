from films.serializers.common import FilmSerializer
from ..serializers.common import GenreSerializer

class PopulatedGenreSerializer(GenreSerializer):
    """ Used for all outgoing serialization """

    films = FilmSerializer(many=True)