> https://go.dev/blog/context-and-structs

# Contexts and Structs
- Context giúp bạn control được code flow: truyền dữ liệu, thêm deadline, cancel từ phía caller, pass value giữa nhiều process,...
- Bài viết này làm rõ quan điểm: Context không nên lưu vào struct mà nên pass vào hàm thành parameter.
    - Bài viết cũng nói khi nào lưu vào struct thì hợp lí.
- Bài này chắc viết ngắn gọn thôi.

# Context nên pass theo kiểu argument
- Anh em hiểu thế này cho đơn giản: struct thì chỉ có 1 thôi. Nếu pass vào struct mà có nhiều request thì không biết quản lý context kiểu gì. Ghi đè? Hay tạo ra list để quản lý?
- Đây là kiểu pass context theo param:
```golang
// Worker fetches and adds works to a remote work orchestration server.
type Worker struct { /* … */ }

type Work struct { /* … */ }

func New() *Worker {
  return &Worker{}
}

func (w *Worker) Fetch(ctx context.Context) (*Work, error) {
  _ = ctx // A per-call ctx is used for cancellation, deadlines, and metadata.
}

func (w *Worker) Process(ctx context.Context, work *Work) error {
  _ = ctx // A per-call ctx is used for cancellation, deadlines, and metadata.
}
```
- Đây là pass kiểu struct
```golang
type Worker struct {
  ctx context.Context
}

func New(ctx context.Context) *Worker {
  return &Worker{ctx: ctx}
}

func (w *Worker) Fetch() (*Work, error) {
  _ = w.ctx // A shared w.ctx is used for cancellation, deadlines, and metadata.
}

func (w *Worker) Process(work *Work) error {
  _ = w.ctx // A shared w.ctx is used for cancellation, deadlines, and metadata.
}
```
- Nhìn ví dụ trên, giả sử hai func `Fetch` và `Process` muốn có metadata, deadlines khác nhau thì không biết setup kiểu gì luôn.
- Còn ở ví dụ với pass context as parameter thì thoải mái, vì pass riêng lẻ rùi.

# Pass context vào struct: để maintain code cũ
- Khi Go 1.7 ra đời, giới thiệu về Context.
- Lúc này thì thư viện đã khá to và nhiều hàm rồi.
- Vì vậy nên Go chọn cách thêm context vào struct để backward compatibility (tương thích ngược) với các phiên bản cũ.
    - Hiểu đơn giản thì nếu ae thêm vào hàm 1 tham số ~> tất cả code đã dùng hàm này trước đó phải thêm tham số vào.
- VD hàm của net/http package
```golang
// Do sends an HTTP request and returns an HTTP response [...]
func (c *Client) Do(req *Request) (*Response, error)
```
- Nếu làm theo kiểu pass as parameter thì phải sửa lại hàm Do như này:
```golang
// Do sends an HTTP request and returns an HTTP response [...]
func (c *Client) Do(ctx context.Context, req *Request) (*Response, error)
```
- Nghe không giòn lắm, phải sửa lại hết code mất. Nên team Go sửa lại thế này:
```golang
// A Request represents an HTTP request received by a server or to be sent by a client.
// ...
type Request struct {
  ctx context.Context

  // ...
}

// NewRequestWithContext returns a new Request given a method, URL, and optional
// body.
// [...]
// The given ctx is used for the lifetime of the Request.
func NewRequestWithContext(ctx context.Context, method, url string, body io.Reader) (*Request, error) {
  // Simplified for brevity of this article.
  return &Request{
    ctx: ctx,
    // ...
  }
}

// Do sends an HTTP request and returns an HTTP response [...]
func (c *Client) Do(req *Request) (*Response, error)
```
- Chú ý là hàm New cũ giữ nguyên, thêm mới nguyên con hàm `NewRequestWithContext`.
- Đây là do tác giả chọn việc thêm vào struct. Nếu không ngại thì bạn hòan tòan có thể duplication function ra, trông như này:
```golang
// Call uses context.Background internally; to specify the context, use
// CallContext.
func (c *Client) Call() error {
  return c.CallContext(context.Background())
}

func (c *Client) CallContext(ctx context.Context) error {
  // ...
}
```

# Kết luận
- Ngắn gọn: khi design API, chú ý pass context as parameter nhé anh em ;)