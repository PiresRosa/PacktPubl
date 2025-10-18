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
- Khi dùng v-for generate 1 array, nếu arr thay đổi thì vue chỉ gen lại phần thay đổi đấy:
+ Nếu push item vào cuối arr => chỉ gen thêm phần tử mới push
+ Nếu push item vào giữa arr => chỉ gen từ vị trí mới push về cuối.
- => không nên dùng key là index nha.

HTML:
```
<h2>V-for khong co key</h2>
<color-item v-for="(item, i) in items1" @click.native="items1.splice(i, 1)">
    {{ item }}
</color-item>

<h2>V-for co key</h2>
<color-item v-for="(item, i) in items1" @click.native="items1.splice(i, 1)"
    :key="item">
    {{ item }}
</color-item>

<script src="https://unpkg.com/vue"></script>
<script>
    const randomColor = () => `hsl(${Math.floor(Math.random() * 360)}, 75%, 85%)`;

    Vue.component('color-item', {
        template: '<p :style="{ backgroundColor: color }"><slot></slot></p>',
        data: () => ({
            color: randomColor()
        })
    });

    new Vue({
        el: '#app',
        data() {
            return {
                items1: ['one', 'two', 'three', 'four', 'five']
            }
        }
    })
</script>
```

# Chap 3: Styling with Vue
- Dùng v-bind:class để xử lý class
VD:

```
<div
  v-bind:class=['my-class', classFromVariable, {'conditionalClass': hasClass}]
></div>
```

- Dùng v-bind:style để xử lý inline style
```
<div v-bind:style="{fontWeight: 'bold', color: 'red'}"></div>
<div :style="[baseStyles, moreStyles]">...</div>
```
+ lưu ý là thuộc tính dùng camelCase nha, tự động vue sẽ chuyển về kebab-case

## Scoped CSS with vue-loader
- Khi define CSS trong component, vue sẽ tự gen thêm thuộc tính để tránh class này ảnh hưởng tới code của các component khác. VD:

```
<template>
     <p>The number is <span class="number">{{ number }}</span></p>
</template>
<script>
     export default {
       props: {
         number: {
           type: Number,
           required: true
} }
};
</script>
<style>
     .number {
       font-weight: bold;
}
</style>
```
- Khi gen ra sẽ thành ntn:

```
<p data-v-e0e8ddca>The number is <span data-v-e0e8ddca class="number">10
     </span></p>
   <style>
   .number[data-v-e0e8ddca] {
     font-weight: bold;
   }
</style>
```



## CSS module with vue loader
- Concep có vẻ giống scoped CSS. Khác cái là dùng $style.
```
<template>
     <p>The number is <span :class="$style.number">{{ number }}</span></p>
</template>
   <style module>
     .number {
       font-weight: bold;
}
</style>
```

## Preprocessor
- Nếu dùng SCSS hay 1 loại ngôn ngữ trung gian nào đó để viết CSS => cần làm 2 bước:
+ B1: Dùng yarn hoặc npm install `sass-loader` hoặc `node-sass`
+ B2: Add lang="scss" vào thẻ style
```
<style lang="scss" scoped>
     $color: red;
     .number {
       font-weight: bold;
       color: $color;
}
</style>
```

# Chap 4: Render Function & JSX
- Bình thường dùng thuộc tính template/ cặp thẻ <template> </template>
- JSX là 1 giải pháp khác cho việc render.

# Chap 5: Client-side routing with vue-router
## Install

```
<script src="https://unpkg.com/vue-router"></script>

npm install --save vue- router
```

```
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
```

## Basic usage

```

   import PageHome from './components/pages/Home';
   import PageAbout from './components/pages/About';
   const router = new VueRouter({
     routes: [
       {
         path: '/',
         component: PageHome
}, {
         path: '/about',
         component: PageAbout
       }
] });


import router from './router';
   new Vue({
     el: '#app',
     router: router
});
```

- Sau khi import xong, đặt cặp thẻ <router-view/> ở vị trí bạn muốn router hiển thị ra
```
<div id="app">
  <h1>Site title</h1>
  <main>
    <router-view />
</main>
  <p>Page footer</p>
</div>
<script>
  const PageHome = {
    template: '<p>This is the home page</p>'
  };
  const PageAbout = {
    template: '<p>This is the about page</p>'
  };
  const router = new VueRouter({
    routes: [
      { path: '/', component: PageHome },
      { path: '/about', component: PageAbout }
    ]
});
  new Vue({
    el: '#app',
    router,
});
</script>
```



