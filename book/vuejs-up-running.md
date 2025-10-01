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
- Lưu ý: Vue3 bỏ filter vì nó gần giống chức năng method => bỏ mẹ đi, dùng method cho được việc.
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
<input @keydown.enter.exact="handleEnter"> -> chỉ key enter được press, không bao gồm cả key khác.
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
- Có 8 bé life cycle quan trọng:
+ beforeCreate: trước khi instance khởi tạo
+ created: instance đã được khởi tạo
+ beforeMount: khi element đã sẵn sàng được add vào DOM (?)
+ mounted: khi element created (nhưng chưa chắc đã được add vào DOM. Dùng nexttick cho củ chắc)
+ beforeUpdate: khi có 1 change xảy ra
+ updated: khi change đã được updated vào DOM
+ beforeDestroy: trước khi component bị destroy
+ destroyed: khi component đã bị destroy.
- Nhìn thì là 8, nhưng thực tế chỉ cần nhớ 4 rồi suy ra 4 thằng còn lại là được :))


## Custom directive
- Có thể tự chế directive giống v-if, v-for
- VD: v-blink để nhấp nháy

```
Vue.directive('blink', {
  bind(el) {
    let isVisible true;

    setInterval(()=> {
      isVisible !isVisible;
      el.style.visibility = isVisible ? 'visible' : 'hidden'
    }, 1000);
  }
})
```
- Directive cũng có hook. Hơi khác với component tí:
+ bind: call khi directive được bound vào element
+ inserted: call khi element được insert vào parent elem. Tương tự như mounted, có thể nó chưa được insert vào DOM => dùng nextTick cho củ chắc
+ update: khi parent component được update (chưa chắc thằng child đã update xong)
+ componentUpdated: Giống update hook, khác ở chỗ tất cả các child component đã updated.
+ unbind: call khi directive bị unbind khỏi component.

- Mấy cái hook trên để cho vui thôi. Thích thì dùng, ko thích thì thôi cũng được.
- Có thể dùng chung cả bind và update như này:

```
   Vue.directive('my-directive', (el) => {
     // This code will run both on "bind" and "update"
});
```

- Có thể truyền argument vào directive nha

```
Vue.directive('blink', {
bind(el, binding) {
       let isVisible = true;
       setInterval(() => {
         isVisible = !isVisible;
         el.style.visibility = isVisible ? 'visible' : 'hidden';
       }, binding.value || 1000);
} });
```
## Transition & animation
### CSS transition
- Đại khái dùng transition thì đưa vào cặp thẻ <transition></transition>
- Vue sẽ tự thêm 1 số class, anh em tự định nghĩa CSS cho nó nhá. 
+ trong đó cái {name} là tên effect (VD: fade,...)
```
{name}-enter
{name}-enter-active
{name}-enter-to
{name}-leave
{name}-leave-active
{name}-leave-to
```

Ví dụ:
```
<div id="app">
     <button @click="divVisible = !divVisible">Toggle visibility</button>
     <div v-if="divVisible">This content is sometimes hidden</div>
   </div>
```
- Bình thường click sẽ tắt cái bụp. Giờ bao cái div vào cặp thẻ <transition>, thêm css là ngon

```
<transition name="fade">
  <div v-if="divVisible">This content is sometimes hidden</div>
</transition>

-- css:
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
opacity: 0; }
```

### JS transition
- Có 1 số hook để anh em nhảy vào custom lại animation
- Performance cho animation của JS thấp hơn CSS -> chỉ dùng JS khi thật sự cần

```
<transition
  v-on:before-enter="handleBeforeEnter"
  v-on:enter="handleEnter"
  v-on:leave="handleLeave>
  <div v-if="divVisible">...</div>
</transition>
```

# Chap 2: Component in Vuejs
## Component basics
- Easy vlin

```
<div id="app">
     <custom-button></custom-button>
   </div>
   <script>
     const CustomButton = {
       template: '<button>Custom button</button>'
};
 
new Vue({
       el: '#app',
       components: {
         CustomButton
} });
</script>
```
- Có thể regist global cũng được:

```
Vue.component('custom-button', {
     template: '<button>Custom button</button>'
});
```

- Pass data vào component dùng props

```
<div id="app">
     <color-preview color="red"></color-preview>
     <color-preview color="blue"></color-preview>
   </div>
   <script>
     Vue.component('color-preview', {
       template: '<div class="color-preview" :style="style"></div>',
       props: ['color'],
       computed: {
         style() {
           return { backgroundColor: this.color };
} }
});
     new Vue({
       el: '#app'
});
</script>
```

- Prop cũng có validation. Nếu không match type khai báo => vue throw ra warning

```
Vue.component('price-display', {
     props: {
       price: Number,
       unit: String,
       price2: {
         type: [Number, String],
         required: true,
         valiator (value) {
           return value >= 0;
         }
       },
       unit: {
         type: String,
         default: '$'
       }
     }
});
```
- Cứ định nghĩa ở trong script kiểu camelCase, sang bên html có thể dùng kiểu `kebab-case`
- Lưu ý: nếu truyền string thì k cần v-bind, nhưng kiểu khác thì cần
VD:

```
<price-display percentage-discount="20%"></price-display> => k cần
<display-number v-bind:number="number"></display-number> => cần (do đang bind model)
<display-number v-bind:number="10"></display-number> => cần (do đang bind number)
```

