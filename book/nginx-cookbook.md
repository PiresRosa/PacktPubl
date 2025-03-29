# Nginx cookbook

## Chap 1: High performance load balancing

### HTTP load balancing
- Cần cân bằng load giữa 2 server không cùng same resource: dùng weight để control, cái nào weight cao hơn thì vào nhiều request hơn.

upstream backend {
    server 10.10.12.45:90       weight=1;
    server app.example.com:80   weight=2;
}

server {
    location / {
        proxy_pass http://backend;
    }
}

=> trong vd trên thì thằng số 2 sẽ ăn gấp đôi request của thằng số 1
- Module upstream có thể định nghĩa 1 hoặc nhiều: unix socket, IP address, dns record, là danh sách các resource mà request có thể truy cập vào.

### TCP load balancing

stream {
    upstream mysql_read {
        server read1.example.com:3306   weight=5;
        server read2.example.com:3306;
        server 10.10.12.34:3306         backup;
    }

    server {
        listen 3306;
        proxy_pass mysql_read;
    }
}

=> load balance giữa 2 con read1, read2. Con backup là trong trường hợp 1 trong 2 con primary down thì sẽ gọi đến.

### Load balancing method
- Vì round-robin không thỏa mãn được nhu cầu của bạn.
- Một số method: least_connect, least_time, hash(generic_hash), ip_hash
- Thảo luận:
+ Không phải tất cả các request đều có cùng weight
+ least_conn: server nào có ít connection hơn thì gửi vào
+ least_time (nginx+): server nào có response time ngắn hơn thì forward request vào đấy
+ hash: routing theo custom param. Hữu ích trong trường hợp sử dụng cached data.

### Connection limiting (Nginx+)
upstream backend {
    zone backends 64k;
    queue 750 timeout=30s;

    server web1.com max_conns=25;
    server web2.com max_conns=15;
}

- max_conns reach => put request vào queue để processing

## Chap 2: Intelligent session persistence
- Đoạn này chỉ dành cho nginx+
- Bình thường HTTP request là stateless. Muốn stateful được thì thường sẽ phải lưu gì đó vào cookie để application handle => phức tạp.
=> Nginx offer dùng nginx+ cho application đỡ phức tạp.

- Dùng 1 số cái như cookie, sticky, route, param,... Đại ý là sẽ dùng thông số nào đó để route đến đúng server chứa request -> dùng được shared memory.

## Chap 3: Application-Aware Heath Checks
- Vì server không phải lúc nào cũng available => nếu ko có health check thì load balance sẽ k biết để off đi
=> user truy cập vào site của bạn sẽ đợi đến lúc timeout

### Check cái gì
- Viết 1 cái api chỉ là trả về 200 OK để load balance biết là server còn sống là được.

### Slow start
slow_start là để khi server khởi động lên ổn định thì mới route request vào (vd cần time init redis, init database connection,...)

upstream {
    zone backend 64k;

    server s1.com slow_start=20s;
    server s2.com slow_start=15s;
}

### TCP Health check
stream {
    server {
        listen 3306;
        proxy_pass read_backend;
        health_check interval=10 passes=2 fails=3;
    }
}

- VD trên nginx 10s gửi request sau mỗi 10s 
+ pass ít nhất 2 request 200 ok mới là healthy
+ >= 3 request bị fail => unhealthy


### TCP health check
http {
    server {
    ...
        location / {
            proxy_pass http://backend;
            health_check    interval=2s
                            fails=2
                            passes=5
                            uri=/
                            match=welcome;
            }
        }
    }
}

match welcome {
    status 200;
    header Content-Type = text/html;
    body ~ "Welcome to nginx!";
}

- VD trên ở nginx thường, gửi request sang server mỗi 2s 1 lần.
- Nginx+ có nhiều option ngon hơn...

## Chap 4: High-Availability Deployment Modes
- Kể cả nginx là 1 con load balancing thì vẫn có thể fail 
=> cần 1 con backup

### Nginx HA Mode
- Chỉ avail ở nginx+

### Load balancing load balancer
- Sử dụng DNS, add nhiều A record vào IP của các load balancer => dns sẽ tự động round robin giữa các load balancer.
- Hoàn toàn có thể sử dụng weight như ở phần 1 có nói
- Một số DNS service cung cấp health check để load balancing balancer

