# Chap 1: Vuejs: The basic
- Tại sao dùng vue: vì nó gọn
- Không nên đẩy logic tính toán vào HTML. Có thể code ngắn đi tí, nhưng mà mất công maintain.
- v-if và v-show khác nhau thế nào?
+ v-if: không render ra browser nếu false
+ v-show: vẫn render ra browser, set display = none
+ nếu có data user= undefined, dùng v-show thì vẫn execute => lỗi. Dùng v-if thì không lỗi

```
<div id="app">
     <div v-show="user">
       <p>User name: {{ user.name }}</p>
     </div>
</div>
<script>
     new Vue({
       el: '#app',
       data: {
         user: undefined
       }
});
</script>
```

- Nhìn v-if có vẻ ngon hơn. Vậy v-show sinh ra để làm gì?
+ Vì v-if tốn performance hơn. V-show chỉ gen ra rồi thôi, v-if thì mỗi khi data change => đều reload lại.
+ v-show thì kể cả hide đi thì browser nó vẫn load ảnh trước, khi show thì show luôn lên, k phải chờ.

- Looping thì dùng v-for

```
<li v-for="dog in dogs"> {{ dog }} </li>
```

- v-for có kiểu v-for="(value, key) in arr/obj"
- muốn loop 10 lần thì có thể dùng v-for="n in 10"

- Có thể dùng v-bind để bind một thuộc tính bất kì nào đó.
VD: 

```
<p :disabled="btnDisabled"></p>
<span :type="btnType"></span>
```

- Đoạn này demo tính reactive bằng cách đặt trong hàm created 1 cháu interval, mỗi giây tăng giá trị biến đếm lên 1 => nhìn ngoài giao diện sẽ hiển thị kiểu:

```
Đã 14s kể từ khi bạn vào trang web này
```

- Đoạn tiếp nói về cách hoạt động: làm thế nào để biết giá trị của 1 biến đã bị thay đổi?
+ C1: copy giá trị ra 1 chỗ để chốc nữa compare lại => cái này gọi là dirty checking (Angular 1 làm trò này)
+ C2: Overwrite bằng cách dùng defineProperty

```
const storedData = {}
storedData.userId = data.userId

Object.defineProperty(data, 'userId', {
    get() {
        return storedData.userId
    },

    set(value) {
        console.log('Data has changed');

        storedData.userId = value
    },
    configurable: true,
    enumrable: true
})
```

- Cách trên không phải là cách mà Vue hoạt động, nhưng cũng là 1 cách hay.

## Cảnh báo
### Thêm property vào exist object sẽ không reactivity được nha

```
const vm = new Vue({
     data: {
       formData: {
         username: 'someuser'
        }
      }
});

vm.formData.name = 'Some User';
```

- Có 2 cách workaround:
+ C1: Thêm trước property từ đầu, để là undefined

```
formData: {
     username: 'someuser',
     name: undefined
}
```
+ C2: Dùng `Object.assign{}`:

```
vm.formData = Object.assign({}, vm.formData, {
     name: 'Some User'
});
```

+ C3: Dùng hàm set của Vue

```
Vue.set(vm.formData, 'name', 'Some User');
```

> Trong 1 component, dùng this.$set chính là dùng hàm set trên của Vue.

### Set giá trị của item trong arr 
Thật ra tương tự thằng trên thôi, dùng index (giống như dùng property) sẽ không work được.

```
const vm = new Vue({
     data: {
       dogs: ['Rex', 'Rover', 'Henrietta', 'Alan']
     }
   });
   vm.dogs[2] = 'Bob'
```


=> có 2 cách xử lý:
- C1: Dùng splice
```
vm.dogs.splice(2, 1, 'Bob);
```

- C2: Dùng Vue.set()
```
Vue.set(vm.dogs, 2, 'Bob')
```

## Two way data binding
- Dùng v-bind sẽ không two way. Cần dùng v-model.

```
 <h2>Test Two way binding</h2>
    <input type="text" v-model="twoWaymodel"/>
    <p>value: {{ twoWaymodel }} </p>
<hr>
```

- Set HTMl cho trang web có thể dùng v-html="htmlContent"
- Lưu ý là dùng v-html có thể bị XSS nha. Chỉ dùng v-html cho những content không bị thay đổi bởi người dùng.

## Data, method, computed

