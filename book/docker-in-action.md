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

- Nếu build hệ thống có quá nhiều fixed code ⇒ khó thay đổi.
- Để xây dựng một hệ thống phân tán hiệu quả ⇒ cần minimal dependency (giảm sự phụ thuộc) trước khi bắt đầu.
### Building evironment-agnostic systems

Docker có 3 tính năng giúp build feature trên

- Read-only filesystems
- Environment variable injection
- Volumes

#### Read-only filesystem

Dùng read-only có 2 cái lợi

- Container không thay đổi file bên trong nó
- Attacker cũng ko thay đổi được (vì container còn éo thay đổi đc mà :v)

VD chạy docker ở chế độ read-only

```docker

docker run -d --name wp --read-only wordpress:5.0.0-php7.2-apache
```

Docker inspect sẽ trả về meta data của container dạng JSON

```docker
docker inspect --format "{{.State.Running}}" wp
```

Ví dụ trên chạy sẽ bị fail sml. Lí do á, vì WP không tạo được lock file.
- Có thể dùng `docker container diff <container_name>` để xem container tạo ra các file nào. (chi tiết hơn đọc ở chương 3)
- Có thể cho container read-only, nhưng mount folder từ máy thật vào + cho 1 thư mục lưu ở in-memory (RAM)

```
docker run -d  --name wp \
    --read-only \
    -v /run/apache2 \ // Mount folder từ máy host vào
    --tmpfs /tmp \ // Cho phép container lưu vào máy thật tmp file system (?)
    wordpress:5.0.0-php7.2-apache
```

- Cài mysql
```
docker run -d --name wpdb \
    -e MYSQL_ROOT_PASSWORD=ch2demo \
    mysql:5.7
```

- Tạo 1 WP container khác link tới db mysql

```
docker run -d  \
    --name wp3 \
    --link wpdb:mysql \
    -p 8000:80  \                   // map port 8000 của máy thật vào port 80 của container
    --read-only \
    -v /run/apache2/ \
    --tmpfs /tmp \
    wordpress:5.0.0-php7.2-apache
```

- Có thể viết script để tạo site WP + monitor như sau

```
#! /bin/sh
DB_CID=$(docker create -e MYSQL_ROOT_PASSWORD=ch2_demo mysql:5.7)

docker start $DB_CID

MAILER_CID=$(docker create dockerinaction/ch2_mailer)
docker start $MAILER_CID

WP_CID=$(docker create \
            --link $DB_CID:mysql -p 80 \
            --read-only \
            -v /run/apache2 \
            --tmpfs /tmp \
            wordpress:5.0.0-php7.2-apache)

docker start $WP_CID

AGENT_CID=$(docker create \
                --link $WP_CID:insideweb \
                --link $MAILER_CID:insidemailer \
                dockerinaction/ch2_agent)

docker start $AGENT_CID
```

#### Environment variable injection
- VD thêm 1 environment variable và in ra các env var

```
docker run --env MY_ENV_VAR="this is a test" \
        busybox:1.29 \
        env
```
sẽ in ra

```
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=6b9f6a3fd10f
MY_ENVIRONMENT_VAR=this is a test
```

- `--env` hay `-e` là viết tắt cho biến môi trường.
- Đoạn này có 1 câu hay: Suppose that the database administrator is a cat lover and hate strong password =))

```
docker create \
    --env WORDPRESS_DB_HOST=<host_name> \
    --env WORDPRESS_DB_USER=admin \
    --env WORDPRESS_DB_PASSWORD=MeowMix42 \
    wordpress:5.0.0-php7.2-apache
```

=> dùng cách này thì tách được dependency giữa WP container và MySQL container. Tuy nhiên có vấn đề khác: các con WP đều dùng db mặc định => trùng db
=> sol: tạo cho mỗi con 1 db riêng, dùng biến môi trường `WP_DB_NAME`

```
docker create \
    --link wpdb:mysql \
    -e WORDPRESS_DB_NAME=clientA \
    wordpress:5.0.0-php7.2-apache

docker create \
    --link wpdb:mysql \
    -e WORDPRESS_DB_NAME=clientB \
    wordpress:5.0.0-php7.2-apache
```

update bash script

```
#! /bin/sh

if [! -n "$CLIENT_ID" ]; then
    echo "$CLIENT_ID not set"
    exit
fi

WP_CID=$(
    docker create \
        --link $DB_CID:mysql \
        --name wp_$CLIENT_ID \
        -p 80 \
        --read-only \
        -v /run/apache2 \
        --tmpfs /tmp \
        -e WORDPRESS_DB_NAME=$CLIENT_ID \
        wordpress:5.0.0-php7.2-apache
)

docker start $WP_CID

AGENT_CID=$(
    docker create \
        --name=agent_$CLIENT_ID \
        --link $WP_CID:insideweb \
        --link $MAILER_CID:insidemailer \
        dockerinaction/ch2_agent
)

docker start $AGENT_CID
```

