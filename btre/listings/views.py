from django.shortcuts import get_object_or_404, render
from django.core.paginator import Paginator

from itertools import chain
from .models import Listing
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
from .choices import bedroom_choices, price_choices, state_choices
from django.http import JsonResponse

def index(request):
    listings = Listing.objects.order_by('-list_date').filter(is_published=True)
    paginator = Paginator(listings, 6) # Show 3 contacts per page.
    page_number = request.GET.get('page')
    page_listings = paginator.get_page(page_number)

    context = {
        'listings' : page_listings
    }
    
    return render(request, 'listings/listings.html', context) 

def listing(request, listing_id):
    listing = get_object_or_404(Listing, pk = listing_id)
    context = {
        'listing' : listing
    }
    return render(request, 'listings/listing.html', context) 

def search(request):
    queryset_list = Listing.objects.order_by('-list_date')

    #filter for keywords
    if 'keywords' in request.GET:
        keywords = request.GET['keywords']
        if keywords:
            queryset_list = queryset_list.filter(description__icontains = keywords) 
    
    #filter for city
    if 'city' in request.GET:
        city = request.GET['city']
        if city:
            queryset_list = queryset_list.filter(city__iexact = city)
     
     #filter for state
    if 'state' in request.GET:
        state = request.GET['state']
        if state:
            queryset_list = queryset_list.filter(state__iexact = state) 

    #filter for bedrooms
    if 'bedrooms' in request.GET:
        bedrooms = request.GET['bedrooms']
        if bedrooms:
            queryset_list = queryset_list.filter(bedrooms__lte = bedrooms) 

    #filter for price
    if 'price' in request.GET:
        price = request.GET['price']
        if price:
            queryset_list = queryset_list.filter(price__lte = price) 

    context = {
        'listings' : queryset_list,
        'bedroom_choices' : bedroom_choices,
        'price_choices' : price_choices,
        'state_choices' : state_choices,
        'values' : request.GET
    }
    return render(request, 'listings/search.html', context)  

def find(request):
    if request.is_ajax():
        search_text = request.GET.get("search_text", "").lower()
        if len(search_text)==0:
            return JsonResponse({'listings':[]})
        startswith = Listing.objects.filter(title__istartswith=search_text)
        listings = list(chain(startswith.values_list('title', flat=True), Listing.objects.filter(title__icontains=search_text).exclude(pk__in=startswith.values_list('pk', flat=True)).values_list('title', flat=True)))
        return JsonResponse({'listings':listings})
    return render(request, 'listings/find.html')