from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Genre
from .serializers.populated import PopulatedGenreSerializer

class GenreListView(APIView):
    """ View for get request to /genre s """

    def get(self, _request):
        genres = Genre.objects.all()
        serialized_genre = PopulatedGenreSerializer(genres, many=True)
        return Response(serialized_genre.data, status=status.HTTP_200_OK)

class GenreDetailView(APIView):
    """ View for get request to /genres/id """

    # get genre by its primary key (id from url)
    def get(self, _request, pk):
        try:
            genre = Genre.objects.get(pk=pk)
            serialized_genre = PopulatedGenreSerializer(genre)
            return Response(serialized_genre.data, status=status.HTTP_200_OK)
        except Genre.DoesNotExist:
            raise NotFound()
