# Part 1: Mastering Typescript syntax
# Chap 1: Getting familiar with typescript
# Chap 2: Basic & custom type

# Appendix: Modern javascript
## let, const, var
- Bình thường anh em hay dùng var để khai báo
- Dùng var thì javascript sẽ move mệnh đề khai báo (declaration) lên đầu. Cái này gọi là hoisting.
- Vì hoisting => kể cả khai báo biến trong cặp ngoặc nhọn đi nữa thì ra ngoài vẫn access được.
- Ví dụ đoạn code sau vẫn in ra 10
```
function foo() {
    for(var i = 0;i <10; i++) {

    }

    console.log("i= " + i);
}
```
- Magic vl
- Ví dụ khác:
```
var customer = "Joe";
(function() {
  console.log('Customer name inside: ' + customer);
})();

console.log('Customer name outside: ' + customer);
```

- Ở ví dụ này sẽ in ra:
```
"Customer name inside: Joe"
"Customer name outside: Joe"
```
- Lí do là biến customer là global variable => sẽ ăn ở cả inside và outside

- Giờ sửa lại, thêm quả if ở bên trong như sau:
```
var customer = "Joe";
(function() {
  console.log('Customer name inside: ' + customer);
  
  if (true) {
    var customer = "Mary"
  }
})();

console.log('Customer name outside: ' + customer);
```
- Bây giờ sẽ in ra:
```
"Customer name inside: undefined"
"Customer name outside: Joe"
```
- Lí do: ES5 tự động hoisting lên top scope => trong trường hợp này top scope là cái ngoặc tròn => tự hoisting cái khai báo biến customer lên. Ban đầu khai báo thì nó là undefined

- Cái nữa là các hàm thì không được hoisted => có thể sẽ bị undefined.

- let thì cho khởi tạo lại, const thì không cho khởi tạo lại.
- Đừng có nhầm const là immutable value nhá. Nó vẫn thay đổi được các property bình thường, chỉ là không cho khởi tạo lại tôi.
- Tốt nhất dùng const và let mà khai báo cho nó đỡ lỗi ông ạ.

## Template literal
- Là dùng cái backtick với dollar sign như này:
```
const name = "Teo";
console.log(`Hello ${name}`)
```

## Tagged template string
- Đại khái là gọi function theo 1 cách dị vl thế này:
- Function khai báo là:
```
function currencyAdjustment(stringParts, region, amount) {
    console.log(stringParts);
    console.log(region);
    console.log(amount);

    let sign;
    if(region === 1) {
        sign = "$";
    } else {
        sign = "\u20AC";
        amount = 0.9*amount;
    }

    return `${stringParts[0]}${sign}${amount}${stringParts[2]}
}

const amount = 100;
const region = 2;

const message = currencyAdjustment`You have earn ${region} ${amount}!`;
console.log(message);
```
- Kết quả trông như này:
```
['You have earn ', ' ', '!', raw: Array(3)]
2
100
You have earn €90!
```

## Optional parameter & default value
- Đại khái là 1 param truyền vào trong hàm có giá trị default thì cũng là optional luôn. Nếu k truyền vào thì nó sẽ lấy giá trị mặc định.

## Arrow function
- Arrow function expression, còn gọi là fat arrow functions
- Là cú pháp giúp trông ngắn gọn và phạm vi cho biến this.

## Rest, spread operator, destructuring syntax

## Class & inhenritance
- Để inherit thì dùng .prototype như sau:
```
function Tax(){
    // Code goes here
}

function NJTax() {
    // Code goes here
}

NJTax.prototype = new Tax();
var njTax = new NJTax();
```
- ES6 mang đến syntax class và inherit nhìn cho nó clear như sau:
```
class Tax {
    // Code goes here
}

class NJTax extends Tax {
    // Code goes here
}

let njTax = new NJTax();
```
### Super keyword & super function
- super function = gọi hàm constructor của thằng cha
- super keyword = gọi 1 hàm từ thằng cha.

```
class Tax {
  constructor(income) {
    this.income = income;
  }
  
  printTax() {
    console.log('Call print tax func from Tax class');
  }
  
  getMinTax() {
    return 123;
  }
}

class NJTax extends Tax {
  constructor(income, state) {
    super(income);
    this.state = state;
  }
  
  printStateTax() {
    console.log('Call printStateTax from NJTax class');
  }
  
  getMinTax() {
    const minTax = super.getMinTax();
    console.log('Call get minTax from NJTax class, got minTax from super: ' + minTax);
  }
}

const njTax = new NJTax(100, "NJ1");
njTax.printTax();
njTax.printStateTax();
njTax.getMinTax(); 
```

output got:
```
"Call print tax func from Tax class"
"Call printStateTax from NJTax class"
"Call get minTax from NJTax class, got minTax from super: 123"
```

### Static property
- Static property để share value giữa multiple INSTANCE.
- Các instance không lấy trực tiếp được value nhé, mà phải lấy thông qua 1 hàm.
- VD như này lấy được này:
```
class Simple {
  static counter = 0;
  
  printCounter() {
    console.log('Current counter value: ' + Simple.counter);
  }
}

const s1 = new Simple();
Simple.counter++;
s1.printCounter();

const s2 = new Simple();
Simple.counter++;
s2.printCounter(); 

console.log('On s1 instance: ' + s1.counter);
console.log('On s2 instance: ' + s2.counter);
console.log('On simple instance: ' + Simple.counter);
```

Output:
```
"Current counter value: 1"
"Current counter value: 2"
"On s1 instance: undefined"
"On s2 instance: undefined"
"On simple instance: 2"
```

### Static function
- Static function tương tự vậy, không gọi được từ các instance, vì nó không thuộc về instance, mà thuộc về class.

## Asynchronous processing
- Là dùng async, await
- Promise có 3 trạng thái:
    - Fullfilled: Operation successfully completed
    - Rejected:  Operfation failed and returned an error
    - Pending: Operation in progress, chưa reject cũng chưa fullfill

## Module