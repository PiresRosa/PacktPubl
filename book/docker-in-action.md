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

### Những file nào đã được cài đặt và chúng tách biệt với nhau thế nào?
- Docker tách thành các layer để tối ưu
- Layer có mối quan hệ cha-con để tạo thành 1 sơ đồ. VD pull 2 con image sau về

```
docker pull dockerinaction/ch3_myapp
docker pull dockerinaction/ch3_myotherapp
```
- Con đầu tiên pull lâu, con sau pull nhanh vì các layer nặng nó cache cmnr, còn đâu có hơn 1MB nữa là cần pull thôi.
- Hình dưới mô tả quan hệ

![Quan he cac layer](images/dockerinaction_5.png)
- TOREAD: Đoạn dưới nói cái éo gì mà MNT với chroot, chỗ này cần đọc lại khi kiến thức khủng hơn
- Dùng cơ chế layer này giúp tiết kiệm dung lượng.
- Dùng cơ chế layer có yếu điểm: khi dùng chung parent layer, có thể config của parent layer cần khác nhau giữa các image => dùng chung bị lỗi. Chi tiết ở chương 4.

## Chap 4: Working with storage and volumes
Chap này có gì?
```
- Giới thiệu mount points
- Cách share data giữa host và container
- Cách share data giữa các container
- Sử dụng temporary, in-memory filesystems
- Quản lý data với volumes
- Storage nâng cao với volume plugins
```
- Từ đầU đến giờ bạn cũng chạy vài chương trình rồi.
- Sự khác biệt với ngoài thực tế: thực tế chưƠng trình chạy với data.
- Chap này sẽ nói về volumn và các chiến thuật quản lý dữ liệu với container
- Ví dụ bạn chạy 1 container database đi. Bạn có thắc mắc dữ liệu lưu ở đâu không? Có phải 1 file trong container? Điều gì xảy ra nếu bạn stop container hoặc gỡ nó ra? Làm thế nào để di chuyển dữ liệu trong trường hợp muốn nâng cấp database? Điều gì xảy ra với dữ liệu ở cloud machine khi nó bị terminate?
- Ví dụ khác, nếu bạn chạy vài con web container. Giờ muốn lưu log file thì lưu ở đâu? Lấy log ra thế nào? Cách dùng các analyze tool khác để xử lý các file log này thế nào?

Tất cả sẽ có trong chương này =))

### 4.1: File trees and mount points
- Không giống các OS khác, Linux tập hợp tất cả các storage thành 1 tree thôi.
- Một số device đặc biệt như USB, đĩa cứng ngoài sẽ được attach vào cái tree ban đầu 1 vị trí đặc biệt, như hình dưới

![Mount point](images/dockerinaction_6.png)

- Việc mount này giúp software sử dụng các system variable của linux mà không cần biết các file này thực tế được map ở đâu trong bộ nhớ.
- Mỗi container đều có 1 thứ gọi là MNT namespace và 1 file tree root duy nhất (chi tiết ở chương 6)
- Bây giờ tạm hiểu là mỗi image tạo ra đều mount tới 1 điểm gọi là container tree root
=> rõ ràng có thể mount 2 image khác nhau vào chung 1 folder trên máy host để share dữ liệu
- Chương này sẽ nói về 3 kiểu mount:
+ Bind mounts
+ In-memory storage
+ Docker volumes

### 4.2: Bind mounts
- Bind mounts = mount một phần của filesystem tree vào 1 vị trí khác.
- Khi làm việc với containers, bind mounts mount 1 vị trí ở máy thật vào máy ảo (?)
- Hình dưới ví dụ tạo 2 container: 1 web server & 1 log processing, dùng bind mount để share log với nhau
![VD bind mount](images/dockerinaction_7.png)

```
touch ~/example.log
cat >~/example.log <<EOF
server {
    listen 80;
    server_name localhost;
    access_log /var/log/nginx/custom.host.access.log main;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}
EOF
```

```
CONF_SRC=~/example.conf; \
CONF_DST=/etc/nginx/conf.d/default.conf; \
LOG_SRC=~/example.log; \
LOG_DST=/var/log/nginx/custom.host.access.log; \
docker run -d --name diaweb \
    --mount type=bind,src=${CONF_SRC},dst=${CONF_DST} \
    --mount type=bind,src=${LOG_SRC},dst=${LOG_DST} \
    -p 80:80 \
    nginx:latest
```

