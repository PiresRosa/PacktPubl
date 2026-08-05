# Introducing Rust
- Nội dung chap này:
    - Giới thiệu các tính năng của Rust và goal
    - Cú pháp của Rust
    - Khi nào nên dùng Rust, khi nào nên tránh
    - Dựng chương trình đầu tiên, sử dụng Rust
    - Giải thích cách Rust so sánh với các ngôn ngữ hướng đối tượng, hay cả các ngôn ngữ khác nữa.

- Chào mừng tới với Rust - ngôn ngữ trao quyền. Một khi bạn hiểu về nó, bạn sẽ không tìm thấy ngôn ngữ nào ngầu vkl như vậy (thật ra nó nói thế này, mà tôi ko dịch đc: `you will not only find a programming language with unparalleled speed and safety, but one that is enjoyable enough to use every day`)
- Quyển sách này sẽ làm 1 số ví dụ fun như sau:
    - Mandelbrot set renderer (?)
    - Grep clone
    - CPU emulator
    - Generative art
    - Một database
    - HTTP, NTP và hexdump clients
    - LOGO language interpreter
    - Operating system kernel

- Quyển sách này cũng giới thiệu tới bạn `System programming` và `Low-level programming`.
- Bạn cũng học được:
    - Vai trò của hệ điều hành (OS)
    - Cách CPU hoạt động
    - Cách máy tính giữ được thời gian
    - Pointer là gì?
    - Kiểu dữ liệu là gì?
- Bạn cũng học được cách mà nội tại bên trong hệ thống máy tính tương tác với nhau.
- Học nhiều về Rust, bạn sẽ hiểu lý do tại sao Rust được sinh ra, các thách thức mà nó giải quyết.

## 1.1. Rust sử dụng ở đâu.
- Rust thắng giải `Most loved programming language` ở survey mỗi năm của Stack Overflow giai đoạn 2016-2020
- Rất nhiều công ty lớn dùng Rust:
    - AWS dùng cho Lambda và Fargate, EC2
    - Cloudflare dùng nhiều, bao gồm public DNS và serverless computing
    - Dropbox rebuild warehouse
    - Google build Android bluetooth module bằng Rust
    - ...

## 1.2: Advocating for Rust at work
## 1.3: A taste of the language
### 1.3.1: Cheating your way to "Hello, world!"
- `cargo` là tool để manage build và package (giống kiểu npm của js ý)
- Tạo project mới dùng cargo:
```
cargo new hello
cargo run
```
- project tạo bởi cargo có structure giống nhau:
    - `Cargo.toml`: chứa project meta data: project name, version của nó, dependency của nó
```
$ tree hello
hello
├── Cargo.toml
└── src
 └── main.rs
1 directory, 2 files
```
- Chạy `cargo run` sẽ làm mấy việc:
    - Build source code ra thư mục `target/`
    - Tạo lock file: `Cargo.lock`

- Mặc định lúc dùng cargo tạo project mới thì đã là hello world rồi => mục này mới gọi là cheating your way to hello world.

### 1.3.2: Your first Rust program
```
fn greet_world() {
    println!("Hello, world!");

    let southern_germany = "Grüß Gott!";
    let japan = "ハロー・ワールド";
    let regions = [southern_germany, japan];

    for region in regions.iter() {
        println!("{}", &region); // Dấu `&` mượn region để read only access
    }
}

fn main() {
    greet_world();
}
```
- Có mấy điểm thú vị ở đây:
    - Rust support UT8 ngon lành, tự động. Anh em ko cần làm gì cả.
    - Dấu `!` sau hàm `println` biểu thị đó là 1 macro
        - Tạm thời, cứ hiểu macro là 1 hàm gì đó đặc biệt.
    
### 1.4: Download source code
### 1.5: What does Rust look and feel like?
- Rust kiểu code như ngôn ngữ high level, performance như ngôn ngữ low level (tức là xịn vkl ý)
- 