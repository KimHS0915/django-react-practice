from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        'username',
        'name',
        'email',
    ]
    list_per_page = 20
    search_fields = ['username', 'name']