Nếu muốn đảm bảo rằng không process nào trong container có thể thay đổi nội dung file được => dùng option readonly


```
CONF_SRC=~/example.conf; \
CONF_DST=/etc/nginx/conf.d/default.conf; \
LOG_SRC=~/example.log; \
LOG_DST=/var/log/nginx/custom.host.access.log; \
docker run -d --name diaweb \
    --mount type=bind,src=${CONF_SRC},dst=${CONF_DST},readonly=true \ <--- Chú ý cái readonly này
    --mount type=bind,src=${LOG_SRC},dst=${LOG_DST} \
    -p 80:80 \
    nginx:latest
```

Bind mount cũng có 1 vài nhược điểm:
- Phụ thuộc vào host: vì mount từ host vào => giảm tính portable vì cần có host
- Có thể gây ra conflict: VD start nhiều con Cassandra lên, cùng mount vào 1 folder. Con cassandra nào cũng cần 1 file lock => các container tạo ra chồng chéo nhau => lỗi.

### 4.3: In-memory storage
- TOREAD: Đoạn này không hiểu lắm, đại loại muốn write 1 số thứ vào buffer, không cần write xuống disk
- Set option --mount type=tmpfs là được

```
docker run --rm \
    --mount type=tmpfs,dst=/tmp \
    --entrypoint mount \
    alpine:latest -v
```


### 4.4: Docker volume1


### 4.4: Volume
- Kiểu dùng mount point bị phụ thuộc vào máy host + dễ conflict
- Volume kiểu tạo ra 1 thư mục riêng cho docker quản lý ấy.
- Volume được docker support tận răng. Sau mà tạo nhiều cluster thì chắc sẽ có tool để sync up lại. Tiện vkl
- Đoạn dưới có ví dụ:
+ tạo 1 volume lưu dữ liệu của cassandra
+ tạo 1 container, mount volume trên vào, gọi là cass1
+ tạo 1 ít dữ liệu nháp
+ Xoá cass1 đi
+ Tạo 1 container khác là cass2, mount volume trên vào
+ Thấy dữ liệu vẫn còn nguyên :v

Tạo volume dùng chung
```
docker volume create \
    --driver local \
    --label example=cassandra \
    cass-shared
```

Chạy cassandra với volume trên

```
docker run -d \
    --volume cass-shared:/var/lib/cassandra/data \
    --name cass1 \
    cassandra:2.2
```

Sử dụng cqlsh + tạo dữ liệu

```
docker run -it --rm \
    --link cass1:cass \
    cassandra:2.2 cqlsh cass


create keyspace docker_hello_world
with replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
};

select * from system.schema_keyspaces
where keyspace_name='docker_hello_world';

quit

docker stop cass1
docker rm -vf cass1

docker run -d \
    --volume cass-shared:/var/lib/cassandra/data \
    --name cass2 \
    cassandra:2.2

docker run -it --rm \
    --lik cass2:cass \
    cassandra:2.2 \
    cqlsh cass

select *
from system_schema_keyspaces
where keyspace_name = 'dockr_hello_world';

quit
docker rm -vf cass2 cass-shared
```

### 4.5: Shared mount points & sharing files
- Đoạn đầu đưa ra ví dụ về việc dùng mount type=bind với type=volume, volume thì có ưu điểm hơn giống phần trên (có vẻ bị lặp)
- Nếu không định nghĩa tên volume => docker tự tạo ra 1 anonymous volumn với name tự gen lằng ngoằng
- Vì tên tự gen khó nhớ => có thể dùng option `--volumes-from` để hiểu là lấy volume từ container 

```
docker run --name=fowler \
    --mount type=volume,dst=/library/PoEAA \
    --mount type=bind,src=/tmp,dst=/library/DSL \
    alpine:latest \
    echo "Fowler collection created."

docker run --name knuth \
    --mount type=volume,dst=/library/taocp.vol1 \
    --mount type=volume,dst=/library/taocp.vol2 \
    --mount type=volume,dst=/library/taocp.vol3 \
    --mount type=volume,dst=/libaray/taocp.vol4.a \
    alpine:latest \
    echo "Knuth collection created"

docker run --name reader \
    --volumes-from fowler \
    --volumes-from knuth \
    alpine:latest ls -l /library/

    
```