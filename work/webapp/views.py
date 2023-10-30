from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

import datetime
import json
import logging

from webapp import config


def build_context(**kwargs):
    year = datetime.datetime.now().year
    text = {
        "lang": "pt-br",
        "title": "Bob's em Casa",
        "copyright": f"Bob's 2021 - Todos os direitos reservados",
    }
    base_context = {
        "config": config,
        "text": text,
    }
    return {**base_context, **kwargs}


def index(request):
    context = build_context()
    return HttpResponse(render(request, "home.html", context))

def cookies(request):
    context = build_context()
    return HttpResponse(render(request, "cookies.html", context))


def privacidade(request):
    context = build_context()
    return HttpResponse(render(request, "privacidade.html", context))


def termos(request):
    context = build_context()
    return HttpResponse(render(request, "termos.html", context))


@csrf_exempt
def mail(request):

    # get data
    object = json.loads(request.body)
    logging.info(f"object = {object}")
    canal = object["channel"]
    nome = object["name"]
    email = object["email"]
    telefone = object["phone"]
    mensagem = object["message"]
    message = """Dados informados no formulario de contato:
- Nome: %s
- Email: %s
- Telefone: %s
- Mensagem:
%s""" % (
        nome,
        email,
        telefone,
        mensagem,
    )

    email_from = config.EMAIL_FROM
    email_to = config.EMAIL_TO_1
    if canal == "2":
        email_to = config.EMAIL_TO_2

    logging.info(f"email_from = {email_from}")
    logging.info(f"email_to = {email_to}")

    status = send_mail(
        subject="[Bobs em Casa] Contact Form",
        from_email=config.EMAIL_FROM,
        recipient_list=[email_to],
        message=message,
        fail_silently=False,
    )

    logging.debug("status = %d" % status)
    return HttpResponse("")
