# Part 1: Welcome to Node
- Node là 1 web fw trưởng thành & ổn định rồi.

# Chap 1: Welcome to Nodejs
- Nodejs là 1 asynchronous, event-drivent.
- Từ khi Nodejs xuất hiện vào 2009, đã thay đổi cuộc chơi. Js từ ngôn ngữ chỉ tập trung vào trình duyệt, ít được chấp nhận, đã trở thành 1 ngôn ngữ quan trọng vkl
- Có nhiều công ty lớn như Microsoft hỗ trợ Nodejs và góp phần vào quá trình thành công của nó.
- Trong chương này, bạn sẽ được học về Node, event-drivent nonblocking model của nó, và 1 số lí do để js trở thành một ngôn ngữ lập trình phổ thông.

## 1.1 A typical Node web application
- Một trong những điểm mạnh của Node và Javascript là single-threaded programming model.
- Thread thường code dễ bị bug => một số ngôn ngữ như Rust, Go cung cấp bộ concurrency tool riêng để an toàn hơn.
- Node sử dụng cách giống như dùng trên browser: dùng single thread, mỗi thời điểm chị chạy 1 cái thôi.
- Tuy nhiên thì việc bị blocking khi làm các action cần time wait cao như file access/ network sẽ làm user experience bị thấp.

### 1.1.1. Nonblocking I/O
- Việc đọc file hoặc gửi message trên network hầu như là chậm. Nếu người dùng mà phải đợi các ông xử lý xong thì mới đc thao tác tiếp thì tệ quá.
- Node dùng 3 kĩ thuật để xử lý vụ này: events, asynchronous API, nonblocking I/O
- Hiểu đơn giản: 
    - Ứng dụng của bạn có thể make network request
    - Trong thời gian ấy có thể làm tiếp việc khác cũng được.
    - Sau khi luồng make network request chạy xong thì tự gọi 1 cái callback handler

- Hình dưới là 1 ví dụ điểm hình của 1 Node app:
    - Trình duyệt gửi request mua sản phẩm
    - Application kiểm tra còn hàng không
        - Sau đó tạo acc cho customer
        - Sau đó gửi email hoá đơn
        - Sau đó gửi response JSON HTTP
- Ta nhận thấy, có 2 việc xảy ra đồng thời: Gửi mail cho user và lưu thông tin khách hàng vào database; mặc dù nhìn code vẫn theo thứ tự 1 mạch qua sông, không có thread hay gì đặc biệt cả.
- Nhìn vào hình dưới thì thấy database được truy cập thông qua network.
    - Trong ứng dụng Node, network access là nonblocking, vì nó dùng thư viện libuv

![](images/nodeinaction-asynchronous-and-nonblocking-component.png)

- Lợi ích của việc sử dụng asynchronous API với nonblocking I/O: Node có thể làm những việc khác, trong khi những tiến trình tương đối chậm khác vẫn đang xảy ra.
    - Mặc dù chỉ có 1 thread, 1 process Node web app đang chạy, nó vẫn có thể xử lý nhiều hơn 1 connection  đến từ hàng ngàn visitor.
    - Để hiểu hơn, hãy đến với event loop

### 1.1.2. Event loop
![nodeinaction-event-loop](images/nodeinaction-event-loop.png)

// TOREAD: đoạn này quay lại note sau, đại khái nói về cơ chế event loop hoạt động, sử dụng event & call back thay cho concurrency

## 1.2. ES2015, Node và V8
// TOREAD: đoạn này quay lại note sau. Đã đọc trên kindle, đại khái nói về một số tính năng mới như `let, const`, `arrow func`, arrow func xử lý issue của con trỏ this

### 1.2.1. Node & V8
![nodeinaction-node-software-stack](images/nodeinaction-node-software-stack.png)
- Đoạn này nói về việc Node dùng V8 engine, phát triển bởi Chromium project cho Google Chrome.
    - V8 compile trực tiếp ra mã máy
    - V8 có bộ optimize code để Node chạy nhanh hơn.

### 1.2.2. Working with feaure groups
- Đoạn này đại khái nói về trạng thái của 3 loại feature của Node:
    - Shipping: feature đã ngon
    - Staged: feature dạng beta, dùng flag --harmony để trải nghiệm
    - Progress: feature đang làm, dùng cmd để xem: `node --v8-options | grep "in progress"`

### 1.2.3: Hiểu về Node release schedule
- Có 3 phiên bản: LTS (Long-Term Support), Currrent và Nightly:
    - LST: có 18 tháng support và 12 tháng maintain (? clgt). Đại khái bản này ổn định nhất
    - Current: bản hiện tại, có nhiều feature mới.
    - Nightly: ko hiểu nói gì. Mà lên trang chủ thì có vẻ không có.

## 1.3: Cài node
- Cái này dễ vl, ko viết lại làm gì.

## 1.4: Node built-in tools
- npm: node package manager
- core module:
    - FILESYSTEM (fs, path)
    - NETWORKING (http)
- debugger:
    - Để chạy debug, run `node debug ${file}`
    - Support dùng Chrome debug luôn, dùng lệnh: `node --inspect --inspect-brk` để nó expose ra 1 cái websocket, xong chắc dùng để cắm vào trình duyệt debug.
        - Chỗ này cũng nâng cao, chưa cần dùng tới ngay đâu.

## 1.5: Ba loại chương trình Node chính
- Web app:
    - Express
- Command-line tool & daemon:
    - pm2
- Desktop app: dùng electron
    - VS Code
    - Atom
