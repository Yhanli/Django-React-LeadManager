#!/usr/bin/env bash
pipenv run python leadmanager/manage.py makemigrations
pipenv run python leadmanager/manage.py migrate
pipenv run python leadmanager/manage.py collectstatic --noinput
