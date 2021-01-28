from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Film
from .serializers.common import FilmSerializer
from .serializers.populated import PopulatedFilmSerializer

class FilmListView(APIView):
    """ View for get request to /films """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    # show all films - can be seen by all users
    def get(self, _request):
        films = Film.objects.all()
        serialized_film = PopulatedFilmSerializer(films, many=True)
        return Response(serialized_film.data, status=status.HTTP_200_OK)

    # create a film - only logged in users
    def post(self, request):
        # add creator id into the request before sending into serializer
        request.data["creator"] = request.user.id
        film_to_create = FilmSerializer(data=request.data)
        if film_to_create.is_valid():
            film_to_create.save()
            return Response(film_to_create.data, status=status.HTTP_201_CREATED)
        return Response(film_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FilmDetailView(APIView):
    """ View for get request to /films/id """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_film(self, pk):
    # returns film from db by its pk(id) or responds 404 not found
        try:
            return Film.objects.get(pk=pk)
        except Film.DoesNotExist:
            raise NotFound()

    # show one film - can be seen by all users
    def get(self, _request, pk):
        film = self.get_film(pk=pk)
        serialized_film = PopulatedFilmSerializer(film)
        return Response(serialized_film.data, status=status.HTTP_200_OK)

    # edit film - only user who created this film
    def put(self, request, pk):
        film_to_update = self.get_film(pk=pk)

        #  if user who is trying to edit is not user who created the film - permission denied:
        if film_to_update.creator.id != request.user.id:
            raise PermissionDenied()

        updated_film = FilmSerializer(film_to_update, data=request.data)
        if updated_film.is_valid():
            updated_film.save()
            return Response(updated_film.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_film.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    # delete film - only user who created this film
    def delete(self, request, pk):
        film_to_delete = self.get_film(pk=pk)

        #  if user who is trying to delete is not user who created the film - permission denied
        if film_to_delete.creator.id != request.user.id:
            raise PermissionDenied()

        film_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
