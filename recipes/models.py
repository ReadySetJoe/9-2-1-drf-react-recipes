from django.contrib.auth import get_user_model
from django.db import models

from datetime import timedelta

User = get_user_model()


class Recipe(models.Model):

    FAHRENHEIT = 'Fahrenheit'
    CELSIUS = 'Celsius'
    COOK_TEMP_UNIT_CHOICES = [
        (FAHRENHEIT, 'Fahrenheit'),
        (CELSIUS, 'Celsius'),
    ]

    ANYTIME = 'Anytime'
    BREAKFAST = 'Breakfast'
    LUNCH = 'Lunch'
    DINNER = 'Dinner'
    RECIPE_TYPE_CHOICES = [
        (ANYTIME, 'Anytime'),
        (BREAKFAST, 'Breakfast'),
        (LUNCH, 'Lunch'),
        (DINNER, 'Dinner'),
    ]

    title = models.CharField(default='', max_length=255)
    image = models.ImageField(default=None, upload_to='images/')
    created_by = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    private = models.BooleanField(default=False)
    type = models.CharField(max_length=10, choices=RECIPE_TYPE_CHOICES, default=ANYTIME)
    prep_time = models.DurationField(default=timedelta())
    cook_time = models.DurationField(default=timedelta())
    cook_temp = models.IntegerField(default=0)
    cook_temp_unit = models.CharField(max_length=11, choices=COOK_TEMP_UNIT_CHOICES, default=FAHRENHEIT)
    notes = models.CharField(max_length=300, default=' ', blank=True)

    def __str__(self):
        return self.title

    def is_popular(self):
        return self.profiles.count() > 5

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        super().save_model(request, obj, form, change)
