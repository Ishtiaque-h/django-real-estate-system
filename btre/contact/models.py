from django.db import models
from datetime import datetime

class Contact(models.Model):
    listing = models.CharField( max_length=200)
    listing_id = models.IntegerField()
    name = models.CharField( max_length=200)
    email = models.CharField( max_length=100)
    phone = models.CharField( max_length=100)
    message = models.TextField( blank=True)
    contact_date = models.DateTimeField(default=datetime.now, blank=True)
    user_id = models.IntegerField(blank=True)  #to track if someone logged in, but any user can make an inquiry if logged in or not 
    
    def __str__(self):
        return self.name