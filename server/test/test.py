from rest_framework.test import APITestCase
from api.models import Spendings
from api.serializers import SpendingSerializer
from django.urls import reverse
from rest_framework import status
import json


class GetAllSpendingsTest(APITestCase):

    def setUp(self):
        Spendings.objects.create(
            description='Cat', amount=1000, currency='USD')
        Spendings.objects.create(
            description='Dog', amount=10, currency='HUF')

            
    def test_get_all_spendings(self):
        # get API response
        response = self.client.get(reverse('spendings-list'))
        # get data from db
        spendings = Spendings.objects.all()
        serializer = SpendingSerializer(spendings, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)



class CreateNewSpendingTest(APITestCase):

    def setUp(self):
        self.valid_payload = {
            'description': 'Cat',
            'amount': 2000,
            'currency': 'USD'
        }
        self.invalid_payload = {
            'description': '',
            'amount': 200,
            'currency': 'HUF'
        }

    def test_create_valid_spending(self):
        response = self.client.post(
            reverse('spending-create'),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_invalid_puppy(self):
        response = self.client.post(
            reverse('spending-create'),
            data=json.dumps(self.invalid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



class UpdateSpendingTest(APITestCase):

    def setUp(self):
        self.cat = Spendings.objects.create(
            description='Cat', amount=1000, currency='USD')
        self.dog = Spendings.objects.create(
            description='Dog', amount=20, currency='HUF')
        self.valid_payload = {
            'description': 'Catto',
            'amount': 1001,
            'currency': 'USD'
        }
        self.invalid_payload = {
            'description': '',
            'amount': 2048,
            'currency': 'HUF'
        }

    def test_valid_update_spending(self):
        response = self.client.put(
            reverse('spending-update', kwargs={'id': self.cat.id}),
            data=json.dumps(self.valid_payload),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_update_spending(self):
        response = self.client.put(
            reverse('spending-update', kwargs={'id': self.dog.id}),
            data=json.dumps(self.invalid_payload),
            content_type='application/json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



class DeleteSpendingTest(APITestCase):

    def setUp(self):
        self.cat = Spendings.objects.create(
            description='Cat', amount=1000, currency='USD')
        self.dog = Spendings.objects.create(
            description='Dog', amount=20, currency='HUF')

    def test_valid_delete_spending(self):
        response = self.client.delete(
            reverse('spending-delete', kwargs={'id': self.cat.id}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_delete_spending(self):
        response = self.client.delete(
            reverse('spending-delete', kwargs={'id': 30}))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)