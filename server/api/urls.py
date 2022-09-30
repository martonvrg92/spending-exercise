from django.urls import path
from . import views
from .views import ApiSpendingsListView

urlpatterns = [
	path('spendings-list/', ApiSpendingsListView.as_view(), name="spendings-list"),
	path('spendings-list/<str:id>', views.spendingsList, name="spendings-list"),
	path('spending-create/', views.spendingCreate, name="spending-create"),

	path('spending-update/<str:id>/', views.spendingUpdate, name="spending-update"),
	path('spending-delete/<str:id>/', views.spendingDelete, name="spending-delete"),
]
