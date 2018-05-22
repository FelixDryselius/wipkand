# WIP Kand

## Clone project
- Clone the project from GitHub using using this link: git@github.com:FelixDryselius/wipkand.git

## Database setup
- Download & Install MySQL Community Server at: https://dev.mysql.com/downloads/mysql/
- Make root user and password etc.
- In MySQL shell (or similiar) run:
```
  $ "your-path"\wipkand\SQL\create_schema.sql
  $ "your-path"\wipkand\SQL\populate_dev_data.sql
```
  

## Project setup
- Instll Python3?

### VirtualenvWrapper
Use this virtual env or similiar
- Install virtualenvwrapper at: https://virtualenvwrapper.readthedocs.io/en/latest/, or
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

