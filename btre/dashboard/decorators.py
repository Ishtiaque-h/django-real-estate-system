from django.shortcuts import render, redirect


def login_required(function):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('account:login')
        return function(request, *args, **kwargs)
    return wrapper

def superuser_required(function):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_superuser:
            return redirect('account:login')
        return function(request, *args, **kwargs)
    return wrapper

def staff_required(function):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_staff:
            return redirect('account:login')
        return function(request, *args, **kwargs)
    return wrapper