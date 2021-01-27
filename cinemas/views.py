from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Cinema
from .serializers.common import CinemaSerializer

class CinemaListView(APIView):
    """ View for get request to /cinemas """

    def get(self, _request):
        cinemas = Cinema.objects.all()
        serialized_cinema = CinemaSerializer(cinemas, many=True)
        return Response(serialized_cinema.data, status=status.HTTP_200_OK)

class CinemaDetailView(APIView):
    """ View for get request to /cinemas/id """

    # get cinema by its primary key (id from url)
    def get(self, _request, pk):
        try:
            cinema = Cinema.objects.get(pk=pk)
            serialized_cinema = CinemaSerializer(cinema)
            return Response(serialized_cinema.data, status=status.HTTP_200_OK)
        except Cinema.DoesNotExist:
            raise NotFound()
