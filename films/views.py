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

    def post(self, request):
        film_to_create = FilmSerializer(data=request.data)
        if film_to_create.is_valid():
            film_to_create.save()
            return Response(film_to_create.data, status=status.HTTP_201_CREATED)
        return Response(film_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FilmDetailView(APIView):
    """ View for get request to /films/id """

    def get_film(self, pk):
    # returns film from db by its pk(id) or responds 404 not found
        try:
            return Film.objects.get(pk=pk)
        except Film.DoesNotExist:
            raise NotFound()

    # show one film
    def get(self, _request, pk):
        film = self.get_film(pk=pk)
        serialized_film = FilmSerializer(film)
        return Response(serialized_film.data, status=status.HTTP_200_OK)

    # edit one film
    def put(self, request, pk):
        film_to_update = self.get_film(pk=pk)
        updated_film = FilmSerializer(film_to_update, data=request.data)
        if updated_film.is_valid():
            updated_film.save()
            return Response(updated_film.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_film.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    #  delete one film
    def delete(self, _request, pk):
        film_to_delete = self.get_film(pk=pk)
        film_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)