from django.urls import path, include

from .views import RecipeListCreateAPIView

app_name = 'api'

urlpatterns = [
    path('recipes/', RecipeListCreateAPIView.as_view(), name='recipe-list-create'),
    path('rest-auth/', include('rest_auth.urls')),
]