- Chạy: `CLIENT_ID=dockerinaction ./start-multi-wp.sh`
- Về cơ bản đến đây đã có hệ thống có cả monitor OK rồi


![Built system]](images/dockerinaction_4.jpg)

- Tuy nhiên hệ thống trên có nhược điểm: Cần restart manual con agent => cần tìm hiểu docker restart policy để xử lý ngon hơn.

#### Building durable container
- Container có 6 trạng thái: created, running, restarting, paused, removing, existed
- Docker cung cấp 1 số option cho --restart:
+ Never start (default)
+ Cố gắng restart khi có lỗi xảy ra
+ Cố gắng restart trong 1 khoảng thời gian khi có lỗi xảy ra
+ Luôn luôn restart (sử dụng exponential backoff strategy)

- Docker không tự động restart vì có thể sẽ gây ra nhiều vấn đề hơn là giải quyết vấn đề.

```
docker run  -d \
    --name backoff-detector \
    --restart always \
    busybox:1.29 date
```

Trong lúc container đang thực hiện backoff exponential thì container đang không running ⇒ nếu chạy exec

```docker
docker exec backoff detector echo Just a test
```

sẽ ăn quả lỗi 

```docker
container <id> is restarting, wait util the container is running.
```

### Sử dụng PID 1 và init system

Init system là chương trình dùng để launch và maintain state của chương trình khác.

Process với PID 1 thì linux sẽ hiểu là process init của kernel

Một số chương trình có thể sẽ được hiểu như là init system. (VD: `supervisord`)

Docker có 1 image đầy đủ LAMP stack

```docker
docker run -d --name lamp-demo -p 80:80 tutum/lamp
```

Kiểm tra các process đang chạy 

```docker
docker top lamp-demo
```

List các process

```docker
docker exec lamp-demo ps
```

Kill 1 process

```docker
docker exec lamp-demo kill <PID>
```

Trong lampp có luôn supervisord rồi. Vì vậy nếu stop apache2 thì nó sẽ tự scale lên

có vẻ là mặc định docker luôn chạy 1 file entry point

```docker
docker run wordpress:5.7.0-php-7.2-apache  cat /usr/local/bin/docker-entrypoint.sh
```

Ở part 2 sẽ nói rõ hơn về cái entry point này. Ở part này đại thể sẽ chém rằng có thể overwrite bằng cách dùng `--entrypoint`

```docker
docker run wordpress:5.7.0-php-7.2-apache \
		--entrypoint="cat" \
		/usr/local/bin/docker-entrypoint.sh
```

### Cleaning up

Anh em không dùng thì có thể xoá image thừa đi

```docker
docker rm wp 
```

Nếu anh em remove 1 image mà đang có container running ⇒ ăn quả lỗi vào mồm

Có 2 cách để xử lý:

- Cách 1: `docker stop <container_name>` : docker send `SIG_HUB` vào container, container sẽ shutdown graceful
- Cách 2: `docker rm -f <container_name>` : docker send `SIG_KILL` vào container để stop immidiately ⇒ có thể không đủ thời gian để thực hiện các action trước khi stop.
- Chỉ nên dùng `docker kill` hoặc `docker rm -f` trong trường hợp quá trình remove mất > 30s thôi nhá

## Chương 2: Software installation simplified

Chương này sẽ nói về 3 vấn đề chính:

- Làm thế nào để tôi nhận biết software nào cần cài?
- Tôi tìm software cần cài ở đâu?
- Những file nào đã được cài đặt và chúng tách biệt với nhau thế nào?

### Nhận biết software cần cài

- Dựa vào tên và tag:
    - `<host>/<user/company>/<sort_name>` : cả cụm này còn gọi là repository name
    - Tag là cái đằng sau dấu `:`. VD ở chương trước cài MySQL 5.7: `mysql:5.7`

### Tìm software cần cài ở đâu

- Dùng indexes (docker hub là 1 trang indexes)
- Nếu bạn cài 1 private registry (tức là tự host 1 trang để lưu docker file ấy) thì có thể dùng `docker login` và `docker logout` để đăng nhập. Có thể đăng nhập nhiều host khác nhau bằng cách định nghĩa host
- Có thể save image vào file và load lại ra dùng

```docker
docker pull busybox:latest
docker save -o myfile.tar busybox:latest // lưu image ra file
docker rmi buýbox         // Xoá cụ image đi
docker load -i myfile.tar // Load lại image từ file
docker images // list các image ra
```

- Chạy docker từ 1 docker file không phải là cài 1 image, mà thực chất là đang build image đấy lên rồi cài

```docker
git clone https://github.com/dockerinaction/ch3_dockerfile.git
docker build -t ohvkl/dockerfile:latest ch3_dockerfile
```

Option `-t` chỉ ra path của file cần build
