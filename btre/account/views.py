from django.shortcuts import redirect, render
from django.contrib import auth, messages
from django.contrib.auth.models import User
from btre.listings.models import Listing
import email
from django.http import JsonResponse


# Create your views here.
def register(request):
    if request.is_ajax and request.method == 'POST':
        #Get form values
        request.POST.get("csrfmiddlewaretoken")
        first_name = request.POST.get("first_name","")
        last_name = request.POST.get('last_name',"")
        username = request.POST.get("username")
        email = request.POST.get('email')
        #mobile = request.POST.get('mobile',"")
        password2 = request.POST.get('password2')
        password = request.POST.get('password')

        #check if password matches
        if password == password2:
            if User.objects.filter(username__iexact = username ).exists():
                #messages.error(request, 'This username already taken')
                data= {
                    'status': 1
                    #alert user exists
                }
                return JsonResponse(data)
                #return redirect('account:register')
            else:
                if User.objects.filter(email__iexact = email ).exists():
                    #messages.error(request, 'This username already taken')
                    data= {
                        'status': 2
                        #alert email exists
                    }
                    return JsonResponse(data)
                    #return redirect('account:register')
                else:
                    user = User.objects.create_user(username=username, email=email, password = password, first_name =first_name, last_name = last_name)
                    #login after register
                    #auth.login(request, user)
                    #messages.success(request, 'You are successfully registered and logged in')
                    #return redirect('index')

                    #stay at register page
                    user.save()
                    
                    #messages.success(request, 'You are successfully registered and you can login now')
                    data= {
                        'status': 3
                        #alert user is saved
                    }
                    return JsonResponse(data)
                    #return redirect('account:login')
        else:
            #messages.error(request, 'Passwords do not match')
            #return redirect('account: register')
            data = {
                'status': 4
            }
            return JsonResponse(data)
    else:
        return render(request, 'account/register.html')

def login(request):
    if request.user.is_authenticated:
        return redirect('listings:listings')
    if request.is_ajax and request.method == 'POST':
        #Get form values
        request.POST.get("csrfmiddlewaretken")
        username = request.POST.get('username',"")
        password = request.POST['password']
        user = auth.authenticate(username = username, password = password)

        if user is not None:
            auth.login(request,user)
            #messages.success(request, 'You are succsssfully logged in')
            #return redirect('', user)
            data = {
                'status': 1
            }
            return JsonResponse(data)
        else:
            #messages.error(request,'invalid credentials')
            #return redirect('login')
            data = {
                'status':2
            }
            return JsonResponse(data)
    else:
        return render(request, 'account/login.html')

def logout(request):
        auth.logout(request)
        #messages.success(request, 'You are succsssfully logged out')
        return redirect('pages:index')

def dashboard(request):
    listings = Listing.objects.order_by('-list_date')
    context = {
        'listings' : listings
    }
    return render(request, 'account/dashboard.html', context)