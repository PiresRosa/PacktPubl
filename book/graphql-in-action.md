# Part 1: Exploring GraphQL
# Chap 1: Introduce to GraphQL
- Nội dung chap này bao gồm:
    - Hiểu về GraphQL và design concept đằng sau nó
    - GraphQL khác với những công nghệ tương tự khác như REST thế nào?
    - Hiểu về ngôn ngữ GraphQL
    - Hiểu về lợi và bất lợi của GraphQL

- Necessity is the mother of invention
    - GraphQL sáng chế ra bởi FB - công ty có rất nhiều vấn đề về technical với mobile app
    - Tuy nhiên việc graphQL trở nên phổ biến, không phải vì nó giải quyết các vấn đề technical, mà là giải quyết các vấn đề về giao tiếp.
    - Giao tiếp là 1 việc khó. Việc giao tiếp giúp cuộc sống cua chúng ta trở nên dễ dàng hơn.
    - Tương tự vậy, việc giao tiếp giữa các thành phần của ứng dụng tốt hơn cũng giúp ứng dụng dễ hiểu, dễ phát triển, dễ maintain và scale hơn.
    - Đó là lí do tôi nghĩ tại sao GraphQL lại thay đổi cuộc chơi.
    - Nó thay đổi "end" của trò chơi (backend, frontend):
        - Equal power: quyền năng như nhau.
        - Decouple communication process thông qua transport layer
        - Giới thiệu 1 ngôn ngữ mới ngắn gọn và đơn giản.

## 1.1. GraphQL là gì?
- Từ graph trong graphQL đến từ việc nó tổ chức dữ liệu như là dạng đồ thị.
- Nếu bạn phân tích data model lớn hay nhỏ, bạn đều tìm mối quan hệ giữa chúng.
- GraphQL là 1 ngôn ngữ runtime, tức là sẽ phân tích yêu cầu của bạn vào lúc run time
![graphql-in-action-runtime-language](images/graphql-in-action-runtime-language.png)

## 1.1.1. The big picture
![graphqlinaction-big-picture-of-API](images/graphqlinaction-big-picture-of-API.png)
- Bức tranh tổng quan việc giao tiếp: client muốn lấy dữ liệu từ phía server, nói cho server biết là tôi cần gì.
- Có rất nhiều loại API khác nhau.
- QL trong graphQL thường được so sánh với SQL (do có cùng nghĩa)
    - QL có thể sử dụng trong cả việc đọc và thay đổi dữ liệu
        - Đọc: select
        - Thay đổi: insert
- VD về query graphQL:

```
{
    employee(id: 42) {
        name
        email
        birthDate
        hireDate
    }
}
```
- GraphQL là strong type

### 1.1.2. GraphQL là 1 ngôn ngữ đặc tả
- GraphQL ra bắt đầu từ năm 2012, nhưng 2015 mới có bản spec đầu tiên.

### 1.1.3: GraphQL là 1 ngôn ngữ
- Q = query
    - Khi read: dùng query
    - Khi update: dùng mutation.
    - Tương tự như SQL:
        - Read: dùng select
        - Update: Dùng insert, update, delete
- Ngoài ra thì GraphQL còn hỗ trợ term `subscription` để real-time data monitoring.
- Query language thì khác với programming language:
    - Bạn không thể dùng GraphQL để tạo user interface, hay làm các tính toán phức tạp.
- Nhìn chung, sự phát triển của ngôn ngữ lập trình là giúp chúng gần hơn với ngôn ngữ của con người.
    - Máy thì chỉ hiểu mệnh lệnh thôi.

### 1.1.4: GraphQL là 1 service
- Giống kiểu là 1 phiên dịch viên ý, không phải là storage engine.
- GraphQL chia thành 2 phần chính:
    - structure: hay schema, đại khái là các operation mà GraphQL có thể handle; là mối quan hệ giữa fields và types ...
    - behavior: hay resolver function, đại khái là logic. Mỗi field trong graphQL schema có 1 resolver function. Resolver function tương tự như hướng dẫn nơi lấy và cách lấy dữ liệu. 
- GraphQL tương tự như nhà hàng:
    - Schema giống như cái menu vậy.
    - Khách hàng nhìn vào cái menu gọi món, phục vụ sẽ ghi lại món ăn được làm theo yêu cầu đặc biệt nào không, rồi gửi vào bếp.
    - Giả sử nhà hàng rất bận rộn, mỗi đầu bếp chỉ take care 1 món duy nhất => đầu bếp chính là resolver 
- Resolver trong GraphQL thường được so sánh với Remote Procedure Call (RPC)
- Ví dụ về schema & resolver
    - Ví dụ về query:
    ```
    query {
        employee(id: 42) {
            name
            email
        }
    }
    ```
    - Ví dụ về schema:
    ```
    type Employee (id: Int!) {
        name: String!
        email: String!
    }
    ```
    - Trong đó:
        - Model Employee này có thể được tìm bởi field `id`, có kiểu là int
        - Model có field name, email có kiểu string
        - Dấu `!` có nghĩa là field không được trống.
            - Client khi request không được thiếu id
            - Server response không được thiếu name và email.
        - TIP: Schema language type definition giống như database CREATE statement
    - Ví dụ về resolvers function:
    ```
    const name => (source) => `${source.first_name} ${source.last_name}`;
    const email => (source) => source.email;
    ```
    - Trong đó:
        - Email resolvers được gọi là `trivial` resolver, vì nó không thay đổi gì data cả.
        - Một số implementation như javascript implementation có các built in resolvers, sẽ return chính field đó nếu không có gì được định nghĩa.
