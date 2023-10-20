# -*- coding: utf-8 -*-

import os


DJANGO_DEBUG = True
DJANGO_SECRET_KEY = '%*x85+-=b(h7k#7(^=qbm3#xil5__0jfzr@*zjnrdkk*l(32=h'
DJANGO_ALLOWED_HOSTS = ['127.0.0.1']
DJANGO_STATIC_ROOT = './webapp/static/'
DJANGO_MEDIA_ROOT = './webapp/media/'
DJANGO_LOG_FILENAME = './frontend.log'
DJANGO_LOG_LEVEL = 'INFO'
DJANGO_LOG_HANDLER = 'logfile'

MYSQL_HOST = '172.17.0.1'
MYSQL_DB = 'bobsemcasa'
MYSQL_PORT = 3306
MYSQL_USER = 'bobsemcasaappuser'
MYSQL_PASSWD = 'wAugRfFeN8NR4L2T'

EMAIL_HOST = 'in-v3.mailjet.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = '06a8ecbddc6543afb53542e93387c32c'
EMAIL_HOST_PASSWORD = '56d1e76f4289f56e0e9df5bb9fa87990'
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_FROM = 'carlos.souza@bffc.com.br'
EMAIL_TO_1 = 'sac@holcasher.com.br'
EMAIL_TO_2 = 'sac@cepera.com.br'

GTM_CODE = 'GTM-54JRFLW'