# Application types
- https://open.larksuite.com/document/home/app-types-introduction/overview
- Có 2 loại;
  - Custom app: app phát triển riêng cho doanh nghiệp, không cần Lark approve, chỉ cần workspace owner approve là được.
  - Store app: app phát triển bởi bên thứ 3, publish được lên App directory, cần Lark duyệt

# Application capabilities

## Bot
- Interact với user thông qua conversation.
- Lark bots có thể tích hợp với Lark applications khác như: Calendar, Approval, Docs,..
- Có thể dùng để gửi noti, alarm reminder,...

## Lợi ích của bot
- Embedded experience
- Relatively low development cost.
- Support nhiều dạng message type.
- Support rich server-side capabilities.

## Một số loại bot
- App Bot
  - Cần tenant admin approve
  - Dùng trong trừong hợp tích hợp system bên ngoài vào Lark, dùng để tương tác và quản lý các group.
  - Quy trình phát triển: tạo app bot, hòan thiện server side development, tenant admin approve.
  - Các dùng: Sau khi published, user có thể search bot, add bot vào group chat.
  - Availability scope: chỉ trong nội bộ, không add được vào group bên ngoài.
- Custom bot
  - Chỉ gửi được message 1 chiều vào group chat (có vẻ giống chỉ để thông báo);
    - Không gọi được API Lark nhiều.
  - Quy trình phát triển: Tạo bot vào thẳng group, không cần admin approve.
  - Cách dùng: gọi webhook của bot.
  - Availability scope: không chat riêng với user được. Nhưng có thể dùng ở các group bên ngoài tenant.

# Web app

# Next
https://open.larksuite.com/document/home/introduction-to-scope-and-authorization/overview
