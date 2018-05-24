# WIP Kand

## Clone project
- Clone the project from GitHub using using this link: git@github.com:FelixDryselius/wipkand.git
- Navigate into the project and checkout the "production" branch

### Get project from .zip
- Go to the latest release here on github and download the project. This contains a production ready version of the system. Please keep in mind that the folder name of this .zip will be "wipkand-x.x.x" when using below shell commands.

## Install Python 3

- Install Python 3.6.4 or higher at: https://www.python.org/downloads/release/python-364/

## Database setup
- Download & Install MySQL Community Server at: https://dev.mysql.com/downloads/mysql/
-- At installation, select Standalone MySQL server
-- At installation, set the password for the root account and remember it.

- In MySQL command line client (or similiar) run:
```
  $ source "your-path"\wipkand\SQL\create_schema.sql
  $ source "your-path"\wipkand\SQL\populate_dev_data.sql
```
This will create a schema named "vfal" on your server, select it, create tables and populate data.

## Project setup

### VirtualenvWrapper
Use this virtual env or similiar
- Install virtualenvwrapper at: https://virtualenvwrapper.readthedocs.io/en/latest/, or through the command line:
```
  $ pip install virtualenvwrapper
```
- Create a new virtualenviroment:
```
  $ mkvirtualenv <your-environment-name>
```
  
  #### Usage:
  -Activate your virtal env:
```
      $ workon <your-environment-name>
```

  -Deactivate your virtal env:
```
      $ deactivate
```
  
### Django Setup
- cd into "<your-path>\wipkand\backend\src" and make sure your virtual environment is activated
- Install requirements:
```
  $ pip install -r requirements.txt
```
- Open settings from *SETTINGS PATH* and make sure that the database settings are matching your MySQL credentials:
```
 DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.mysql', 
         'NAME': 'vfal', 	# Should be the same as in SQL/create_schema.sql
         'USER': 'root',	# User for MySQL server
         'PASSWORD': 'wipdb',	# Password for MySQL server
         'HOST': 'localhost',
         'PORT': '',
     }
 }
```
- Make sure you are in "<your-path>\wipkand\backend\src". Create Django migrations and migrate them onto the database
```
$ python manage.py makemigrations
$ python manage.py migrate
```
- Create an admin user with desired credentials
```
$ python manage.py createsuperuser
```
- Run the server. The application should now be running on localhost:8000
```
$ python manage.py runserver
```

## Angular Client builds

