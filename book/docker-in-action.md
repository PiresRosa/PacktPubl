# Chap 1: Welcome to Docker

### 1.1: Intro
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
- Docker distribute (phân phối) các image này 1 cách dễ dàng thông qua `registries` và `indexes`. Có thể dùng luôn hàng có sẵn của docker là docker hub hoặc tự host 1 cái cho ngầu.

- Điểm mạnh của docker:
+ Tăng tính portable: vì dễ cài giống JVM
+ Bảo vệ máy tính đỡ rác, virus

![Anh so 2](images/dockerinaction_2.png)

### 1.2: Tại sao docker quan trọng?
- Docker cung cấp giải pháp abtract (?)
- Làm cho những ông lớn công nghệ như Amazon, Google, Microsoft ngồi lại với nhau, phát triển nhiều sản phẩm phục vụ open source hơn thay vì phát triển các giải pháp, dịch vụ riêng bên họ.
- Docker làm việc cài và gỡ app giống như trên app store trên điện thoại: thích thì cài, ko thích thì gỡ là xong.
- Docker không làm ảnh hưởng đến máy tính của bạn. Lỡ cài phần mềm nào ngu ngu thì xoá cmn đi là xong, nhẹ người.

### 1.3: Khi nào dùng docker?
- Docker chỉ run được app linux ở OS linux, app window ở Window server thôi
- Nếu muốn run app native ở MacOS hay Window thì chịu nhá.
- ... nói chung cũng xàm thôi, ko hay lắm.

## Part 1: Process isolation & environment-independent computing
### 1.2: Running software in containers

Giả sử tình huống: 
+ Cần build 1 con webserver dùng Nginx
+ Cần có monitor để watch con webserver này. 
+ Nếu fail => gửi mail thông báo.


// Note from dell-inspiron
- Linux có tính năng gọi là namespace, cho phép tạo các namespace khác nhau
- Docker dùng tính năng này để tạo các namespace khác nhau cho các container
- Mục đích dùng namespace: tránh conflict
+ Các process ko kill lẫn nhau
+ Process ở bên trong 1 container chỉ access được chính process bên trong nó thôi, ko can thiệp vào máy host bên ngoài được.

- Docker có option cho việc ko tạo namespace riêng mà dùng chung với máy host: `--pid host`
(lưu ý: chỉ dùng option này khi thật sự cần)

// Trang 52 đọc chưa hiểu lắm => cần đọc lại đoạn này.
- VD con nginx nó đang chạy rồi mà chạy 1 con nữa tương tự lên cùng cổng => ăn quả lỗi vào mồm

```
docker run -d --name webConflict nginx:latest
docker logs webConflict
docker exec webConflict nginx -g 'daemon off;'
```

- Docker cung cấp 1 cách để lưu lại id của container vào file
- Nếu file cid này đã tồn tại => docker báo fail

```
docker create --cidfile /tmp/web.cid nginx
```

- Bình thường docker gen ra cái ID 64 kí tự
- Nhưng mà tỉ lệ trùng nhau thấp => thường cắt còn 12 kí tự thôi cho ngắn.
- Dù ngắn rồi nhưng mà chắc vẫn khó nhớ => docker tự gen ra cái tên cho dễ nhớ. Cú pháp như này
<tính_từ>_<last_name_nguowfi_nổi_tiếng>

### 1.3: Container state & dependencies
- List docker state như hình dưới
![Docker states]](images/dockerinaction_3.jpg)

```
MAILER_CID = $(docker run -d dockerinaction/ch2_mailer)
WEB_CID = $(docker create nginx)
AGENT_CID = $(docker create \
                --link $WEB_CID:insideweb \
                --link $MAILER_CID:insidemailer \
                dockerinaction/ch2_agent)
```

- web và agent có mối liên hệ (dependency) => cần start web trước.
- nếu chạy agent trước web:

```
docker start $AGENT_CID
docker start $WEB_CID
```
=> gặp lỗi `Error response from daemon: Cannot start container...Cannot link to a non running container`
- Cần start đúng thứ tự

```
docker start $WEB_CID
docker start $AGENT_CID
```
- Lỗi vì sao: vì link bản chất là dùng IP address. Container mà chưa run thì chưa có IP address để link chứ sao nữa.
(docker check các container dependency trước để tránh lỗi application runtime error)
- Ở chương 5 sẽ được học về user defined error để tránh application runtime error
- Build chương trình thì hạn chế các biến fixed thôi, để sau này dễ mở rộng.

