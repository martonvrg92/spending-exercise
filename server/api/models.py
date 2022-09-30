from django.db import models

# Create your models here.

class Spendings(models.Model):
  description = models.CharField(max_length=200)
  amount = models.IntegerField()
  spent_at = models.DateTimeField(auto_now_add=True)
  currency = models.CharField(max_length=200)
      
  def __str__(self):
    return self.description