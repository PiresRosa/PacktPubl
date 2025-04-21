- error_log stderr notice and daemon off lets our server run in the foreground (?) và log ra console. Điều này tốt khi dev. Nhưng khi lên production thì nên tắt đi.
- lua_code_cache => dev thì nên tắt đi, để các module được load lại sau mỗi request.
- Chạy lệnh `lapis server` sẽ tự tìm openresty và start server lên. 
  Lapis sẽ tự động tìm openresty bin trong các folder sau:

```
"/usr/local/openresty/nginx/sbin/"
"/usr/local/opt/openresty/bin/"
"/usr/sbin/"
""
```
> Lưu ý: Phải là bin của openresty nha. Bin của nginx không được đâu.
- Để dừng lại thì dùng lệnh `lapis term`
- Để watch change các file .moon tự compile sang .lua => dùng `moonc -w`. Tuy nhiên chỉ watch file cũ thôi, file mới thì cần chạy lại.


### Ưu tiên của router (từ cao -> thấp)
- Chính xác: "/hello/world"
- Biến: "/hello/:world"
  + Mỗi biến sẽ làm giảm độ ưu tiên của router
  + VD: (1) "/hello/:world" và (2) "/hello/:world/:hihi" thì thằng số 1 sẽ được ưu tiên hơn.
- Tất cả (hay là dùng dấu *): "/hello/*"
  + Mỗi dấu "*" sẽ làm tăng độ ưu tiên của router.
  + VD: (1) "/hello/*world" và (2) "/hello/*world/*hihi" thì (2) sẽ có độ ưu tiên cao hơn.
