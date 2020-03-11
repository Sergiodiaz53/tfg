### How to start

#### Required

Python 3
Pip 3
virtualenv (no required, recommended)

#### Install packages

`pip install -r requirements.txt`

#### Create db

`python manage.py migrate`

#### Create a Superuser

`python manage.py createsuperuser`

#### Run server

`python manage.py runserver 0.0.0.0:8000`

Now, you can access to `localhost:8000/admin` and get all models. You can get api specifications with `localhost:8000/redoc`

