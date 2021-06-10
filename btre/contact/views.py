from django.shortcuts import redirect, render
from .models import Contact
from django.contrib import messages
def contact(request):
    if request.method == "POST":
        print("hello")
        listing = request.POST.get("listing")
        listing_id = request.POST.get("listing_id")
        name = request.POST.get("name")
        email = request.POST.get("email")
        phone = request.POST.get("phone")
        message = request.POST.get("message")
        contact_date = request.POST.get("contact_date")
        user_id = request.POST.get("user_id")
        realtor_email = request.POST.get("realtor_email")

        contact = Contact(listing = listing, listing_id = listing_id, name = name, email = email, phone = phone, message = message, contact_date = contact_date, user_id = user_id, realtor_email = realtor_email)
        contact.save()

        messages.success(request, "Your enquiry has been sent successfully, a realtor will get back  to you soon")
        return redirect('listings:listings/'+listing_id)
