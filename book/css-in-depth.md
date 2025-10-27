# Part 1: Reviewing fundamental
```
- 4 phần make up the cascade (?)
- Sự khác nhau giữa cascade & inhenritance
- Cách control style nào apply vào element nào
- Các vân đề thường hiểu nhầm khi dùng short-hand declaretion
```
- CSS không phải là 1 ngôn ngữ lập trình
- Cũng ko phải design tool, nhưng cần 1 chút sáng tạo
- Chữ C trong CSS là cascade

## 1.1: Cascade (nghĩa là dòng chảy)
-  Về cơ bản, CSS là định nghĩa ra các rule.
    - VD: nếu X là con Y, apply style này; 
- Hiểu được cơ bản => đoán được style mà element sẽ apply => ngon
- Khi các rule conflict sẽ dựa trên 3 yếu tố sau để quyết định:
    - Stylesheet origin: Style đến từ đâu (?)
    - Selector specificity: Selector nào được quyền ưu tiên hơn
    - Source order: thứ tự của style được khai báo

![Flow](images/cssindepth-01-flow-priority.png)

### 1.1.1. Stylesheet origin
- Có 2 loại:
    - User agent style: style của browser
    - Style của bạn (your style)
- Thi thoảng có browser cho nhúng 1 style thứ 3 gọi là user stylesheet = nhúng 1 đoạn code css vào browser. Thằng này nằm giữa 2 loại trên
- Tức là theo thứ tự ưu tiên giảm dần:

```
Your style > user style > user agent style
```
- Thêm "!important" vào thì độ ưu tiên sẽ cao vkl

### 1.1.2. Specificity
- Nếu conflict chưa xử lý được bằng cách dùng origin bên trên thì sẽ dùng đến tầng này
- Chia làm 2 loại:
    - inline style
    - style được định nghĩa bằng selector
- Inline thì ưu tiên nhất rồi
- Style định nghĩa bằng selector nằm trong cặp thẻ <style></style>
    - Cách tính ưu tiên selector thì đọc bài này: https://minhphong306.wordpress.com/2020/12/15/tinh-thu-tu-uu-tien-css-selector/

![Tính ưu tiên](images/cssindepth-02-tinh-tt-uu-tien.png)


### 1.1.3. Source order
- Nếu cùng độ ưu tiên => thằng nào khai báo sau thì thằng đấy ăn

### 1.1.4. 2 điều cần lưu ý
- Tránh dùng ID selector
- Tránh dùng !important

## 1.2 Inhenritance
- Thường thì css sẽ được inhenritance từ cha. 
- Không phải tất cả đều thừa kế nha, chủ yếu là:
    -  các thuộc tính từ text như: `color, font, font-family, font-size, font-weight, font-variant, font-style, line-height, letter-spacing, text-align, text-indent, text-transform, white-space, and word-spacing`
    - các thuộc tính là list property: `list-style, list-style -type, list-style-position, and list-style-image`
    - table border: `border-collapse and border-spacing`

## 1.3. Special value
- `inherit` và `initial`
- inherit thì là kế thừa
- initial là giá trị mặc định. Giống như reset css vậy.

## 1.4. Shorthand prop
- Short hand là dạng ngắn gọn, vd: font thay cho font-family, font-weight...
- Cẩn thận short-hand sẽ ghi đè giá trị của bạn. VD:
```
p {
  font-weight: bold;
}
.title {
  font: 32px Helvetica, Arial, sans-serif;
}

<p class="title">Oh my god</p>
```
- Ở trên định nghĩa font-weight là `bold` rồi, tuy nhiên bên dưới chỉ dùng short hand là `font`, ko định nghĩa bold => bị ghi đè về normal
- Thực tế là định nghĩa sẽ trở thành như này:
```
h1 {
  font-weight: bold;
}
.title {
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-stretch: normal;
  line-height: normal;
  font-size: 32px;
  font-family: Helvetica, Arial, sans-serif;
}
```
- Thứ tự của short hand prop là top, right, bottom, left (ghi nhớ là TRouBLe)
