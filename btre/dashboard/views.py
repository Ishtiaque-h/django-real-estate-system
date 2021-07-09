from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from .decorators import login_required, superuser_required, staff_required

# Create your views here.
@superuser_required
def index(request):
    
    return render(request, 'dashboard/index.html')

@login_required
def dashboard(request):
    if not request.user.is_superuser and not request.user.is_staff:
        return redirect('account:dashboard')
    users = User.objects.all()
    user = request.user
    context = {
        'users': users,
        'user' : user
        }              
    return render(request, 'dashboard/dashboard.html', context)

@superuser_required
def viewuser(request, user_id):
    try:
        #user_details = get_object_or_404(User, pk = user_id)
        user_details = User.objects.get(pk=user_id)
        context = {
                'user_details': user_details
            }
        return render(request, 'dashboard/viewuser.html', context)
    except:
        return render(request, 'dashboard/404.html')

@superuser_required
def edituser(request, user_id):
    try:
        print(user_id)
        #user_details = get_object_or_404(User, pk = user_id)
        user_details = User.objects.get(pk=user_id)
        context = {
                'user_details': user_details
            }
        return render(request, 'dashboard/edituser.html', context)
    except Exception as e:
        print(e)
        return render(request, 'dashboard/404.html')

@superuser_required
def updateuser(request, user_id):
    if request.is_ajax and request.method == 'POST':
        #Get form values
        request.POST.get("csrfmiddlewaretoken")
        first_name = request.POST.get("first_name","")
        last_name = request.POST.get("last_name","")
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")
        is_superuser = (request.POST.get("is_superuser", "0") == "1")
        #is_superuser = False
        #if (request.POST.get("is_superuser", "0") == "1"):
            #is_superuser = True
        is_staff = (request.POST.get("is_staff","0") == "1")
        #print(is_staff)

        #check if username matches 
        
        
        if User.objects.filter(username__iexact = username ).exclude( pk = user_id ).exists():
            data = {
                'status': 1
                #alert user exists
            }
            return JsonResponse(data)
            #return redirect('register')
        #check if email matches
        if User.objects.filter( email = email ).exclude( pk=user_id ).exists():
            data = {
                'status': 2
                #alert email exists
            }
            return JsonResponse(data)
        if len(password)!=0 and len(password)<6:
            pass
        user = User.objects.get(pk=user_id)
        user.username = username
        user.email = email
        if len(password)!=0:
            user.password = make_password(password)
        user.first_name = first_name
        user.last_name = last_name
        user.is_superuser = is_superuser
        user.is_staff = is_staff
        user.save()
        data = {
        'status': 3 
        #alert user is saved
        }  
        return JsonResponse(data)
    try: 
        user_details = User.objects.get( pk = user_id )
        context = {
            'user_details': user_details
        }              
        return render(request, 'dashboard/edituser.html', context)
    except:
        return render(request, 'dashboard/404.html')

@superuser_required
def deleteuser(request, user_id):
    if request.is_ajax and request.method == 'POST':
        try:
            #user_details = get_object_or_404(User, pk = user_id)
            user_details = User.objects.get(pk=user_id)
            user_details.delete()
            data = {
                'status':1
            }
            return JsonResponse(data)
        except:
            return render(request, 'dashboard/404.html')
    else:
        users = User.objects.all()
        context = {
            'users': users
        }              
        return render(request, 'dashboard/dashboard.html', context) 