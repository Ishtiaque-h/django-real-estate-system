from django.shortcuts import render
from btre.listings.models import Listing
from btre.realtors.models import Realtor
from btre.listings.choices import bedroom_choices, price_choices, state_choices

def index(request):
    listings = Listing.objects.order_by('-list_date').filter(is_published=True) [:3]
    context = {
        'listings' : listings,
        'bedroom_choices' : bedroom_choices,
        'price_choices' : price_choices,
        'state_choices' : state_choices
    }
    return render(request, 'pages/index.html', context)  

def about(request):
    #get all realtors
    realtors = Realtor.objects.order_by('-hire_date')
    #get sotm
    sotm = Realtor.objects.filter(is_sotm = True)

    context = {
        'realtors': realtors,
        'sotm' : sotm 
    }
    return render(request, 'pages/about.html', context)

