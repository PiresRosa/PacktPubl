# Context
- Video tutorial: [Link](https://www.youtube.com/watch?v=djHsh4V79Yo&list=PLOLrQ9Pn6cazhaxNDhcOIPYXt2zZhAXKO&index=2&ab_channel=VeryAcademy)

# Notes
## Lesson 1: Introduction
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

## Lesson 2: Accessing the django admin
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

admin.site.index_title = "The Bookstore" # thay đổi ở title trên <title> tag
admin.site.site_header = "The Bookstore Admin" # thay đổi ở Title tag
admin.site.site_title = "Site Title Bookstore" # thay đổi ở title trên title tag, sau |
```

- Trong core/settings.py, INSTALLED_APPS, thêm vào 2 app blog, bookstore
```
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bookstore',
    'blog'
]
```

## Lesson 3: Setup custom/multiple django admin sites
- Topics:
    - Setup a custom admin area
    - Overriding the default admin site
    - Setup multiple admin areas
### Setup a custom admin area
- New admin area for the blog
- Trong blog/admin.py, tạo class BlogAdminArea
```python
from django.contrib import admin

class BlogAdminArea(admin.AdminSite):
    site_header = "Blog Admin Area"

blog_site = BlogAdminArea(name="Blog Admin")
```
- Trong core/urls.py, import admin site
```python
from blog.admin import blog_site
```
- Thay chỗ url pattern
```python
urlpatterns = [
    path('admin/', blog_site.urls),
]
```
- Ra refresh -> thấy thay đổi là vào link admin/ sẽ hiển thị blog site admin. Tuy nhiên chưa có dữ liệu do chưa có gì cả.

- Thêm model Post:
- Vào trong blog/models.py
```python
class Post(models.Model):
    
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title
```
- Vào trong admin.py, thêm vào dòng sau:
```python
from . import models

# old codes...

blog_site.register(models.Post)
```
- Thay url vào admin: sửa trong core/urls.py là xong
```python
urlpatterns = [
    path('blogadmin/', blog_site.urls),
]
```
- Có thể dùng cả 2 cháu: admin và blog admin
```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('blogadmin/', blog_site.urls),
]
```
- Có thể register model Post vào admin site: ở blog/admin.py, thêm dòng sau:
```python
admin.site.register(models.Post)
```
### Overriding the default admin site
- Mặc định thì nó load admin trong thằng core.
- Có thể thay đổi mặc định bằng cách như sau:
  - Sửa file blog/apps, thêm class BlogAdminConfig
  - Sửa file core/settings.py, sử dụng BlogAdminConfig vừa tạo trong mục INSTALLED_APPS
  
```python
# blog/apps.py
from django.contrib.admin.apps import AdminConfig

class BlogAdminConfig(AdminConfig):
    default_site = "blog.admin.BlogAdminArea"

## core/settings.py
INSTALLED_APPS = [
    'django.contrib.admin'
# ...
]
# sửa thành

```
