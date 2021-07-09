from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name = 'index'),
    path("dashboard/", views.dashboard, name="dashboard"),
    path('viewuser/<int:user_id>', views.viewuser, name='viewuser'),
    path('edituser/<int:user_id>', views.edituser, name='edituser'),
    path('updateuser/<int:user_id>', views.updateuser, name = 'updateuser'),
    path('deleteuser/<int:user_id>', views.deleteuser, name='deleteuser'),

]