https://wanago.io/2020/07/06/api-nestjs-unit-tests/

# L1: Controller, routing & model structure
- Clone từ `git clone git@github.com:nestjs/typescript-starter.git`
- Nên bật 2 option của tsconfig.json lên:
+ `alwaysStrict`: đảm bảo rằng file được parse ở ECMAScript strict mode, bỏ 'use strict' cho các file
+ `noImplicitAny`: bắt buộc tất cả các function cần có type

- Controller handle request và trả response cho client.
- Nestjs dùng rất nhiều decorator (VD: @Controller). Hàng có sẵn rất nhiều thứ. Nên xài chứ đừng ngu mà viết chay.
- Trong controller truyền vào string. Cái này là router của module. VD module là post thì nên truyền vào:
```
Controller('post')
```
- 