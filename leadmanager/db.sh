#!/usr/bin/env bash
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
pipenv run python manage.py collectstatic --noinput
sudo supervisorctl stop gunicornLead
sudo supervisorctl start gunicornLead