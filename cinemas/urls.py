from django.urls import path
from .views import CinemaListView, CinemaDetailView

urlpatterns = [
  path('', CinemaListView.as_view()),
  path('<int:pk>/', CinemaDetailView.as_view()),
]
