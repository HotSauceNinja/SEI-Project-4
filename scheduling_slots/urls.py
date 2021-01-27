from django.urls import path
from .views import SlotListView, SlotDetailView

urlpatterns = [
  path('', SlotListView.as_view()),
  path('<int:pk>/', SlotDetailView.as_view()),
]
