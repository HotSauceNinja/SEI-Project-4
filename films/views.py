from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Film
from .serializers.common import FilmSerializer

class FilmListView(APIView):
    """ View for get request to /films """

    def get(self, _request):
        films = Film.objects.all()
        serialized_film = FilmSerializer(films, many=True)
        return Response(serialized_film.data, status=status.HTTP_200_OK)

class FilmDetailView(APIView):
    """ View for get request to /films/id """

    # get film by its primary key (id from url)
    def get(self, _request, pk):
        try:
            film = Film.objects.get(pk=pk)
            serialized_film = FilmSerializer(film)
            return Response(serialized_film.data, status=status.HTTP_200_OK)
        except Film.DoesNotExist:
            raise NotFound()