## Dynamic Routing
- Đưa param vào trong path
```
 const router = new VueRouter({
     routes: [
       {
         path: '/user/:userId',
         component: PageUser
} ]
});
```

- Trong component có thể access vào current router bằng cách `this.$route`

## Reacting to Route Updates
- Router cung cấp 1 hook là `beforeRouteUpdate(to, from, next)` để lắng nghe trước khi router chuyển.
```
<template>
  <div v-if="state === 'loading'">
    Loading user...
</div> <div>
    <h1>User: {{ userInfo.name }}</h1>
... etc ...
  </div>
</template>

<script>
export default {
  data: () => ({
    state: 'loading',
    userInfo: undefined
  }),
  mounted() {
    this.init();
  },
  beforeRouteUpdate(to, from, next) {
    this.state = 'loading';
    this.init();
    next();
}, methods: {
  init() {
    fetch(`/api/user/${this.$route.params.userId}`)
      .then((res) => res.json())
      .then((data) => {
        this.userInfo = data;
      });
} }
};
</script>
```

## Passing Params to Components as Props
- Code gốc, dùng $router.params.userId => dính dáng đến router => không clean

```
const PageUser = {
     template: '<p>User ID: {{ $route.params.userId }}</p>'
};
   const router = new VueRouter({
     routes: [
       {
         path: '/user/:userId',
         component: PageUser
} ]
});
```

- Code mới decoupling được router ra khỏi component => trông ngon hơn.

```
const PageUser = {
  props: ['userId'],
  template: '<p>User ID: {{ userId }}</p>'
};
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      component: PageUser,
      props: true
    }]
});
```

## Nested Routes
```
const router = new VueRouter({
     routes: [
      {
        path: '/settings',
          component: PageSettings,
          children: [
            {
              path: 'profile',
              component: PageSettingsProfile,
            },{
            path: 'email',
            component: PageSettingsEmail,
          }
        ]
      }]
});
```

## Redirect and Alias
- Redirect => sẽ chuyển về router redirect
VD: truy cập settings sẽ redirect về preferences
```
const router = new VueRouter({
  routes: [
    {
      path: '/settings',
      redirect: '/preferences'
  }]
});
```

- Alias => truy cập được cả 2
```
const router = new VueRouter({
     routes: [
       {
         path: '/settings',
         alias: '/preferences',
         component: PageSettings
} ]
});
```

## Navigation

### The output tag
- Dùng <router-link> để sinh ra thẻ <a>
- Có thể dùng thẻ khác cũng được

```
<router-link to="/user/1234" tag="li">Go to user #1234</router-link>

sẽ gen ra

<li>Go to user #1234</li>
```
- Tuy nhiên không nên làm thế, vì mất đi tính native của browser:
+ Khi hover, click vào ko thể hiện được đấy là link
+ Không click phải chuột, open new tab được.

- Có thể fix bằng cách táng thẻ <a> vào bên trong

```
<router-link to="/user/1234" tag="li"><a>Go to user #1234</a></router-link>

sẽ sinh ra
<li><a href="/user/1234">Go to user #1234</a></li>
```


### Active class
- Một link được gọi là active khi path của <router-link> trỏ tới trang hiện tại.
- Mặc định vue sẽ thêm class `router-link-active` vào. Tuy nhiên có thể chủ động config lại cho phù hợp

```
<ul class="nav navbar-nav">
  <router-link to="/blog" tag="li" active-class="active">
    <a>Blog</a>
  </router-link>
  <router-link to="/user/1234" tag="li" active-class="active">
    <a>User #1234</a>
  </router-link>
</ul>
```

### Native events
- Cần thêm .native vào @click trong router link thì mới work.
- Lí do: router link về cơ bản cũng là 1 component => chỉ lắng nghe những gì trong component thôi.
```
<router-link to="/blog" @click.native="handleClick">Blog</router-link>
```

### Programmatic navigation (navigate bằng code)
- Mặc định thì browser dùng HTML5 api `history.pushState()`, `history.replaceState()`, `history.go()`
- Vue thì dùng `router.push('')` (hoặc `$.router.push('')` đối với component)
- Khi bạn click vào <router-link> thì vue cũng làm tương tự `router.push('')`
- Có 2 cái: `router.push('')` và `router.replace('')`
+ Push => thêm cái mới vào => có cửa back lại
+ Replace => thay thế cái hiện tại => không có cửa back lại đâu :))
- Có cả hàm router.go nữa: `router.go(-1)`

