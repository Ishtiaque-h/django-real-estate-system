"""btre URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.views.static import serve
import debug_toolbar


urlpatterns = [
    path('', include(('btre.pages.urls','pages'), namespace ='pages')),
    path('listings/', include(('btre.listings.urls','listings'), namespace ='listings')),
    path('account/', include(('btre.account.urls', 'account'), namespace ='account')),
    path('contact/', include(('btre.contact.urls','contact'), namespace ='contact')),
    path('dashboard/', include(('btre.dashboard.urls','dashboard'), namespace ='dashboard')),
    path('admin/', admin.site.urls),
    path('__debug__/', include(debug_toolbar.urls)),	
	url(r'^static/(?P<path>.*)$', serve,{'document_root': "static"}),
    ]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

