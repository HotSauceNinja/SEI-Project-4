from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Slot
from .serializers.common import SlotSerializer

class SlotListView(APIView):
    """ View for get request to /slots """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        slots = Slot.objects.all()
        serialized_slot = SlotSerializer(slots, many=True)
        return Response(serialized_slot.data, status=status.HTTP_200_OK)

    def post(self, request):
        slot_to_create = SlotSerializer(data=request.data)
        if slot_to_create.is_valid():
            slot_to_create.save()
            return Response(slot_to_create.data, status=status.HTTP_201_CREATED)
        return Response(slot_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class SlotDetailView(APIView):
    """ View for get request to /slots/id """
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get_slot(self, pk):
    # returns slot from db by its pk(id) or responds 404 not found
        try:
            return Slot.objects.get(pk=pk)
        except Slot.DoesNotExist:
            raise NotFound()

    # show one slot
    def get(self, _request, pk):
        slot = self.get_slot(pk=pk)
        serialized_slot = SlotSerializer(slot)
        return Response(serialized_slot.data, status=status.HTTP_200_OK)

    # edit one slot
    def put(self, request, pk):
        slot_to_update = self.get_slot(pk=pk)
        updated_slot = SlotSerializer(slot_to_update, data=request.data)
        if updated_slot.is_valid():
            updated_slot.save()
            return Response(updated_slot.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_slot.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    #  delete one slot
    def delete(self, _request, pk):
        slot_to_delete = self.get_slot(pk=pk)
        slot_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)