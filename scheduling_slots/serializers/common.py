from datetime import timedelta
from rest_framework import serializers
from django.utils import timezone
from django.core.exceptions import ValidationError
from ..models import Slot


class SlotSerializer(serializers.ModelSerializer):

    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()

    def validate(self, data):
        start_time = data.get('start_time')
        end_time = data.get('end_time')

        # check that the start time is in the future
        if start_time <= timezone.now():
            raise ValidationError({'start_time':'Time must be greater than current time'})

        if not end_time > start_time:
            raise ValidationError({'end_time':'End time must be greater than Start time'})

        # if not end_time:
        #     raise ValidationError({'end_time':'You must specify an end time'})

        return data

    class Meta:
        model = Slot
        fields = '__all__'

