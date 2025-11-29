Đại khái là import data từ 1 source nào đó vào con graphQL local, sau đó ở code vue lấy data ra generate ra file tĩnh HTML

# Core concept
- Pages = file-base routing, nằm trong thư mục `src/pages`. VD:
    - `src/pages/About.vue` -> `website.com/about`
- Collections: Chứa blog post, tags, products. Đọc data từ nguồn như headless cms, content API, markdown file bằng `source plugin` hoặc `data store api`.
- Templates: nằm trong folder `src/templates`
- Layouts
- Images
- Linking (?)

# Fast by default
- Pre-render HTML

- Automatic code spliting
- Follow PRPL Pattern
- Smartlink prefetching
- Progressive images
- Vue.js SPA

...

# Basic gridsome
## Directory structure
```
.
├── package.json
├── gridsome.config.js
├── gridsome.server.js
├── static/
└── src/
    ├── main.js
    ├── index.html
    ├── App.vue
    ├── layouts/
    │   └── Default.vue
    ├── pages/
    │   ├── Index.vue
    │   └── Blog.vue
    └── templates/
        └── BlogPost.vue
```
- `src/pages/Index.vue` => homepage
