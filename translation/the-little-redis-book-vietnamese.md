e-# The little redis book
- Tác giả: Karl Seguin
- Dịch tiếng Việt: Đỗ Minh Phong

## Về cuốn sách
### Giấy phép
Cuốn sách sử dụng giấy phép Attribution-NonCommercial 3.0 Unported. Bạn không cần trả tiền cho cuốn sách này.

Bạn có thể thoải mái sao chép, sửa đổi hay mang cuốn sách ra để khoe với bạn bè. Tuy nhiên, bạn cần luôn để tên tác giả là Karl Seguin, và không sử dụng nó vào mục đích thương mại.

Bạn có thể xem thêm về giấy phép ở đây:
http://creativecommons.org/licenses/by-nc/3.0/legalcode

### Tác giả
Karl Seguin là lập trình viên có kinh nghiệm với nhiều lĩnh vực và công nghệ khác nhau. Anh ấy thường xuyên đóng góp cho các phần mềm Open Source, một người viết bài về kĩ thuật, và thi thoảng là một nhà diễn giả. Anh ấy viết rất đa dạng, về một vài công cụ, về Redis. Ví dụ như dự án miễn phí về xếp hạng và phân tích cho các lập trình viên game ở: mogade.com (tại thời điểm mình dịch bài thì có vẻ serivce này đã ngừng rồi)

Karl cũng viết cuốn "The Little MongoDB Book", và nhiều cuốn sách miễn phí khác về MongoDB.

Blog của anh ấy ở địa chỉ: http://openmymind.net, và twitter là @karlseguin

### Lời cảm ơn
Gửi lời cảm ơn tới Perry Neal vì đã truyền cảm hứng và giúp đỡ tôi rất nhiều.

### Phiên bản mới nhất
Phiên bản mới nhất của cuốn sách ở: http://github.com/karlseguin/the-little-redis-book


## Lời giới thiệu
Một vài năm gần đây, các công cụ sử dụng để lưu trữ và truy vấn dữ liệu đã phát triển một cách đáng kinh ngạc. 

Trong tất cả những công cụ thì đối với tôi, Redis là thứ tuyệt nhất. Vì sao? Thứ nhất, vì nó rất dễ để học. Khoảng 1 vài tiếng là bạn có thể học ngon lành rồi. Thứ hai, nó cung cấp giải pháp bao quát cho các vấn đề cụ thể. Điều này nghĩa là gì? Redis không cố gắng giải quyết tất cả mọi thứ.
....
chỗ này khó vl, từ từ dịch tiếp

## Bắt đầu
Chúng ta thường có nhiều cách học khác nhau: một số người thích tự làm bằng tay, một số thì thích xem qua video và một số khác thì thích đọc. Không có gì giúp bạn hiểu redis hơn là trải nghiệm nó thực thế.
Redis rất dễ cài đặt và sử dụng cũng chỉ thông qua 1 shell đơn giản. 
Hãy dành một vài phút để cài nó trên máy tính của bạn

### Trên window
Redis thì không hỗ trợ chính thức trên window, tuy nhiên sẽ có lựa chọn khác. Bạn không nên chạy nó trên môi trường production, nhưng nếu dùng nó để dev thì tôi chưa gặp vấn đề gì cả.

Một phiên bản bởi Microsoft Open Technologies, Inc. có thể tìm thấy ở: https://github.com/microsoftarchive/redis
Như đã nói phía trên, phiên bản này không sẵn sàng để sử dụng trên môi trường production.

Một giải pháp khác bạn có thể tìm thấy ở đây: https://github.com/dmajkic/redis/downloads.
Bạn có thể tải version mới nhất, giải nén file tương ứng với phiên bản window của bạn: 64bit hoặc 32bit.

### Trên *nix và MacOSX
Trên *nix và Mac, tốt nhất là nên build từ source. Hướng dẫn xem ở đây: https://redis.io/download. Ở thời điểm dịch bài thì phiên bản stable là 6.0.0
Để cài đặt, bạn có thể chạy lệnh sau:

```
wget http://download.redis.io/releases/redis-6.0.0.tar.gz
tar xzf redis-6.0.0.tar.gz
cd redis-6.0.0
make
```

Bạn cũng có thể dùng các package manager để cài đặt. Ví dụ với Mac thì dùng Homebrew: `brew install redis`

Nếu bạn build từ source, thì file binary sẽ được sinh ra trong folder src. Bạn có thể chuyển vào thư mục này bằng cách `cd src`

### Chạy và kết nối vào Redis
Gồm 2 phần: chạy server và chạy client.

Chạy server: trên window thì click đúp vào file, trên *nix/MacOSX thì chạy file redis-server bằng lệnh `./redis-server`
Có thể bạn sẽ thấy cảnh báo: file `redis.conf` không tìm thấy, sẽ sử dụng config mặc định. Đừng lo, không có vấn đề gì đâu. 

Chạy client: trên window thì click đúp vào file redis-cli, trên *nix/MacOSX thì chạy bằng lệnh `./redis-cli`.
Mặc định nó sẽ kết nối ở port 6379.

Bạn có thể test bằng cách gõ lệnh `info`. Sẽ hiện ra rất nhiều cặp key-value mô tả thông tin của server.

Nếu có vấn đề gì liên quan tới cài đặt, bạn có thể lên nhóm hỗ trợ chính thức của redis ở đây: https://groups.google.com/forum/#!forum/redis-db

### Redis Drivers
Bạn sẽ thấy Redis API gồm 1 danh sách các function, rất đơn giản để học.
Điều này có nghĩa là nếu bạn sử dụng các driver cho ngôn ngữ mà bạn sử dụng, cũng sẽ tương tự như dùng cli.
Nếu thích, bạn có thể tải ngay driver của ngôn ngữ mình thích để dùng ở đây: https://redis.io/clients

# Chương 1: Cơ bản
Điều gì khiến Redis trở nên đặc biệt? Kiểu vấn đề nào mà nó giải quyết? Dev cần chú ý gì khi sử dụng nó?
Trước khi trả lời những câu hỏi này, chúng ta cần biết Redis là gì.

Redis thường được hiểu là database trên RAM, lưu dạng key-value (in-memory persistent key-value store). Tôi không nghĩ
