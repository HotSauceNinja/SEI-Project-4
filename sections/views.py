from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Section
from .serializers.common import SectionSerializer

class SectionListView(APIView):
    """ View for get request to /sections """

    def get(self, _request):
        sections = Section.objects.all()
        serialized_section = SectionSerializer(sections, many=True)
        return Response(serialized_section.data, status=status.HTTP_200_OK)

class SectionDetailView(APIView):
    """ View for get request to /sections/id """

    # get section by its primary key (id from url)
    def get(self, _request, pk):
        try:
            section = Section.objects.get(pk=pk)
            serialized_section = SectionSerializer(section)
            return Response(serialized_section.data, status=status.HTTP_200_OK)
        except Section.DoesNotExist:
            raise NotFound()
