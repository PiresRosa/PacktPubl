// Đây là note khi đọc lại cuốn docker in action lần 2

# Chap 1: Welcome to Docker


### 1.1: Intro
- Docker launch vào 2013
- Docker là tool, không phải ngôn ngữ hay fw
- Trong lịch sử, UNIX-style system có khái niêm `jail` để limit resource mà chương trình có thể access
- 2005, Solaris 10 và Solaris Container của Sun được release, đưa ra khái niệm container, để nâng quyền hạn truy cập resource của ứng dụng (kiểu cấp cho quyền nào thì đc access cái đó, không bị fix cứng như thằng `jail` nữa)
- Container của Sun dùng cũng ngon, nhưng có 1 số vấn đề:
    - Dùng phức tạp => người dùng hay config sai => gặp vấn đề về security

- Hình minh hoạ docker
![Anh so 1](images/dockerinaction_1.PNG)
- Image = shipable unit
- Container là instance của image
- Docker distribute (phân phối) các image này 1 cách dễ dàng thông qua `registries` và `indexes`. Có thể dùng luôn hàng có sẵn của docker là docker hub hoặc tự host 1 cái cho ngầu.

- Điểm mạnh của docker:
    - Tăng tính portable: vì dễ cài giống JVM
    - Bảo vệ máy tính đỡ rác, virus

![Anh so 2](images/dockerinaction_2.PNG)

### 1.2: Tại sao docker quan trọng?
- Docker cung cấp giải pháp abtract (?)
    - Thay vì phải quan tâm những thứ hoa lá cành như: cài phần mềm này thế nào thì chỉ cần quan tâm: cần cài phần mềm nào. Còn lại bố mày lo.
- Làm cho những ông lớn công nghệ như Amazon, Google, Microsoft ngồi lại với nhau, phát triển nhiều sản phẩm phục vụ open source hơn thay vì phát triển các giải pháp, dịch vụ riêng bên họ.
- Docker làm việc cài và gỡ app giống như trên app store trên điện thoại: thích thì cài, ko thích thì gỡ là xong.
- Docker không làm ảnh hưởng đến máy tính của bạn. Lỡ cài phần mềm nào ngu ngu thì xoá cmn đi là xong, nhẹ người.

### 1.3: Khi nào dùng docker?
- Docker chỉ run được app linux ở OS linux, app window ở Window server thôi
- Nếu muốn run app native ở MacOS hay Window thì chịu nhá.
- ... nói chung cũng xàm thôi, ko hay lắm.

## Part 1: Process isolation & environment-independent computing
- Isolation (độc lập) là concept quan trọng của rất nhiều computing pattern, resource management strategy.
- Cái khó nhất của việc áp dụng container là việc tìm xem phần mềm cần chạy trong container muốn isolate cái gì. Mỗi chương trình có các yêu cầu khác nhau.

# Chap 2: Running software in containers
Chap này cover:
- Chạy interactive (tương tác - tức là sẽ attach vào terminal) và deamon (tức là chạy ngầm) các chương trình trong container
- Một số lệnh docker cơ bản
- Isolate chương trình khỏi chương trình khác và đưa vào configuration
- Chạy nhiều chương trình trong 1 container
- Durable container (tức container chạy lâu dài) và container life cycle
- Cleaning up (dọn dẹp)

Trong chương này, sẽ dùng 1 chương trình gọi là Nginx - 1 con webserver nha.
