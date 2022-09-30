from rest_framework import serializers
from .models import Spendings

class SpendingSerializer(serializers.ModelSerializer):
	class Meta:
		model = Spendings
		fields ='__all__'