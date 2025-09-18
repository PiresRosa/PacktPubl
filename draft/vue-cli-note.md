## Note vue cli

- @vue/cli-plugin-: built in plugin
- @vue/vue-cli-plugin: plugin được cộng đồng phát triển
- Khi run vue-cli-service => tự động resolve và load tất cả các cli plugin trong project của bạn vào file package.json của project.
- Dùng `vue add <package_name>` chỉ hỗ trợ đối với các package là plugin của vue thôi, các package khác thì cần dùng yarn hoặc npm để add
- Có thể vừa add vừa chạy command init được

```
vue add eslint --config airbnb --lintOn save
```

- Nếu plugin đã được install rồi => có thể dùng `vue invoke <param giống vue add>` để execute
- Mặc định thì sẽ đọc file package.json. Nhưng nếu thích có thể cho đọc từ folder khác bằng option "vuePlugins.resolveFrom":

```
{
    "vuePlugins": {
        "resolveFrom": ".config"
    }
}
```

