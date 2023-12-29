from django.urls import path
from . import views

urlpatterns = [
    path('tasks',views.TasksView.as_view(),name='tasks'),
    path('tasks/<int:pk>',views.SingleTaskView.as_view(),name='one-task'),
]
