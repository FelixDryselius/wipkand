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
- At installation, select Standalone MySQL server, set the password for the root account and remember it.

- In MySQL command line client (or similiar) run:
```
  $ source "your-path"\wipkand\SQL\create_schema.sql
  $ source "your-path"\wipkand\SQL\populate_dev_data.sql
```
This will create a schema named "vfal" on your server, select it, create tables and populate data.

## MySQL user password
- Due to recent changes to how MySQL handles password, either alter password of the root user to native mysql setting, or create a new user and do the same.

### Alter root user
- In a MySQL shell, run:
```
$ ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'password';
```

### Create new user
- In a MySQL shell, run
```
$ ALTER USER root@localhost IDENTIFIED WITH mysql_native_password BY 'password';
```
## Project setup

### VirtualenvWrapper
Use this virtual env or similiar
- Install virtualenvwrapper at: https://virtualenvwrapper.readthedocs.io/en/latest/, or:
```
  (Mac / Linux)
  $ pip install virtualenvwrapper
  
  (Windows)
  $ pip install virtualenvwrapper-win
```
- Navigate into the wipkand project. Create a new virtualenviroment:
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
- Open settings from *"your-path"\wipkand\backend\src\vfal_monitor\settings.py* (Ignore the settings directory at the same location as it is redundant). Make sure that the database settings are matching your MySQL credentials:
```
 DATABASES = {
     'default': {
         'ENGINE': 'django.db.backends.mysql', 
         'NAME': 'vfal', 	# Should be the same as in SQL/create_schema.sql
         'USER': 'root',	# User for MySQL server. Use the user with native mysql password setting
         'PASSWORD': '<your-mysql-server-password>',	# Password for MySQL server
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

## Angular Client build
Follow the steps below to build a production ready version of the frontend application. Note that this step is optional, since a production ready version of the frontend is includes when downloading the project for production. Use these steps below if you want to make changes to the frontend and use it. Note that this will require the installation of a bunch of node modules.

- Download and install node.js at: https://nodejs.org/en/download/ (v. 8.11.2 at time of writing)
- cd into "<your-path>\wipkand\client". Run:
```
$ npm install -g @angular/cli
$ npm install
$ ng -v
```
- Check that Angular is installed and that the version is 6.0 or higher. 
- Build the frontend Angular application with the following command:
  ```
$ ng build --prod --output-hashing none
```
This will build the application and distribute it into the static folder of the backend source code. The newly built application will be automatically used when running the Django server.

