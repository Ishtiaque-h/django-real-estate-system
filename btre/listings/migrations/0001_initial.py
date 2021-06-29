# Generated by Django 3.1.4 on 2021-06-13 12:43

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('realtors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('state', models.CharField(blank=True, max_length=100, null=True)),
                ('zipcode', models.CharField(blank=True, max_length=20, null=True)),
                ('price', models.IntegerField(blank=True, null=True)),
                ('bedrooms', models.IntegerField(blank=True, null=True)),
                ('garage', models.IntegerField(blank=True, default=0, null=True)),
                ('sqft', models.IntegerField(blank=True, null=True)),
                ('bathrooms', models.DecimalField(blank=True, decimal_places=1, max_digits=2, null=True)),
                ('lot_size', models.DecimalField(blank=True, decimal_places=1, max_digits=5, null=True)),
                ('list_date', models.DateField(blank=True, default=datetime.datetime.now, null=True)),
                ('is_published', models.BooleanField(blank=True, default=True, null=True)),
                ('photo_main', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('photo1', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('photo2', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('photo3', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('photo4', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('photo5', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('photo6', models.ImageField(blank=True, null=True, upload_to='Photos/%Y/%m/%d')),
                ('realtor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='realtors.realtor')),
            ],
        ),
    ]
