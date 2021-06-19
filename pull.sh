#!/usr/bin/env bash
sudo git stash
sudo git reset --hard origin/master
sudo git pull
sudo npm install
sudo npm run build
pipenv sync
pipenv run python leadmanager/manage.py migrate
pipenv run python leadmanager/manage.py collectstatic --noinput
sudo supervisorctl stop gunicornLead
sudo supervisorctl start gunicornLead