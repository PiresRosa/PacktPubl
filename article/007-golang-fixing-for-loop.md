> https://go.dev/blog/loopvar-preview
# For-loop trap
- Đầu tiên, cần tìm hiểu xem for-loop trap là gì.
- Xét đoạn code thế này:

```golang
func main() {
	done := make(chan bool)

	values := []string{"a", "b", "c"}
	for _, v := range values {
		go func() {
			fmt.Println(v)
			done <- true
		}()
	}

	// wait for all goroutines to complete before exiting
	for _ = range values {
		<-done
	}
}
```

- Run thử thì thấy output sẽ luôn là
```golang
c
c
c

```
- Về cơ bản thì đây là một lỗi đến từ việc phạm vi hoạt động của biến:
    - Biến v có scope là `block`, tức là nằm bên trong cặp ngoặc của vòng for.
    - Mỗi lần vòng lặp quay lại, biến được gán thành giá trị tiếp theo.
    - Trong vòng lặp tạo ra goroutine mới ~> gần như vòng lặp đấy sẽ xong ngay lúc gọi ~> vòng lặp quay lại, `v` được gán giá trị mới.
    - Lúc goroutine chạy, sẽ lấy giá trị của biến v hiện tại ~> sẽ luôn là `c`
- Nghe lằng nhằng nhỉ. Tóm lại cho vòng for chạy nhanh quá, chạy mịa tới cuối rồi. Lúc goroutine chạy thì pick giá trị cuối này, thế là chỉ in ra giá trị cuối.

# Fix
Ở phiên bản cũ thì có 2 cách fix:
- Pass kiểu parameter cho anonymous function
```golang
func main() {
	done := make(chan bool)

	values := []string{"a", "b", "c"}
	for _, v := range values {
		go func(v string) {
			fmt.Println(v)
			done <- true
		}(v)
	}

	// wait for all goroutines to complete before exiting
	for _ = range values {
		<-done
	}
}
```
- Khai báo 1 biến local `v`
```golang
func main() {
	done := make(chan bool)

	values := []string{"a", "b", "c"}
	for _, v := range values {
		v := v
		go func() {
			fmt.Println(v)
			done <- true
		}()
	}

	// wait for all goroutines to complete before exiting
	for _ = range values {
		<-done
	}
}
```

- Ở phiên bản mới thì bạn cứ code như bình thường. Scope các biến sẽ được chuyển thành mỗi lần lặp, thay vì mỗi vòng lặp như trước đây.