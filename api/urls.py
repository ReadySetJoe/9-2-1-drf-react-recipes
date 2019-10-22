from django.urls import path

from .views import RecipeListCreateAPIView

app_name = 'api'

urlpatterns = [
    path('recipes/', RecipeListCreateAPIView.as_view(), name='recipe-list-create'),
]
