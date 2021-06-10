from django.contrib import admin
from .models import Realtor

class RealtorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'phone',  'hire_date', 'is_sotm')
    list_display_links = ('id', 'name')
    list_filter = ('hire_date',)
    list_editable = ('is_sotm',)
    search_fields = ('name',) 
    list_per_page = 20


admin.site.register(Realtor, RealtorAdmin)