### Load balancing ở EC2
- Vấn đề: Dùng nginx ở aws và nginx plus HA không support Amazon IPs
- Solution: không hiểu lắm

## Chap 5: Massively Scaleable Content Caching
- Caching giảm load cho server
- Caching server faster with fewer resource
- Caching giúp response kể cả trường hợp upstream server bị fail

### Caching zones
proxy_cache_path    /var/nginx/cache
                    keys_zone=CACHE:60m
                    levels=1:2
                    inactive=3h
                    max_size=20g;
proxy_cache CACHE;

- Lưu cache ở path /var/nginx/cache
- Bộ nhớ cache 60MB, lưu ở namespace tên là CACHE
- Lưu cache trong 3h nếu ko có request vào, tối đa dung lượng là 20GB

### Caching hash keys
proxy_cache_key "$host$request_uri $cookie_user";
- Có thể chế ra hash key để lưu cache tùy vào độ sáng tạo của thí chủ.

### Cache bypass
proxy_cache_bypass $http_cache_bypass
=> khi nào giá trị cache_bypass khác 0 thì bỏ qua cache

### Caching perfomance
-Vấn đề: Bạn cần tăng perfomance caching bằng cách cache ở client side

location ~* \.(css|js)$ {
    expires 1y;
    add_header Cache-Control "public";
}

### Purging
- Vấn đề: Cần invalidate cache
- Solution: Dùng nginx+ feature gọi là proxy_cache_purge

map $request_method $purge_method {
    PURGE 1;
    default 0;
}

server {
    ...
    location / {
        ...
        proxy_cache_purge $purge_method;
    }
}

## Chapter 6: Sophisticated Media Streaming
- Nginx support stream media (flv, mp4) và live stream

### 6.1: MP4 & FLV

http {
    server {
        ...

        location /videos/ {
            mp4;
        }

        location ~ \.flv$ {
            flv;
        }
    }
}

### 6.2: Streaming với HLS
- HLS là http live streaming cho H.264/AAC-encoded content package trong MP4 files
- Dùng Nginx+ HLS module

location /hls/ {
    hls;

    alias /var/www/video;

    hls_fragment            4s;
    hls_buffers             10 10m;
    hls_mp4_buffer_size     1m;
    hls_mp4_max_buffer_size 5m;
}

### 6.3: Streaming với HDS
- HDS = Adobe's HTTP Dynamic Streaming. Dùng để streaming FLV file. Có vẻ bỏ cmnr

### 6.4: Bandwidth limit
- Cần limit lại để cải thiện chất lượng xem
- Sol: Dùng nginx+ bitrate limiting

location /videos/ {
    mp4;
    mp4_limit_rate_after    15s;
    mp4_limit_rate          1.2;
}

=> cho phép client download bình thường trong 15s trước khi dính rate limit
=> Trong config trên thì đang limit 1.2 => client download bằng tốc độ 120% so với tốc độ xem video (chỗ này cũng chưa hiểu kĩ lắm)

## Chap 7: Advanced activity monitoring
- Chap này giới thiệu về dashboard monitoring của Nginx+
- Có vẻ xịn vkl

## Chap 8: DevOps On-the-fly Reconfiguration
- Xiaolin về nginx+ api là chính

### 8.1: nginx api
- Có api để thêm upstream
... mở sách đọc nhá, cũng không có nginx+ để dùng đâu :v
- 

### 8.2: Sameless reload
service nginx reaload 
- => Tự động reload, không có downtime hay mất package nào đâu

### 8.3: SRV record
Đoạn này chưa hiểu lắm

http {
    resolver 10.0.0.2;

    upstream backend {
        zone backends 64k;
        server api.intenal service=http resolve
    }
}

## Chap 9: UDP load balancing
### 9.1: Stream context
stream {
    upstream ntp {
        server ntp1.com:123 weight=2;
        server ntp2.com:123;
    }

    server {
        listen 123 udp;
        proxy_pass ntp;
    }
}

### 9.2: Load balancing algorithm
- Cũng có mấy thuật toán giống phần trước: ip_hash, round_robin, lest_conn
upstream dns {
    least_conn;
    server ns1.example.com:53;
    server ns2.example.com:53;
}

