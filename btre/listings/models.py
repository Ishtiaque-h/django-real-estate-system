from django.db import models
from datetime import datetime
from btre.realtors.models import Realtor

class Listing(models.Model):
    realtor = models.ForeignKey(Realtor, on_delete = models.DO_NOTHING, blank = True,null=True)
    title = models.CharField( max_length=200, blank = True,null=True)
    description = models.TextField(blank = True, null=True)
    address = models.CharField( max_length=200, blank = True,null=True)
    city = models.CharField( max_length=100, blank = True,null=True)
    state = models.CharField( max_length=100, blank = True,null=True)
    zipcode = models.CharField( max_length=20, blank = True, null=True)
    price = models.IntegerField(blank = True, null=True)
    bedrooms = models.IntegerField(blank = True, null=True)
    garage = models.IntegerField(default=0,blank = True, null=True)
    sqft = models.IntegerField(blank = True, null=True)
    bathrooms = models.DecimalField( max_digits=2, decimal_places=1, blank = True, null=True)
    lot_size = models.DecimalField( max_digits=5, decimal_places=1, blank = True, null=True)
    list_date = models.DateField( default=datetime.now, blank = True, null=True )
    is_published = models.BooleanField(default=True, blank = True, null=True)
    photo_main = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    photo1 = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    photo2 = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    photo3 = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    photo4 = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    photo5 = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    photo6 = models.ImageField( upload_to='Photos/%Y/%m/%d', blank = True, null=True)
    def __str__(self):
        return self.title



