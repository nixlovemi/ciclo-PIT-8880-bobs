from django.urls import path

from . import views

urlpatterns = [
    path("", views.index),
    path("home-tmp", views.index_tmp),
    path("mail", views.mail),
    path("politica-de-cookies", views.cookies),
    path("politica-de-privacidade", views.privacidade),
    path("termos-de-uso", views.termos),
]