### 9.3: Health check
upstream ntp {
    server ns1.example.com:123 max_fails=3 fail_timeout=3s;
    server ns2.example.com:123 max_fails=3 fail_timeout=3s;
}


## Chap 10: Cloud-Agnostic Architecture
Đại ý là kiến trúc của Nginx thích hợp với mọi cloud service hiện tại (kiểu độc lập so với cloud engine)

### 10.1: The anywhere load balancer
- Đoạn này nâng bi rằng nginx chạy được cả ubuntu, macOS, window,..

### 10.2: 10.2 The Importance of Versatility (tầm quan trọng của tính linh hoạt)
- Đoạn này nói rằng Nginx linh hoạt vkl; chưa kể Agile ra đời => công nghệ của dự án có thể thay đổi bất cứ lúc nào cho phù hợp => nginx phục vụ tất là hợp lí vkl rồi còn gì nữa.

## Part 2: Security and Access

## Chap 11: Controlling Access

### 11.1: Access Based on IP Address

location /admin/ {
    deny 10.10.0.1;
    allow 10.10.0.0/20;
    allow 2001:odb8::/32
    deny all;
}

### 11.2: Allow Cross-Origin Resource Sharing
map $request_method $cors_method {
    OPTIONS  11;
    GET      1;
    POST     1;
    defaultt 0;
}

server {
    ...
    location / {
        if ($cors_method ~ '1') {
            add_header 'Access-Control-Allow-Method'
                'GET,POST,OPTIONS';
            add_header 'Access-Control-Allow-Origin'
                '*.example.com';
            add_header 'Access-control-Allow-Headers'
                'DNT,
                 Keep-Alive,
                 User-Agent,
                 X-Requested-With,
                 If-Modified-Since,
                 Cache-Control,
                 Content-Type';
        }

        if ($cors_method = '11') {
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf8';
            add_header 'Content-Length' 0;
            return 204; 
        }
    }
}

## Chap 12: Limiting use

### 12.1: Limiting connection
http {
    limit_conn_zone $binary_remote_addr zone=limitbyaddr:10m;
    limit_conn_status 429;
    ...
    server {
        ...
        limit_conn limitbyaddr 40;
        ...
    }
}

### 12.2: Limiting Rate
http {
    limit_req_zone $binary_remote_addr
        zone=limitbyaddr:10m rate=1r/s;
    limit_req_status 429;
    ...
    server {
        ...
        limit_req zone=limitbyaddr burst=10 nodelay;
    }
}

### 12.3: Limitting bandwidth

location /download/ {
    limit_rate_after 10m;
    limit_rate 1m;
}

## Chap 13: Encrypting

### 13.1: Client-side encryption
http {
    server {
        listen              8433 ssl;
        ssl_protocols       TLSv1.2;
        ssl_ciphers         HIGH:!aNULL:!MD5;
        ssl_certificate     /usr/local/nginx/conf/cert.pem;
        ssl_certificate_key /usr/local/nginx/conf/cert.key;
        ssl_session_cache   shared:SSL:10m;
        ssl_session_timeout 10m;
    }
}

### 13.2: Upstream encryption

location / {
    proxy_pass https://upstream.example.com;
    proxy_ssl_verify on;
    proxy_ssl_verify_depth 2;
    proxy_ssl_protocols TLSv1.2;
}

## Chap 14: HTTP Basic Authentication
### 14.1: Creating user file
- Tạo file theo format

```
name1:pass1
name2:pass2
name3:pass3
```

- Tool gen pass (dùng hàm crypt() của C) của openssl:
$ openssl passwd MyPassword1234

### 14.2: Using Basic Authentication
location / {
    auth_basic              "Private site";
    auth_basic_user_file    conf.d/passwd;
}

## Chap 15: HTTP Authentication Subrequests
- Kiểu dùng thêm 1 loại authen nữa đứng giữa

location /private {
    auth_request        /auth;
    auth_request_set    $auth_status $upstream_status;
}

location = /auth {
    internal;
    proxy_pass                  http://auth-server;
    proxy_pass_request_body     off;
    proxy_set_header            Content-Length "";
    proxy_set_header            X-Original-URI $request_uri;
}

## Chap 16: Secure links
