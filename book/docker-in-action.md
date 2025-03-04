## Chap 1: Welcome to Docker
- Docker launch vào 2013
- Docker là tool, không phải ngôn ngữ hay fw
- Trong lịch sử, UNIX-style system có khái niêm `jail` để limit resource mà chương trình có thể access
- 2005, Solaris 10 và Solaris Container của Sun được release, đưa ra khái niệm container, để nâng quyền hạn truy cập resource của ứng dụng (kiểu cấp cho quyền nào thì đc access cái đó, không bị fix cứng như thằng `jail` nữa)
- Container của Sun dùng cũng ngon, nhưng có 1 số vấn đề:
+ Dùng phức tạp => người dùng hay config sai => gặp vấn đề về security

- Hình minh hoạ docker
![Anh so 1](images/dockerinaction_1.png)
- Image = shipable unit
- Container là instance của image
- Docker distribute (phân phối) các image này 1 cách dễ dàng thông qua `registries` và `indexes`. Có thể dùng luôn hàng có sẵn 