from django.contrib import admin
from .models import SearchQuery

class SearchQueryAdmin(admin.ModelAdmin):
    list_display = ('query', 'results_count', 'searched_at')
    search_fields = ('query',)
    list_filter = ('searched_at',)
    readonly_fields = ('searched_at',)

admin.site.register(SearchQuery, SearchQueryAdmin)
