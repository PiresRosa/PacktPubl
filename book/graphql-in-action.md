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
