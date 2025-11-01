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

# Chap 1: Cascade, specificity, inhenritance
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

# Chap 2: Working with unit

## 2.1: Power of relative value
- Trước đây mọi người thường làm việc với absolute unit như pixel (hay còn gọi là pixel perfect design)
- Dần công nghệ phát triển, absolute ko còn phù hợp nữa
- Pixel, point và pica
    - 1 inch = 2.54 cm = 6 pc = 72 pt = 96 px

## 2.2: Em & rem
- `em` là đơn vị đi theo font-size

```
<span class="box box-small">Small</span>
<span class="box box-large">Large</span>


.box {
  padding: 1em;
  border-radius: 1em;
  background-color: lightgray;
}
.box-small {
  font-size: 12px
}
.box-large {
  font-size: 18px;
}
```

### 2.2.1. Sử dụng `em` để định nghĩa font-size
- bình thường `em` tính theo font-size
- => định nghĩa font-size = 1.2em nghĩa là to gấp 1.2 font-size được inherit từ element phía trên

#### Lưu ý: Sử dụng em cho thuộc tính khác ngoài font-size có thể xảy ra vấn đề
![Em problem](images/cssindepth-em-problem.png)

- Trong VD trên thì `.slogan` có font-size = 1.2em = 19.2px
- padding sẽ lấy giá trị theo fontsize của phần tử hiện tại => tức là 1.2 x 19.2 = 23.04
- Một ví dụ khác đối với list

```
body {
  font-size: 16px;
}
ul {
  font-size: .8em;
}
```
![Shrink problem](images/cssindepth-shrink-problem.png)
- ul đầu tiên = 0.8em, ul thứ 2 = 0.8em của ul trước đó,... tương tự vậy nên nó giảm size => nhỏ vkl.
- Tóm lại là shriking xảy ra khi có nhiều thằng tính bằng đơn vị em nằm nested nhau.
- Có 1 cách để fix là set cha của nó về 1em (bằng đúng cha)
```
ul {
  font-size: .8em;
}
ul ul {
  font-size: 1em;
}
```
- Cách trên thì cũng xử lý được, nhưng không hay lắm.
- Hạn chế override CSS bằng cách tăng cấp độ của selector lên
- Rõ ràng em cũng hay, nhưng khi nested thì phức tạp phết => tìm hiểu về rem đi

### 2.2: Sử dụng rem
- rem = root em = size của phần tử `:root` (hay `html`)
- Phía trên dùng `em` gặp vấn đề là do list phụ thuộc vào thằng cha => thằng cha nhỏ đi => thằng con nhỏ đi.
- => dùng rem giải quyết được vấn đề này

### 2.3: Stop thinking pixel
- Một số pattern thường thấy trước đây: reset page font-size về 62.5%
```
html {
    font-size: .625em;
}
```
- Mục đích pattern: reset font size về 10px cho dễ tính thằng khác (62.5% của 16 là 10).
- VD: 14px là 1.4 rem
- Cái này có nhiều bất lợi:
    - Viết nhiều duplicate style (do reset cmn về 10px => những thằng thẻ p, span,... đi theo sẽ nhỏ đi => cần viết lại cho nó to ra thì mới đọc được)
    - Vẫn đang nghĩ theo cách tính pixel.

- Thật ra 16px vẫn hơi to thật, nhưng set về thằng nào vừa phải hơn thì hợp lí hơn. Thường set về 14px:

```
:root {
    font-size: 0.875em;
}
```
- VD code 1 cái panel

```
<div class="panel">
  <h2>Single-origin</h2>
  <div class="panel-body">
    We have built partnerships with small farms around the world to
    hand-select beans at the peak of season. We then carefully roast
    in <a href="/batch-size">small batches</a> to maximize their
    potential.
</div>
</div>


.panel {
  padding: 1em;
  border-radius: 0.5em;
  border: 1px solid #999;
}
.panel > h2 {
  margin-top: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}
```
- Có thể dùng @media để làm responsive

```
:root {
  font-size: 0.75em;
}
@media (min-width: 800px) {
  :root {
    font-size: 0.875em;
  }
}

@media (min-width: 1200px) {
  :root {
      font-size: 1em;
  }
}
```
- Có thể resizing 1 component bằng cách add thêm class vào cho nó

```
.panel.large {
  font-size: 1.2rem;
}
```

### 2.4: Viewport relative unit