# Viết test
- Tạo file `.spec.ts`
  - Lưu ý, file đuôi khác không hoạt động được.
- Test được viết theo cú pháp

```typescript
import { test } from '@playwright/test';

test('<tiêu đề test>', async ({ page }) => {
  // Nội dung test
});
```
- Để nhóm các test lại với nhau, dùng `describe`
```typescript
import { test } from '@playwright/test';

test.describe('<tên nhóm>', () => {
  test('test 1', async ({ page }) => {
    
  });

  test('test 2', async ({ page }) => {
   
  });

  test('test 3', async ({ page }) => {
    
  });
});
```

# Sử dụng hooks (setup và teardown)
- `beforeEach`: chạy trước khi test chạy
- `afterEach`: chạy sau khi test chạy
- `beforeAll`: chạy trước khi tất cả các test chạy
- `afterAll`: chạy sau khi tất cả các test chạy

# Fixture: `page`
Fixture `page` dùng để:
- Truy cập vào trang web (`goto`)
- Tải lại trang (`reload`)
- Tìm đến phần từ (`locator`)

# Tương tác với phần tử
Từ locator, có thể tương tác với phần tử qua nhiều cách:
- fill
- click
- press
- check
- select

# Assertion
- https://playwright.dev/docs/test-assertions