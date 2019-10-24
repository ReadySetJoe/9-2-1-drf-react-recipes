from django.urls import path, include

from .views import RecipeListCreateAPIView, RecipeRetrieveUpdateDestroyAPIView
# from .views import RecipeListCreateAPIView, RecipeRetrieveUpdateDestroyAPIView, CustomAuthToken

app_name = 'api'

urlpatterns = [
    path('recipes/<int:pk>/', RecipeRetrieveUpdateDestroyAPIView.as_view(), name='recipe-retrieve-update-destroy'),
    path('recipes/', RecipeListCreateAPIView.as_view(), name='recipe-list-create'),
    # path('rest-auth/login/', CustomAuthToken.as_view(), name='login'),
    path('rest-auth/', include('rest_auth.urls')),
]
