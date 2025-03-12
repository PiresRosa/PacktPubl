# Nginx cookbook

## High performance load balancing

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

## Intelligent session persistence
- Đoạn này chỉ dành cho nginx+
- Bình thường HTTP request là stateless. Muốn stateful được thì thường sẽ phải lưu gì đó vào cookie để application handle => phức tạp.
=> Nginx offer dùng nginx+ cho application đỡ phức tạp.

- Dùng 1 số cái như cookie, sticky, route, param,... Đại ý là sẽ dùng thông số nào đó để route đến đúng server chứa request -> dùng được shared memory.

## Application-Aware Heath Checks
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