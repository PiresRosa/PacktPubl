> https://go.dev/doc/toolchain

# Introduction
- Từ phiên bản Go 1.21, khi cài Go sẽ bao gồm cả Go toolchain.
- Command `go` sẽ bao gồm cả Go toolchain.
- Để dùng Go toolchain thì có thể set GOTOOLCHAIN env variable hoặc thêm dòng `toolchain` trong file go.mod, hay `go.work`.
- Trong config tiêu chuẩn, `go` command sử dụng phiên bản go thấp nhất là bằng phiên bản go cài đặt trong máy, hoặc trong file module hoặc workspace( CLGT?)
    - Ví dụ, khi dùng go command bundled với go 1.21.3 thì ở trong main module 1.21.0, thì `go` command sẽ dùng bản 1.21.3.
- Nếu go hoặc toolchain mới hơn bundled toolchain, `go` command sẽ sử dụng bản toolchain mới hơn này.
    - Ví dụ: go command bundled với Go 1.21.3, main module go 1.21.9 thì go command sẽ sử dụng Go 1.21.9
        - Đầu tiên, nó sẽ tìm trong PATH xem có bin nào là go1.21.9 không, nếu không có thì sẽ download và cache một bản copy của Go 1.21.9 lại.
- Automatic toolchain switching này có thể được disable đi, nhưng trong trừong hợp này, để tương thích ngược thì go command sẽ từ chối chạy trong các module hoặc workspace mà có go version cao hơn. Vì dòng `go` trong go.mod định nghĩa phiên bản go thấp nhất mà project hoặc module hoặc workspace cần.
- Các module thì phụ thuộc vào module khác. Module khác này có thể yêu cầu phiên bản Go thấp nhất thấp hơn the preferred toolchain. Trong trường hợp này, dòng `toolchain` trong file go.mod hoặc go.work sẽ được ưu tiên để quyết định sẽ dùng toolchain nào.
- Dòng `go` va `toolchain` có thể hiểu là chỉ ra phiên bản dependency nào cần cho Go toolchain, giống như trong `require` là chỉ ra version nào cho các thư viện.
- Dùng lệnh `go get go@latest` sẽ update phiên bản Go lên mới nhất.
```
➜  gotest go get go@latest                
go: updating go.mod requires go >= 1.22.3; switching to go1.22.3
go: downloading go1.22.3 (linux/amd64)
```
- Nếu dùng GOTOOLCHAIN variable thì sẽ ghi đè các setting khác
```bash
GOTOOLCHAIN=go1.21rc3 go test
```

# Go versions
- Các version của Go sử dụng cú pháp `1.N.P` để biểu thị phiên bản thứ P của Go 1.N.
    - Phiên bản khởi tạo đầu tiên thường là 1.N.0 và các phiên bản sau này như 1.N.9 gọi là phiên bản vá lỗi.
- Go `1.N` release trước bản `1.N.0` có cú pháp là `1.NrcR`. VD phiên bản 1.23.0 thì dạng pre-release sẽ là 1.23rc1.
- Cú pháp 1.N được goi là "language version" hay phiên bản ngôn ngữ. Đại khái anh em hay hỏi nhau: hey, dùng Go bao nhiêu đấy?; Tao dùng Go 1.13.
- 1.21 < 1.21rc1 < 1.21rc2 < 1.21.0 < 1.21.1 < 1.21.2.
- 1.20rc1 < 1.20rc2 < 1.20rc3 < 1.20 < 1.20.1.
- 1.18beta1 < 1.18beta2 < 1.18rc1 < 1.18 < 1.18.1.

# Go toolchain names
- Đại khái là `goV`, trong đó V là version.
    - Ví dụ: go1.21rc1, go1.21.0, go1.19
- Nếu có custom thì sẽ là `goV-suffix`
    - VD: `go1.21.0-custom`

# Module và workspace configuration
- Go module và workspace định nghĩa tên phiên bản trong file go.mod và go.work.
- Dòng go định nghĩa phiên bản thấp nhất cho Go version sử dụng trong module hay workspace.
- Để tương thích tốt, nếu dòng go bị lược bỏ trong file go.mod thì go sẽ ở version 1.16, và dòng go bị lược bỏ trong file go.work thì go sẽ ở version 1.18 (kiểu version thấp nhất mà go.mod hay go.work support).
- Dòng toolchain khai báo một phiên bản khuyên dùng cho module hay workspace. 
- Nếu không có dòng toolchain thì go sẽ chạy phiên bản go định nghĩa ở dòng `go`.
- 