- Method: Không có gì hot
- Computed prop: 
+ Nó lai giữa method và property
- Khác biệt computed prop và method:
+ Computed thì cached, còn method thì không
+ Computed cho phép custom thêm hàm get/set để phục vụ nhiều mục đích hơn

```
<div id="app">
     <p>Sum of numbers: {{ numberTotal }}</p>
   </div>
   <script>
     new Vue({
       el: '#app',
       data: {
         numbers: [5, 8, 3]
       },
       computed: {
         numberTotal: {
           get() {
             return numbers.reduce((sum, val) => sum + val);
           },
           set(newValue) {
             const oldValue = this.numberTotal;
             const difference = newValue - oldValue;
             this.numbers.push(difference).
} }
} });
</script>
```
- Khi nào dùng cái gì: data, method, computed property:
+ Method: Khi cần có argument => dùng method. data/computed không đáp ứng được điều này
+ Data: chứa pure data, sẽ được dùng trong method/computed
+ Computed: là bản update của data, chứa những data cần tính toán. Lưu vào đây thì k phải code lặp lại trong html template nữa.

## Watch
- Về cơ bản dùng computed property là đáp ứng được rồi
- Chỉ dùng watch khi có asynchonous task.
- VD: user nhập vào 1 input, 5s sau hiện lên giao diện: 5s trước mày đã nhập cái này đúng không.

- Watch có thể watch change theo từng prop của object.

- LƯU Ý: nếu watch change object => thuộc tính của object thay đổi thì nó sẽ không listen được
=> Cần dùng tới deep:true

```
watch: {
     formData: {
       handler() {
         console.log(val, oldVal);
},
deep: true }
}
```

## Filter
- Dùng filter để format tiền hay gì đấy thì lại là hợp lí

- VD: code gốc
```
<div id="app">
     <p>Product one cost: ${{ (productOneCost / 100).toFixed(2) }}</p>
     <p>Product two cost: ${{ (productTwoCost / 100).toFixed(2) }}</p>
     <p>Product three cost: ${{ (productThreeCost / 100).toFixed(2) }}</p>
   </div>
   <script>
     new Vue({
       el: '#app',
       data: {
         productOneCost: 998,
         productTwoCost: 2399,
         productThreeCost: 5300
} });
</script>
```

- Dùng filter cho đẹp trai

```
<div id="app">
     <p>Product one cost: {{ productOneCost | formatCost }}</p>
     <p>Product two cost: {{ productTwoCost | formatCost }}</p>
     <p>Product three cost: {{ productThreeCost | formatCost }}</p>
   </div>
   <script>
     new Vue({
       el: '#app',
       data: {
         productOneCost: 998,
         productTwoCost: 2399,
         productThreeCost: 5300
}, filters: {
  formatCost(value) {
           return '$' + (value / 100).toFixed(2);
} }
});
</script>
```

## Ref
- Nếu cần access trực tiếp vào DOM thì dùng ref cũng được

```
   <canvas ref="myCanvas"></canvas>

this.$refs.myCanvas.
```
- Sử dụng ref đặc biệt hiệu quả trong component. Dùng this.$refs sẽ chỉ link đến các ref trong component hiện tại thôi, k phải tất cả các ref trong document.

## Inputs & events
- Mặc định các hàm sẽ có param đầu tiên (e) để handle event.
- Có thể dùng inline code: $event để access. Cái này thường dùng trong trường hợp add cùng 1 event vào nhiều cháu khác nhau; cần biết event trigger từ cháu nào (?)
- Có 1 số modifier:
+ .prevent: tránh submit form, tránh chuyển trang
+ .stop: dừng lan truyền, tránh trigger lên parent element
+ .once: chỉ chạy 1 lần
+ .capture: cho event dispatch xuống child (thay vì dispatch lên trên theo kiểu buble) => chỗ này nên search để đọc thêm về event capture và event bubbling
+ .seft, .parent
+ key

```
 <form @keyup.27="handleEscape">...</form>
 <form @keyup.shift-left="handleShiftLeft">...</form>
<input @keydown.enter.exact="handleEnter">
```

## Life cycle hook
- Từ vue 2.0, mounted ko đảm bảo elem được generated. Dùng nextTick để đảm bảo

```
<div id="app">
<p>Hello world</p>
   </div>
<script>
     new Vue({
       el: '#app',
       mounted() {
         // Element might not have been added to the DOM yet
         this.$nextTick(() => {
           // Element has definitely been added to the DOM now
}); }
});
</script>
```