## Navigation guard
- Vue cung cấp hook `beforeEach` cho router để xử lý mỗi khi chuyển router
- Trong VD dưới đây, path nào start bởi /account thì cần authen rồi, nếu chưa redirect về login
```
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/account') && !userAuthenticated()) {
    next('/login');
  } else {
    next(); 
  }
});
```
- Nhớ gọi hàm `next()`, không gọi là coi chưa chưa được resolve => lỗi
- Check auth kiểu startWith hơi nông dân => router cung cấp cái gọi là meta field, để định nghĩa xem có phải router cần auth ko.
```
const router = new VueRouter({
     routes: [
       {
         path: '/account',
         component: PageAccount,
         meta: {
           requiresAuth: true
         }
} ]
});
   router.beforeEach((to, from, next) => {
     if (to.meta.requiresAuth && !userAuthenticated()) {
       next('/login');
     } else {
next(); }
});
```
- trong ví dụ trên thì dùng cái gọi là `requiresAuth`, anh em đặt gì tuỳ ý cũng được.

# Chap 6: State management with VueX
## Install
```
<script src="https://unpkg.com/vuex"></script>

npm install --save vuex


import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
```

- Định nghĩa 1 store
```
import Vuex from 'vuex';
   export default new Vuex.Store({
     state: {}
});
```
- Import store vào code:

```
import Vue from 'vue';
   import store from './store';
   new Vue({
     el: '#app',
     store,
     components: {
       App
    } });
```
## Concept
- State dùng để các component share state với nhau
- Bình thường component viết như này

```
const NotificationCount = {
     template: `<p>Messages: {{ messageCount }}</p>`,
     data: () => ({
       messageCount: 'loading'
     }),
     mounted() {
       const ws = new WebSocket('/api/messages');
       ws.addEventListener('message', (e) => {
         const data = JSON.parse(e.data);
         this.messageCount = data.messages.length;
}); }
};
```
- => cái nào mouted cũng gọi đến 1 cái socket endpoint như trên thì hơi toang
- Với vuex thì dùng chung state => để 1 thằng handle get message thôi
```
const NotificationCount = {
  template: `<p>Messages: {{ messageCount }}</p>`,
      computed: {
        messageCount() {
          return this.$store.state.messages.length;
        }
      }
      
      mounted() {
        this.$store.dispatch('getMessages');
  } };
```
- Trong store làm thế này:

```

let ws;
   export default new Vuex.Store({
     state: {
       messages: [],
     },
     mutations: {
       setMessages(state, messages) {
         state.messages = messages;
       }
}, actions: {
       getMessages({ commit }) {
         if (ws) {
return; }
         ws = new WebSocket('/api/messages');
         ws.addEventListener('message', (e) => {
           const data = JSON.parse(e.data);
           commit('setMessages', data.messages);
}); }
} });
```
- => ws chỉ init 1 lần duy nhất, mỗi khi có msg sẽ push msg list

## State & state helper
```
import Vuex from 'vuex';
   export default new Vuex.Store({
     state: {
       messageCount: 10
     }
});


const NotificationCount = {
     template: `<p>Messages: {{ messageCount }}</p>`,
     computed: {
       messageCount() {
         return this.$store.state.messageCount;
} }
};
```
- => nhìn this.$store.state.messageCount trông hơi dài dòng => sinh ra 1 thằng state helper gọi là mapState

```
import { mapState } from 'vuex';
   const NotificationCount = {
     template: `<p>Messages: {{ messageCount }}</p>`,
     computed: mapState(['messageCount'])
};
```
- Để ý chỗ `computed: mapState(['messageCount'])` là viết tắt của:

```
computed: mapState({
     messageCount: (state) => state.messageCount
})
```
- Có thể viết như sau cũng được

```
computed: mapState({
     messageCount: 'messageCount'
})
```
- => Vậy khi nào, nên dùng kiểu nào?
+ Nếu chỉ map 1-1, không thay đổi gì => dùng dạng array cho mượt
+ Nếu có thay đổi => dùng dạng object để modify.
VD: trong state có arr `messages`, trong component chỉ muốn lấy ra count:

```
computed: mapState({
  msgCount: (state) => state.messages.length,
  something: 'something'
})
```

- nếu ko thích dùng ES6 style thì dùng kiểu func thông thường cũng được:

```
computed: mapState({
  msgCount (state) {
    return state.message.length
  }
})
```

