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

### 2.2.3: Sử dụng rem
- rem = root em = size của phần tử `:root` (hay `html`)
- Phía trên dùng `em` gặp vấn đề là do list phụ thuộc vào thằng cha => thằng cha nhỏ đi => thằng con nhỏ đi.
- => dùng rem giải quyết được vấn đề này

## 2.3: Stop thinking pixel
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

## 2.4: Viewport relative unit
- Viewport = vùng màn hình hiển thị (không tính address bar, statusbar,...)
- Quy đổi:
```
- vh = 1/100 viewport height
- vw = 1/100 viewport width
- vmin = 1/100 của chiều nhỏ hơn (không phải lúc nào dài cũng > rộng, do user xoay ngang màn hình chẳng hạn)
- vmax = 1/100 của chiều lớn hơn
```
- Ví dụ
```
.square {
  width: 90vmin;
  height: 90vmin;
  background-color: #369;
}
```

![View port](images/cssindepth-viewport.png)
- Như hình thì lúc nào hình vuông cũng chỉ = 90% của chiều nhỏ nhất (vmin mà)

- Một chút note về CSS3:
    - Một số đơn vị trong quyển sách này không support ở các version trước đó của CSS (VD: vh, vw, rem,...)
    - Khoảng giữa những năm 90 và 2000, CSS2 ra đời
    - 1998, CSS 2.1 ra đời
    - Khoảng 2013 gì đấy thì CSS3 ra đời
    - ... nói cái gì đấy xiaolin, ko hay lắm nên ko đọc tiếp

### 2.4.1: Sử dụng vw cho font-size
- Dùng vw cho font-size khá hay, VD màn 1200px -> font= 2vw = 2% = 24px; màn nhỏ cũng tự co về
- Tuy nhiên 24px thì hơi to, còn với màn có vw nhỏ như iphone6 thì 2vw lại bé quá -> dùng hàm calc()

### 2.4.2: Sử dụng calc() cho font-size
- Dùng remix giữa các đơn vị luôn. VD:
```
:root {
  font-size: calc(0.5em + 1vw);
}
```
- Trong VD trên thì 0.5em gần vừa mắt với người dùng. 1vw vừa đủ để tăng linh hoạt khi viewport thay đổi.

## 2.5: Unitless numbers and line height
- Một số thuộc tính ko cần unit (VD: line-height, z-index, font-weight)
- Trong trường hợp = 0 thì ko cần unit (do 0px hay 0% thì có khác mẹ gì nhau đâu :v)
- line height khá đặc biệt, nó accept cả có unit và ko có unit
    - Có unit => tính toán ra luôn giá trị
    - Không unit => giá trị tuỳ thuộc vào phần tử con của nó
- VD:

```
<style>
    body {
        line-height: 1.2em;
    }
    .about-us {
        font-size: 2em;
    }
</style>

<body>
    <!-- <p class="title">Oh my god</p> -->
    <p class="about-us">
        We have built partnerships with small farms around the world to
        hand-select beans at the peak of season. We then carefully roast in
        small batches to maximize their potential. We then carefully roast in
        small batches to maximize their potential. We then carefully roast in
        small batches to maximize their potential.
    </p>
</body>
```
- Như trên sẽ bị lỗi, dòng mau di dít vào với nhau như này
![line-height problem](images/cssindepth-line-height.png)
- Lí do: để đơn vị line-height = 1.2em => tính luôn = 1.2 x 16 = 19.2px. Font size của thẻ p là 2em = 32px => 32px mà giãn dòng có 19.2 thì nó mau là đúng rồi.
- Cách fix: bỏ đơn vị đi

```
<style>
    body {
        line-height: 1.2;
    }
    .about-us {
        font-size: 2em;
    }
</style>
```
- Bỏ đơn vị đi thì nó chỉ tình là 1.2 lần, khi vào đến thẻ p có class about-us => 1.2 lần của 32px = 38.4


## 2.6: Custom property (aka CSS variable)
- Có thể anh em làm SASS hay LESS đã có variable từ lâu rồi => coi thường mục này
- ĐỪNG. variable này có thể làm được nhiều thứ mà SASS hay LESS làm được. Hồi sau sẽ rõ :v

- Khai báo custom prop

```
:root {
  --main-font: Helvetica, Arial, sans-serif;
}
```
- Dùng custom prop: dùng hàm `var()`
```
:root {
  --main-font: Helvetica, Arial, sans-serif;
}

p {
  font-family: var(--main-font);
}
```
- Hàm var() dùng thêm đối thứ 2 là fallback cũng được

```
:root {
    --main-font: Helvetica, Arial, sans-serif;
    --brand-color: #369;
}
p{
    font-family: var(--main-font, sans-serif); color: var(--secondary-color, blue);
}
```

- Lưu ý là nếu value không hợp lệ => sẽ set về initial value
- VD: padding mà value lại là color => set về gía trị 0

```
padding: var(--brand -color)
```

### 2.6.1: Change custom property dynamically
- Custom prop đơn thuần chỉ là giúp bạn không phải viết quá nhiều duplicate code
- Điều đặc biệt hơn: nó chảy xuống (cascade) và kế thừa (inherit)
- VD về việc thay đổi custom property để làm dark mode

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Demo css darkmode, css in depth</title>
    <style>
        :root {
            --main-bg: #fff;
            --main-color: #000;
        }

        .panel {
            font-size: 1rem;
            padding: 1em;
            border: 1px solid #999;
            border-radius: 0.5em;
            background-color: var(--main-bg);
            color: var(--main-color);
        }

        .panel > h2 {
            margin-top: 0;
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
        }

        .dark {
            margin-top: 2em;
            padding: 1em;
            background-color: #999;
            --main-bg: #333;
            --main-color: #fff;
        }
    </style>
</head>
<body>
<div class="panel">
    <h2>Single origin</h2>
    <div class="body">
        We have built partnerships with small farms
        around the world to hand-select beans at the
        peak of season. We then careful roast in
        small batches to maximize their potential.
    </div>
</div>

<aside class="dark">
    <div class="panel">
        <h2>Single origin</h2>
        <div class="body">
            We have built partnerships with small farms
            around the world to hand-select beans at the
            peak of season. We then careful roast in
            small batches to maximize their potential.
        </div>
    </div>
</aside>
</body>
</html>
```
### 2.6.2: Change custom property với javascript
```
<script type="text/javascript">
  var rootElement = document.documentElement;
  var styles = getComputedStyle(rootElement);
  var mainColor = styles.getPropertyValue('--main-bg');
  console.log(String(mainColor).trim());


  var rootElement = document.documentElement;
rootElement.style.setProperty('--main-bg', '#cdf');
</script>
```

### 2.6.3: Experimenting with custom property
- Custom property này cũng mới, nên chưa được dùng nhiều lắm
- Tin rằng tương lai sẽ rất hữu hiệu
- Khi dùng tốt nhất cứ thêm fallback vào nha ae
```
color: black;
color: var(--main-color);
```

``