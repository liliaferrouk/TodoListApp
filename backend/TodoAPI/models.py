from django.db import models

class Task(models.Model):
    note = models.CharField(max_length=50)
    done = models.BooleanField(null=False, default=False)
