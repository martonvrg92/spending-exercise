from distutils.log import error
from os import abort
from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import SpendingSerializer
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404

from .models import Spendings
# Create your views here.

@api_view(['GET'])
def spendingsList(request, id):
	spendings = Spendings.objects.filter(id=id)
	serializer = SpendingSerializer(spendings, many=True)
	return Response(serializer.data)

@api_view(['POST'])
def spendingCreate(request):
	serializer = SpendingSerializer(data=request.data)

	if (request.data['description'] == "" or request.data['amount'] == 0 or request.data['amount'] == ''):
		return Response("Missing input", status=400)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['PUT'])
def spendingUpdate(request, id):
	spending = Spendings.objects.get(id=id)
	
	if (request.data['description'] == "" or request.data['amount'] == ''):
			return Response("Missing input", status=400)

	serializer = SpendingSerializer(instance=spending, data=request.data, partial=True)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def spendingDelete(request, id):
	spending = get_object_or_404(Spendings, id=id)
	spending.delete()

	return Response('Item succsesfully deleted!')


class ApiSpendingsListView(ListAPIView):
	queryset = Spendings.objects.all()
	serializer_class = SpendingSerializer
	filter_backends = (SearchFilter, OrderingFilter)
	search_fields = ('currency',)
