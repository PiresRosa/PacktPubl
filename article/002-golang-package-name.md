> https://go.dev/blog/package-names

# Intro
- Go code được tổ chức theo các package. Trong cùng package, code có thể gọi tới nhau thoải mái, còn ngoài package thì những cháu nào export mới gọi được nhau.
- Tên package luôn nằm phía trước identifier, VD: muốn gọi tới Bar trong package foo, dùng `foo.Bar`
- Package name tốt thì giúp code ngon hơn.
    - Tên package thường mô tả context package dùng để làm gì, giúp client dễ sử dụng hơn.
    - Tên package cũng giúp maintainer dễ dàng xác định một identifier mới thuộc package nào (Kiểu thêm tính năng mới, tên giúp dễ định hình là thêm vào đâu hơn)
- [Effective Go](https://go.dev/doc/effective_go.html#names) cũng cung cấp cách đặt tên package cho xịn. Bài này nói về cách package name tệ, và cách để fix chúng.

# Package names
- Package name tốt thì ngắn và rõ ràng.
    - lowercase.
    - không phải under_score
    - không phải mixedCaps
- Thường đơn giản ntn:
    - `time`
    - `list`
    - `http`
- Package cũng có thể được viết tắt các tiền tố:
    - `strconv`
    - `syscall`
    - `fmt`
- Tuy nhiên, nếu viết tắt làm cho khó hiểu hoặc gây hiểu lầm ~> PLEASE DON'T DO IT.

# Naming package context
- Package name và content của chúng thường liên quan đến nhau. Khi thiết kế package, hãy đứng từ góc nhìn của người sử dụng.
- Tránh việc lặp lại:
    - package `http` rồi ~> chỉ cần đặt `Server` thôi, không cần đặt `HttpServer` (lúc gọi dùng `http.Server`, nghe cũng sáng phết rồi).
- Thường kiểu dữ liệu chính của package đặt theo convention: `pkg.Pkg`
    - VD: `time.Time`
- Dùng hàm `New()` sẽ trả về kiểu dữ liệu của `pkg.Pkg`
    - VD: `q := list.New()` return kiểu `*list.List`
- Thường nếu function trả về kiểu dữ liệu không trùng với tên package, thì trong tên function sẽ chứa kiểu dữ liệu ấy. VD:
```
d, err := time.ParseDuration("10s") // d có kiểu time.Duration
timer := time.NewTimer(d) // timer có kiểu `*time.Timer`
```

- Các kiểu dữ liệu ở các package khác nhau có thể trùng tên, VD: `jpeg.Reader`, `bufio.Reader`,... Việc này chả có vấn đề gì, vì có tên package phía trước rồi.

# Package path
- Package có thể chứa cả tên và path
```
import (
    "context"                // package context
    "fmt"                    // package fmt
    "golang.org/x/time/rate" // package rate
    "os/exec"                // package exec
)
```
- Với package path thì phần phần tử cuối cùng là tên package.
- Go map package theo thư mục, nằm ở dưới $GOPATH.
    - Ví dụ con vợ có đường dẫn là `github.com/user/hello` thì nó sẽ tìm ở `$GOPATH/github.com/user/hello`
- Các thư viện chuẩn thường chia các thư mục theo các giao thức và thuật tóan. VD: `crypto, container, encoding`.
    - Không có sự liên quan nào giữa các package cả. Chỉ là cách  tổ chức file thôi.
- Nếu import trùng nhau thì có thể rename lại
```
import (
    "runtime/pprof"
    netpprof "net/http/pprof"
)
```
- Lưu ý là naming lại cũng nên theo quy tắc ban đầu: lowercase, KHÔNG under_score, KHÔNG mixedCaps.

# Bad package name
- Tránh các package name như dbrr dạng: `util, common, misc`, người dùng sẽ đ' hiểu là bạn cung cấp gì ở đây cả. Càng ngày càng nhiều người đắp vào đây, và bùm... có ngay 1 đống hổ lốn vkl.

- Nếu gặp thì xử lý ntn?
- VD: 
```
package util
func NewStringSet(...string) map[string]bool {...}
func SortStringSet(map[string]bool) []string {...}
```

- Package trông có vẻ liên quan đến StringSet, nên đổi cmn package name về `stringset` có phải dễ hiểu hơn không?

```
package stringset
func New(...string) map[string]bool {...}
func Sort(map[string]bool) []string {...}
```
- Trông cũng tạm, mà chưa Gopher lắm. Tư duy ra thì nên sửa thế này:
    - Tạo 1 type StringSet
    - Hàm New trả về type mới
    - Hàm Sort đưa vào làm method cho type
```
package stringset
type Set map[string]bool
func New(...string) Set {...}
func (s Set) Sort() []string {...}
```
- Package name sẽ nói lên con người của bạn, sẽ mang lại vận mệnh, may mắn, tài lộc cho maintainer :v. Vì vậy, hãy đặt package name sáng vào.
- Đừng dùng package cho tòan bộ các APIs của bạn. VD đừng đặt package kiểu:
    - `api` cho tòan bộ api
    - `types` để lưu tòan bộ các type
    - `interaces` để lưư tòan bộ các interface.
    - ~> trông chán vl. Không Gopher tí nào.
- Tránh việc trùng với các package mặc định của Go. (VD: `io`, `http`)