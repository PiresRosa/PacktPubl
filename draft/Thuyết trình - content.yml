Thuyết trình - content

- Slide: GraphQL là gì:
    - GraphQL:
        - Graph = đồ thị
        - QL = Query Language
            - Tương tự như trong SQL - Structure Query Language
        - GraphQL là 1 service, không phải storage engine
    - Vấn đề muôn thuở trong lập trình: giao tiếp Backend (server) và Frontend (client):
        - Client muốn lấy dữ liệu phía server, cần nói cho server biết là tôi cần gì
    

- Slide: So sánh Graph với Rest
    - Lợi:
        - Không phải tốn quá nhiều thời gian viết API endpoint
        - Không phải viết document, không bao giờ quên viết document
        - Client có thể tự lấy dữ liệu mình cần, không cần request FE thay đổi.
    - Bất lợi:
        - Security: resource leak: attacker sẽ build 1 query rất phức tạp
        - Caching: Khó cache do tính chất dynamic của data
        - Optimizing: N+1 query problem
        - Learning curve: mất thời gian để học và thay đổi

- Slide: 5 thành phần quan trọng của GraphQL:
    - Schema, Type, Query, Mutation, Resolver
    - Type: Kiểu dữ liệu
    - Query: Định nghĩa các câu truy vấn dùng để lấy dữ liệu
    - Mutation: Định nghĩa các câu truy vấn dùng để thêm/ sửa/ xóa dữ liệu
    - Resolver: Implement các định nghĩa ở phía query và mutation
    - Schema: Chứa Type, Query, Mutation
- Slide: Ví dụ về GraphQL
    - Tạo type
    - Tạo query
    - Tạo resolver cho query
    - Demo query
    - Tạo mutation
    - Tạo resolver cho mutation
    - Demo mutation

--

GET /books
[
    {
        "id": 1,
        "name": "Cuốn theo chiều gió",
        "author_id": 10
    }
]

GET /authors

GET books/:id


GET authors/:id

POST /books

POST /authors

