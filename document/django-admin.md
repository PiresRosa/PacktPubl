## Context
- Video tutorial: [Link](https://www.youtube.com/watch?v=djHsh4V79Yo&list=PLOLrQ9Pn6cazhaxNDhcOIPYXt2zZhAXKO&index=2&ab_channel=VeryAcademy)

## Notes
### Lesson 1: Introduction
- Topics:
    - Customization
    - Hooks
    - Features
    - Functions
    - Adaptions
- Simple workflows:
    - Start a new django project/ application
    - Create a model
    - Perform inital makemigration/ migrate
    - Register model in admin.py
    - Create a superuser

### Lesson 2: Accessing the django admin
- Topics:
    - Start new project
    - Accessing django admin
    - Renaming - overrides
- Cài django:
```
pipenv shell
pipenv install django
django-admin startproject core .
python3.9 manage.py startapp blog
python3.9 manage.py startapp bookstore
python3.9 manage.py runserver
```
- Có thể thay port bằng cách thêm tham số phía sau:
```
python3.9 manage.py runserver http://127.0.0.1:8080
```
- Chạy migrate
```
python3.9 manage.py migrate
```
- Tạo superuser
```
python3.9 manage.py createsuperuser
```
- Customization:
```
core/urls.py: add lines

admin.site.index_title