## Data flow & .sync modifier
- Bình thường data chỉ update từ cha => con (gọi là oneway data binding) (do sync từ con sang cha có nhiều vấn đề, VD: cha có nhiều con, con nào cũng update thì biết lấy từ con nào??)
- Ví dụ nhỏ về việc update
```
Vue.component('updated-children', {
    template: '<p> The number is: {{number}} </p>',
    props: {
        number: {
            type: Number,
            required: true
        }
    },
    mounted() {
        setInterval(() => {
            this.$emit('update:number', this.number + 1);
        }, 1000)
    }
})

<updated-children
  :number="displayNum"
  @update:number="val => displayNum = val">
</updated-children>

```
- Có thể dùng .sync cho gọn (.sync ~ @update:number="val => displayNum = val")

```
<updated-children
  :number.sync="displayNum">

</updated-children>
```

- Thật ra để ý kĩ ví dụ trên, giá trị `number` bên trong component update-children không hề thay đổi ở hàm `setInterval`, mà nó emit lên thằng cha, thằng cha thay đổi gía trị local của mình và pass xuống thằng con.

### Custom input & v-model
- Thử tạo 1 cái input không cho nhập chữ hoa

```
<lower-input v-model="inputName"/></lower-input>

Vue.component('lower-input', {
  template: '<input :value="value" @input="handleInput"/>',
  props: {
      value: {
          type: String,
          required: true
      }
  },
  methods: {
      handleInput(e) {
          const value = e.target.value.toLowerCase();

          this.$emit('input', value)
      }
  }
})
```
- Để ý sẽ thấy v-model có tác dụng tương tự .sync, v-model thường để binding cho input
- Ví dụ trên có issue: nếu gõ chữ hoa => con trỏ sẽ về cuối input (chắc do hàm toLower). Để khắc phục => lưu vị trí cũ con trỏ, sau đó set lại. [Chỗ này viết thành 1 bài blog đc nhể]

### Passing content to component using slot
```
Vue.component('custom-button', {
     template: '<button class="custom-button"><slot></slot></button>'
});
```
- Có thể để content mặc định trong cặp <slot> để nếu không truyền slot vào thì có fallback content

```
Vue.component('custom-button', {
     template: `<button class="custom-button">
       <slot><span class="default-text">Default button text</span></slot>
     </button>`
});
```
- Named slot

```
<section class="blog-post">
    <header>
    <slot name="header"></slot>
    <p>Post by {{ author.name }}</p>
    </header>
    <main>
      <slot></slot>
    </main>
</section>

// Truyền vào
<blog-post :author="author">
  <h2 slot="header">Blog post title</h2>
  <p>Blog post content</p>
  <p>More blog post content</p>
</blog-post>

// Gen ra

<section class="blog-post">
     <header>
       <h2>Blog post title</h2>
       <p>Post by Callum Macrae</p>
     </header>
     <main>
       <p>Blog post content</p>
       <p>More blog post content</p>
     </main>
</section>
```

- Slot scope & slot scope destructuring

##  Mixins
- Kiểu method dùng chung, viết 1 lần, import vào các component dùng tiếp

```
const userMixin = {
     methods: {
       getUserInformation(userId) {
         return fetch(`/api/user/${userId}`)
           .then((res) => res.json);
       }
} };

import userMixin from './mixins/user';
  Vue.component('user-admin', {
    mixins: [userMixin],
    template: '<div v-if="user">Name: {{ user.name }}</div>',
    props: {
      userId: {
        type: Number
} }
    data: () => ({
      user: undefined
    }),
    mounted() {
      this.getUserInformation(this.userId)
        .then((user) => {
          this.user = user;
        });
} });
```
- Mixin có thể viết thêm cả mounted,... cũng đc. Hiểu nó giống 1 component, khi dùng import vào 
- Dùng mixin thì tiện, nhưng lúc debug thì cũng mệt phết.

### Merge mixin và component
- Nếu cả component và mixin cùng có 1 method => biết chọn cái nào? => tuỳ vào kiểu
+ Với life cycle hook (VD: mounted, created) => run cả 2
+ Với còn lại => của component sẽ overwrite.

- Vì mixin dùng dễ bị trùng => Vue Style Guide khuyên dùng cách đặt tên:
+ Dùng $MixinName trước tên thật.
+ VD: $_loggingMixin2_log()

- Pattern trên đặc biệt nên dùng trong plugin, tránh bị conflict name với user defined

## Vue loader & vue file
- Viết component vào cặp thẻ HTML trông chuối vkl, khó maintain.
- Vue cho phép viết trong file .Vue, dùng `vue-loader` của webpack để compile ra cho dễ nhìn.

## Non-prop attribute
- Tức là mấy cái thuộc tính không phải prop, sẽ bị override
- VD:

```
<div id="app">
     <custom-button type="submit">Click me!</custom-button>
   </div>
   <script>
     const CustomButton = {
       template: '<button type="button"><slot></slot></button>'
};
     new Vue({
       el: '#app',
       components: {
         CustomButton
} });
</script>
```
- Trong VD trên, component custom button có type="button", nhưng từ component cha lại truyền vào type=submit => sẽ bị thằng con override lại

```
  <button type="submit">Click me!</button>
```

- Đa phần các thuộc tính khác đều bị override như vậy, trừ `style` và `class` sẽ merge vào với nhau: nếu trùng nhau thì ưu tiên thằng con

```
<div id="app">
     <custom-button
       class="margin-top"
       style="font-weight: bold; background-color: red">
       Click me!
     </custom-button>
   </div>
<script>
     const CustomButton = {
       template: `
           <button
             class="custom-button"
             style="color: yellow; background-color: blue">
             <slot></slot>
           </button>`
     };
     new Vue({
       el: '#app',
       components: {
         CustomButton
} });
</script>
```




## Component & v-for
