from django.shortcuts import redirect, render
from .models import Contact
from django.contrib import messages
from django.core.mail import send_mail

def contact(request):
    if request.method == "POST":
        
        listing = request.POST.get("listing")
        listing_id = request.POST.get("listing_id")
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        message = request.POST.get("message")
        user_id = request.POST.get("user_id")
        realtor_email = request.POST.get("realtor_email")

        #check if user has already made an inquiry
        if request.user.is_authenticated:
            #user_id = request.user_id
            has_contacted = Contact.objects.all().filter(listing_id=listing_id, user_id=user_id)
            if has_contacted:
                messages.error(request, "You have already made an enquiry for this listing")
                return redirect('listings:listing',listing_id = listing_id)

        contact = Contact(listing = listing, listing_id = listing_id, name = name, email = email, phone = phone, message = message, user_id = user_id)
        contact.save()
        
        #SEND EMAIL
        send_mail(
            'Property Listing Inquiry',
            'There has been an inquiry for ' +listing+'. Sign in to the admin panel for more info.',
            'ishti.jewel@gmail.com',
            [realtor_email, 'ishtiaque.ndc@gmail.com'],
            fail_silently=False,
        )

        messages.success(request, "Your enquiry has been sent successfully, a realtor will get back to you soon")
        return redirect('listings:listing',listing_id = listing_id)
