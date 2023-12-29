from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from .models import Task
from .serializers import TaskSerializer

class TasksView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class SingleTaskView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
