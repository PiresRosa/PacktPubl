# Context
- Video: [Link](https://www.youtube.com/watch?v=1H8MQkn90SA&ab_channel=CodingforAll%7CNewtonSchool)

# Notes
- Có thể dùng python shell để test model
```
python manage.py shell
from home.models import * # import tất cả các model vào
```

- Muốn get all thì dùng
```
objs = People.objects.all()
```
- Khi chạy thì django sẽ lưu query vào connection. Muốn xem thì in ra là được
```
from django.db import connection
connection.queries
```
- Muốn đếm thì dùng count
```
count = People.objects.count()
```
- Muốn xóa query đi thì dùng reset query
```
from django.db import reset_queries
reset_queries()
```
- Muốn lấy thằng đầu tiên thì dùng
```
obj = People.objects.first()
```


## Filter
- Filter khá ngon
```
from home.models import *
objs = People.objects.filter(name = 'John')

objs = People.objects.filter(name__icontains= 'John')
objs = People.objects.filter(name__startswith = 'John')
objs = People.objects.filter(name__endswith = 'John')
objs = People.objects.filter(age__gte = 20)
objs = People.objects.filter(age__lte = 18)
```
- Trong trường hợp model có quan hệ với nhau, VD: PeopleAddress ~ People, có thể dùng để filter
```
objs = PeopleAddress.objects.filter(people__email__icontains = 'example.net').count()
```

## Vừa get vừa tạo
```
obj, _ = People.objects.get_or_create(age = 1, name = 'Phong', about = 'ABC', email = 'phong@example.net')
```
