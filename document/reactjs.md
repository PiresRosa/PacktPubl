> Learn reactjs from F8 channel
- [Link](https://www.youtube.com/watch?v=x0fSBAgBrOQ&list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q&ab_channel=F8Official)

## Bài 1: ReactJs && why react
- *Thư viện* Javascript
- Why react:
    - Độ hot, có tương lai, cộng đồng lớn
    - Thân thiện SEO
    - Khả năng mở rộng tốt, tái sử dụng cao
    - Phát triển nhanh chóng
    - Khả năng tương thích ngược: update version ít lỗi

## Bài 2: SPA/MPA là gì?
- SPA: Single Page Application
- MPA: Multiple Page Application
- So sánh:
    - SPA ngược với MPA
    - Tốc độ: SPA nhanh hơn do ko cần load lại
    - SEO: SPA ko thân thiện bằng MPA.
    - UX: Trải nghiệm của SPA tốt hơn.
    - Phát triển: SPA dễ tách component, chia BE & FE riêng biệt.
    - Tải: SPA đỡ tốn hơn do render phía client.
- Khi nào, dùng gì:
    - MPA: Khi viết landing đơn giản, ko phát triển trong tương lại; chi phí thấp
    - SPA: Khi ứng dụng phức tạp

## Bài 3: Arrow function
- Js có 3 loại function:
    - Function declaration: kiểu khai báo function có tên tuổi đàng hoàng
    ```
    function logger(msg){ ... }
    ```
    - Function expression: kiểu khai báo function gán vào 1 biến
    ```
    const logger = function(msg) { ... }
    ```
    - Arrow function: bỏ function ở function expression đi, thêm mũi tên là xong.
    ```
    const logger = (msg) => { ... }
    ```
- Trick: khi dùng arrow function, muốn return object thì thêm cái ngoặc tròn bao ngoài vào
```
const sum = (a, b) => ({a: a, b: b});
```
- Khác nhau giữa arrow function và declaration function:
    - Arrow function không có context => dùng this bị undefined.
    - AF không thể dùng để tạo constructor.

## Bài 4: Module trong ES6
- Để dùng module thì thẻ script cần có `type="module"`
- Export default thì khi import viết bình thường
```
function logger(){...}
export default logger;

import logger from './logger.js'
```
- Export ko có default => lúc import cần spread ra hoặc thêm * as
```
export const TYPE_LOG = 'log';
export const TYPE_WARN = 'warn';

import { TYPE_LOG, TYPE_WARN } from './constants.js';
//or
import * as constants from './constants.js';
```
- Viết tắt export:
    - Thông thường viết:
    ```
    import logger from './logger.js';
    export default logger;
    ```
    - Có thể viết gọn lại:
    ```
    export { default } from './logger.js'
    ```

## Bài 5: Enhanced object literals
- Dùng dể định nghĩa key cho object ngắn gọn (mà k nên dùng cách này)
```
// Thay vì viết:
const number = 10;
const obj = {
    number: number
};

// có thể viết gọn
const number = 10;
const obj = {
    number,
};
```

- Dùng để định nghĩa function cho ngắn gọn
```
// thay vì viết:
const obj = {
    getName: function() {
        return 'Phong';
    }
};

// có thể viết gọn
const obj = {
    getName() {
        return 'Phong';
    }
};
```
- Định nghĩa key, value cho object dưới dạng biến
```
const fieldName = 'name';
const fieldAge = 'age';

const obj = {
    [fieldName]: 'Phong',
    [fieldAge]: 99,
};

console.log(obj); // {name: 'Phong', age: 99}
```
## Bài 6: Spread
- Ôn tập về destructuring
