# Cú pháp cơ bản
> Tip:
>
> v-bind ~ :
>
> v-on ~ @
---
### Binding
> Để đưa dữ liệu ra ngoài giao diện

```
<a v-bind:href="link">Google</a>
```
> 2 way binding

```
<input v-model="abc">
```

> Để bind dữ liệu 1 lần duy nhất. Kể cả biến update cũng ko bind lại

```
<h1 v-once> {{ title }}</h1>
```
> Để đưa raw HTML ra ngoài
```
<p v-html="htmlCode"></p>
```

### Lắng nghe sự kiện
> Lắng nghe sự kiện click
```
<p v-on:click="increase"></p>
```
> Lấy tọa độ chuột
```
<p v-on:mousemove="updateCoordinate(100)"></p>

function updateCoordinate(customParam, event){
    console.log(customParam);
    let x = event.clientX;
    let y = event.clientY;
}
```
> Dừng lan truyền sự kiện (stop propagation)
```
Việc dừng lan truyền bản chất là gọi hàm event.stopPropagation();
Vue cung cấp shorthand gọi cho ngắn:

<span v-on:mousemove.stop=""> Điểm chết, không ghi nhận tọa độ ở đây </p>
```
> Bắt sự kiện keyup 
> Chỉ bắt của nút enter và nút space thôi
```
<input v-on:keyup.enter.space="alertMe">
```