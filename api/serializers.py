from rest_framework import serializers

from recipes.models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = (
            'id',
            'title',
            'image',
            'created_by',
            'private',
            'type',
            'prep_time',
            'cook_time',
            'cook_temp',
            'cook_temp_unit',
            'notes',
        )
