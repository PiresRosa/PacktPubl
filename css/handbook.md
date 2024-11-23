# CSS Handbook tiếng Việt

## Giới thiệu về CSS
- CSS viết tắt của Cascading Style Sheets
- Là ngôn ngữ dùng để style cho file html
- Nói cho trình duyệt biết nên render file html ra như thế nào

- CSS file có nhiều rules
- 1 rule gồm selector và khối khai báo (declaration block)
    + Selector: string biểu thị 1 hoặc nhiều phần tử của page. Có thể dùng tên thẻ, class, id hoặc pseudo class, pseudo element (sẽ có phía dưới)
    + Khối khai báo: gồm một hoặc nhiều cặp khai báo dạng key-value
    
VD:

```
p {
  font-size: 20px;
}

a {
  color: blue;
}

p, a {
  font-size: 20px;
}
```
- CSS cần có dấu `;` ở cuối để kết thúc một cặp khai báo. Riêng cặp khai báo cuối cùng thì không cần, nhưng khuyến khích nên có

## Lịch sử CSS
- Ngày trước dùng thẻ HTML để style cho trang web: `center`, `font`, `bold`,... -> bị lẫn lộn. Đúng ra thẻ HTML chỉ nên làm tốt tác dụng của nó là làm khung trang web.
- Thời điểm này có nhiều trình duyệt khác nhau (Internet Explore, Netscape Navigator), không có chuẩn chung -> có trang hiển thị tốt trên trình duyệt này nhưng không hiển thị được trên trình duyệt khác.
- CSS ra đời nhằm chuyên biệt công dụng dựng style cho trang web.
- 1994: ý tưởng về CSS thống nhất bắt đầu nhen nhóm
- 1996: CSS 1 ra đời
- 1998: CSS 2 ra đời

- Đọc thêm về lịch sử ở đây: https://css-tricks.com/look-back-history-css/

## Cách thêm CSS vào trang HTML
1. Sử dụng thẻ `link`, truyền vào đường dẫn tương đối/tuyệt đối đến file css
```
<link rel="stylesheet" type="text/css" href="myfile.css">
```

2. Viết code trong cặp thẻ `style`

```
<style>
... css viết ở đây...
</style>
```

3. Viết inline CSS

```
<div style="background-color: yellow">...</div>
```