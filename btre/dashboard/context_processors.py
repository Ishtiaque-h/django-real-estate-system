from django.conf import settings
from django.core.paginator import Paginator


def default_context(request):
    grocery_context = {
        'static_server':settings.STATIC_SERVER,
        'maintheme_server':settings.MAINTHEME_SERVER,
		'media_server':settings.MEDIA_SERVER,
    }
    return grocery_context