- 1 common error là move tất cả vào state => ko nên. Cái nào dùng chung thì move vào state dùng chung, còn ko thì để local cũng được.
- Nếu muốn map cả state và dùng local computed thì có thể dùng toán tử `...` (spread operator)
- Lưu ý là nếu dùng `...` thì cần transpiler như babel để support tất cả các device nha.


```
computed: {
     doubleFoo() {
       return this.foo * 2;
     },
     ...mapState({
          messageCount: (state) => state.messages.length,
          somethingElse: 'somethingElse'
}) }
```

## Getter
- Để thay đổi data trả về mặc định. VD: nhiều lúc chỉ cần lấy count, ko cần lấy cả list msg => dùng getter

```
import Vuex from 'vuex';
   export default new Vuex.Store({
     state: {
       messages: [...]
     },
     getters: {
       unreadFrom: (state) => state.messages
         .filter((message) => !message.read)
         .map((message) => message.user.name)
     }
});
```

- Tương tự state, getter cũng có helper
```
computed: mapGetters(['unread', 'unreadFrom'])
```

- Cái này tương đương với
```
computed: {
     unread() {
       return this.$store.getters.unread;
     },
     unreadFrom() {
       return this.$store.getters.unreadFrom;
}, }
```

- Dùng object syntax cũng được
```
computed: mapGetters({
     unreadMessages: 'unread',
     unreadMessagesFrom: 'unreadFrom'
})
```

## Mutation
- Mutation (nghĩa là thay đổi) là func để modify data.
- LƯU Ý: CHỈ DÙNG MUTATION VỚI SYNCHRONOUS ACTION (đồng bộ). Muốn dùng async => dùng action.
- Định nghĩa state:

```
import Vuex from 'vuex';
   export default new Vuex.Store({
     state: {
       messages: []
     },
     mutations: {
       addMessage(state, newMessage) {
         state.messages.push(newMessage);
       }
} });
```

- Gọi mutation
```
 const SendMessage = {
     template: '<form @submit="handleSubmit">...</form>',
     data: () => ({
       formData: { ... }
     }),
     methods: {
       handleSubmit() {
         this.$store.commit('addMessage', this.formData);
       }
} };
```

- Dùng object syntax cũng được

```
this.$store.commit({
     type: 'addMessage',
     newMessage: this.formData
});
```

- Mutation cũng có helper

```
methods: mapMutations(['addMessage'])
```

- Tương đương với
```
methods: {
     addMessage(payload) {
       return this.$store.commit('addMessage', payload);
     },
}
```
- Dùng kiểu object để map sang name khác
```
methods: mapMutations({
     addNewMessage: 'addMessage'
})
```

- Giống với
```
 methods: {
     addNewMessage(payload) {
       return this.$store.commit('addMessage', payload);
     },
}
```

## Action
- Dùng để update async change. Ví dụ:

```
import Vuex from 'vuex';
   export default new Vuex.Store({
     state: {
       messages: []
     },
     mutations: {
       addMessage(state, newMessage) {
         state.messages.push(newMessage);
       },
       addMessages(state, newMessages) {
         state.messages.push(...newMessages);
} },
     actions: {
       getMessages(context) {
         fetch('/api/new-messages')
           .then((res) => res.json())
           .then((data) => {
             if (data.messages.length) {
               context.commit('addMessages', data.messages);
} });
} }
});
```
- Ví dụ khác

```

   import { mapState } from 'vuex';
   const NotificationCount = {
     template: `<p>
       Messages: {{ messages.length }}
       <a @click.prevent="handleUpdate">(update)</a>
     </p>`,
     computed: mapState(['messages']),
     methods: {
       handleUpdate() {
         this.$store.dispatch('getMessages');
} }
};
```
- Trong này dùng hàm `dispatch` để gọi đến action
- Action helper

```
methods: {
     // Maps this.getMessage() to this.$store.dispatch('getMessage')
     ...mapActions(['getMessage'])
     // Maps this.update() to this.$store.dispatch('getMessages')
     ...mapActions({
       update: 'getMessages'
}) }
```
### Destructuring
- Destructuring là khái niệm phân giải object ra.
- VD: obj = {name: "phong", age: 20} -> destructuring: const {name} = obj
- Bình thường viết action sẽ có 1 param là context, sau đó commit thì gọi context.commit như này:
```
actions: {
  getMessages(context) {
    // other logic...
    context.commit('addMessages', data.messages);
  }
}
```
- Có thể viết gọn hơn như sau:

```
actions: {
  getMessages({commit}) {
    // other logic...
    commit('addMessages', data.messages)
  }
}
```
- Promise and actions