- Cuối cùng, graphQL sử dụng cả 3 resolvers function để đưa chúng vào 1 cái response thống nhất như sau:
```
{
    data: {
        employee: {
            name: 'Jan Doe',
            email: 'jane@doe.name'
        }
    }
}
```

## 1.2: Why graphQL
- Vì nó standard (nó tiêu chuẩn hoá)
- GraphQL cung cấp 1 giải pháp tiêu chuẩn toàn diện để implement API maitainable và scalable.
    - Bắt server cung cấp API doc (schema) => client biết tất cả cách mà server triển khai.
    - GraphQL không bao giờ có outdate document, bạn không bao giờ quên viết doc.
- Ở REST, khi bạn lấy nhiều resource, cần call API nhiều lần
    - VD: lấy book, author, reviews => cần call API 3 lần.
    - Ở graphql, chỉ cần call 1 lần thôi.
    - Về cơ bản thì có thể customize REST để trả về như mong muốn được trong 1 request, nhưng nó là customize, ko phải tiêu chuẩn.

### 1.2.1: Về rest API
- REST có vấn đề gì:
    - Có nhiều API endpoint, trong khi Graph thì chỉ có 1
    - Ở rest, frontend ko có tiếng nói. Muốn trả về ít field đi thì cần BE support.
    - Versioning: nếu cần nhiều version => rest cần nhiều endpoint => khi maintain dễ bị duplicate code trên BE
- REST có lợi thế:
    - Dễ cache hơn
    - Optimize code dễ hơn.

- Note:
    - Thực ra những yếu điểm của REST nêu trên hoàn toàn có thể giải quyết được
        - Thêm params `fields` để lấy ra các field cần thiết
        - Thêm 1 số flag để lấy ra các resource liên quan (VD: book, author, comment).
    - Tác giả cũng làm 1 số API simple và cũng vẫn okay.
    - Tuy nhiên với project to thì việc phát triển những thứ đặc biệt như vậy sẽ làm take time hơn; tốc độ phát triển sản phẩm cũng chậm hơn.

### 1.2.2. GraphQL way
- The typed schema
    - Tạo graph api cần định nghĩa schema rõ ràng.
    - Việc này giúp graph api predicable & discoverable
- The declaretive language:
    - Cung cấp cho client quyền năng định nghĩa những gì mà mình muốn.
- Single endpoint & client language:
    - Single endpoint giải quyết vấn đề multiple round trip
    - Việc để cho FE tự định nghĩa thứ mình cần lấy, giúp BE dễ dàng phân tích được thứ gì cần hơn, để scale cho dễ
        - Bình thường trả về hết thì cũng không biết là cái gì cần hơn cái gì
    - Cũng có thể dùng để detect điểm bất thường, cũng như client version change.
- The simple versioning:
    - Version ở graph dễ vkl, cứ code thêm thôi, ko sinh ra endpoint nào cả
    - Đặc biệt khi tích hợp với mobile: 
        - Bình thường app mobile update lên là do người dùng
        - Một khi đang ở version app cũ, trong code fix cứng endpoint rồi thì lúc đổi khá khó
        - Khác với ứng dụng web, push code lên là toàn bộ user dùng luôn code mới (do Chrome tải html mới về)
    - Simple versioning cũng có challenge:
        - Giữ những node cũ thì đồng nghĩa cũng có nhiều thứ phải maintain hơn.
        - Frontend cũng khó biết được field nào là mới, field nào là cũ hơn nữa.

### 1.2.3: Rest API & GraphQL API in action
- Thử đến với 1 ví dụ cụ thể về so sánh giữa REST API & GraphQL API.
- Giả sử bạn định xây dựng 1 app cho phim Star Wars.

- GraphQL có phải REST killer không?
    - Không.
    - Nhưng web & mobile thì chắc Graph sẽ thay thế dần dần. Giống như JSON thay thế XML vậy.

## 1.3. GraphQL problem

### 1.3.1. Security
- Thứ critical đầu tiên là resource-exhausted attack (cũng có thể hiểu là DDoS).
    - Attacker sẽ build 1 query lấy ra các resource rất phức tạp (nested relationship), hoặc dùng alias để lấy cùng 1 field rất nhiều lần.
        - Có thể chặn bằng cách dùng cost analysis để limit lại.
        - Hoặc dùng timeout, rate limit, whitelist query(trường hợp internal app)
- Authen & authorization: học ở chương 8

### 1.3.2. Caching & optimizing
- Caching khá phức tạp:
    - Dùng query làm key để cache thì cũng không hiệu quả lắm.
    - Cách hay hơn là dùng id của mỗi record làm key của cache. Lúc query thì lấy dữ liệu ra để process trước. Tuy nhiên cũng không đơn giản.
        - Graph thì giống như vòng tròn vậy. Mọi thứ đều liên quan đến nhau.
- N+1 query problem:
    - Facebook tiên phong xử lý cái này, dùng DataLoader.
        - Data loader sử dụng sự kết hợp batching và caching để thực hiện được điều này.
        - Học chi tiết hơn ở chap 7
### 1.3.3. Learning curve
- Tốn nhiều thời gian để học hơn:
    - FE cần học cú pháp
    - BE: cần học cú pháp, schema, resolvers và 1 số concept khác nữa.

# Chap 2: Exploring GraphQL APIs
- Chap này cover các nội dung:
    - Sử dụng GraphQL trên browser IDE để test GraphQL request
    - Gửi graphQL request cơ bản
    - Khám phá GraphQL API của đội Github
    - Khám phá các tính năng bên trong của GraphQL

## 2.1 GraphiQL editor
- Chữ `i` ở đây là chơi chữ, đọc tương tự `graphical`
- Dùng ở [https://graphql.org/swapi-graphql/](đây), khá xịn.
- 