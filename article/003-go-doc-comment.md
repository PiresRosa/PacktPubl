> https://tip.golang.org/doc/comment
- Doc commment là các comments xuất hiện ở trước tên package, type, const, func, var; sát luôn, không có dòng trống nào ở giữa cả.
- Tất cả các exported identifier đều nên có doc comments hết.
- [go/doc](https://tip.golang.org/pkg/go/doc) và [go/doc/comment](https://tip.golang.org/pkg/go/doc/comment) giúp extract document từ Go source code.
- Trang pkg.go.dev show documentation cho các public Go packages. Trang này dùng package golang.org/x/pkgsite/cmd/pkgsite, bạn có thể dùng để run locally cho private module cũng được.
- Bài này nói về cách bạn viết Go doc comments.

# Packages
- Tất cả các package nên có package comment để giới thiệu package một cách tổng thể: mục đích làm gì, cung cấp cái gì.
  - Package to thì nên nói về các phần quan trọng nhất, link đến doc comment khác nếu cần.
- Package có nhiều file thì nên comment ở 1 file thôi. Nếu comment ở nhiều file thì Go sẽ nối các comment vào.

# Commands
- Command thì nên mô tả cách dùng của command.
```
/*
Gofmt formats Go programs.
It uses tabs for indentation and blanks for alignment.
Alignment assumes that an editor is using a fixed-width font.

Without an explicit path, it processes the standard input. Given a file,
it operates on that file; given a directory, it operates on all .go files in
that directory, recursively. (Files starting with a period are ignored.)
By default, gofmt prints the reformatted sources to standard output.

Usage:

    gofmt [flags] [path ...]

The flags are:

    -d
        Do not print reformatted sources to standard output.
        If a file's formatting is different than gofmt's, print diffs
        to standard output.
    -w
        Do not print reformatted sources to standard output.
        If a file's formatting is different from gofmt's, overwrite it
        with gofmt's version. If an error occurred during overwriting,
        the original file is restored from an automatic backup.

When gofmt reads from standard input, it accepts either a full Go program
or a program fragment. A program fragment must be a syntactically
valid declaration list, statement list, or expression. When formatting
such a fragment, gofmt preserves leading indentation as well as leading
and trailing spaces, so that individual sections of a Go program can be
formatted by piping them through gofmt.
*/
package main
```
- Viết comment nên viết kiểu [Sematic linefeeds](), hay hiểu đơn giản là mỗi ý trên 1 dòng. Viết kiểu này sẽ dễ maintain hơn.

# Types
- Comment type thì comment đơn giản thôi. VD:
```
package zip

// A Reader serves content from a ZIP archive.
type Reader struct {
    ...
}
```
- Bình thường 1 type chỉ nên làm việc với 1 go routines, tức là đa luồng là ăn shit. Nếu type của bạn ngầu hơn kiểu đa luồng safe thì vui lòng comment vào để người dùng biết.
```
package bytes

// A Buffer is a variable-sized buffer of bytes with Read and Write methods.
// The zero value for Buffer is an empty buffer ready to use.
type Buffer struct {
    ...
}
```

- Nếu mà struct có exported field thì hoàn toàn có thể comment ở các field exported cho tường minh nữa.
```
package io

// A LimitedReader reads from R but limits the amount of
// data returned to just N bytes. Each call to Read
// updates N to reflect the new amount remaining.
// Read returns EOF when N <= 0.
type LimitedReader struct {
    R   Reader // underlying reader
    N   int64  // max bytes remaining
}
```
# Funcs
- Function comment nên giải thích là return cái gì, làm gì.
```
package strconv

// Quote returns a double-quoted Go string literal representing s.
// The returned string uses Go escape sequences (\t, \n, \xFF, \u0100)
// for control characters and non-printable characters as defined by IsPrint.
func Quote(s string) string {
    ...
}
```
- Function return boolean thì hay dùng cụm từ "reports whether"
```
package strings

// HasPrefix reports whether the string s begins with prefix.
func HasPrefix(s, prefix string) bool
```
- Nếu 1 doc comments cần giải thích nhiều kết quả (kiểu hàm trả về nhiều kết quả), có thể đặt tên cho thằng trả về. Giúp dễ hình dung hơn, dù cái tên có thể không được mention trong comment đi nữa.
  - Đoạn này có vẻ khó hiểu. Hình dung đơn giản là: đặt tên biến cho thằng trả về. Ở ví dụ dưới là `n` với `err`.
```
package io

// Copy copies from src to dst until either EOF is reached
// on src or an error occurs. It returns the total number of bytes
// written and the first error encountered while copying, if any.
//
// A successful Copy returns err == nil, not err == EOF.
// Because Copy is defined to read from src until EOF, it does
// not treat an EOF from Read as an error to be reported.
func Copy(dst Writer, src Reader) (n int64, err error) {
    ...
}
```
- Ngược lại thì không nên đặt tên biến cho giá trị trả về.
- Áp dụng luôn cho cả func và method.
  - Tiện nhắc luôn: method nên dùng cùng receiver name cho đồng bộ nhé.
- Với các func return giá trị đặc biệt thì cũng nên comments vào

```
package math

// Sqrt returns the square root of x.
//
// Special cases are:
//
//  Sqrt(+Inf) = +Inf
//  Sqrt(±0) = ±0
//  Sqrt(x < 0) = NaN
//  Sqrt(NaN) = NaN
func Sqrt(x float64) float64 {
    ...
}
```
- Funcs comments cũng không nên đi sâu vào việc thuật toán implement thế nào. Phần này hợp lí nhất là comment phía trong body của function. Nếu có thì chỉ nên comment về giới hạn thời gian, không gian thôi nha.
```
package sort

// Sort sorts data in ascending order as determined by the Less method.
// It makes one call to data.Len to determine n and O(n*log(n)) calls to
// data.Less and data.Swap. The sort is not guaranteed to be stable.
func Sort(data Interface) {
    ...
}
```
# Consts
- Go cho phép khai báo cả 1 group các const. Nên bạn có thể comment đại diện cho cả group cũng được.
```
package scanner // import "text/scanner"

// The result of Scan is one of these tokens or a Unicode character.
const (
    EOF = -(iota + 1)
    Ident
    Int
    Float
    Char
    ...
)
```

- Cũng có trường hợp không cần comment đại diện, mà cần comment chi tiết vào từng cháu một.
```
package scanner // import "text/scanner"

// The result of Scan is one of these tokens or a Unicode character.
const (
    EOF = -(iota + 1)
    Ident
    Int
    Float
    Char
    ...
)
```

- Typed constant thì thường đi theo type declaration luôn, nên ko cần comment cho group đại diện, mà chỉ comment cho từng const néu cần thôi.

```
package syntax

// An Op is a single regular expression operator.
type Op uint8

const (
    OpNoMatch        Op = 1 + iota // matches no strings
    OpEmptyMatch                   // matches empty string
    OpLiteral                      // matches Runes sequence
    OpCharClass                    // matches Runes interpreted as range pair list
    OpAnyCharNotNL                 // matches any character except newline
    ...
)
```

# Vars
- Quy ước giống const.

# Syntax
- Dùng markdown, simple.
- gofmt sẽ format doc comment trước.
- directive comments (VD: `//go:generate`) sẽ không được tính là doc comment và sẽ bị loại bỏ khỏi rendered documentation.
- gofmt cũng sẽ xoá các leading, trailing blank lines đi.

## Paragraphs
- gofmt không ngắt dòng (wrap text).

## Headings
- Dùng kí tự (#) để biểu thị
- Không được thụt lề, cách dòng phía trên bởi 1 dòng trống
```
// Package strconv implements conversions to and from string representations
// of basic data types.
//
// # Numeric Conversions
//
// The most common numeric conversions are [Atoi] (string to int) and [Itoa] (int to string).
...
package strconv
---

// #This is not a heading, because there is no space.
//
// # This is not a heading,
// # because it is multiple lines.
//
// # This is not a heading,
// because it is also multiple lines.
//
// The next paragraph is not a heading, because there is no additional text:
//
// #
//
// In the middle of a span of non-blank lines,
// # this is not a heading either.
//
//     # This is not a heading, because it is indented.
```

## Links
- Giống markdown

## Doc links
- Dùng dạng `[Name1]` hoặc `[pkg.Name1]`

## Lists
- Giống markdown

## Code block
- Sau dấu :, lùi vào 1 dấu cách

```
package sort

// Search uses binary search...
//
// As a more whimsical example, this program guesses your number:
//
//  func GuessingGame() {
//      var s string
//      fmt.Printf("Pick an integer from 0 to 100.\n")
//      answer := sort.Search(100, func(i int) bool {
//          fmt.Printf("Is your number <= %d? ", i)
//          fmt.Scanf("%s", &s)
//          return s != "" && s[0] == 'y'
//      })
//      fmt.Printf("Your number is %d.\n", answer)
//  }
func Search(n int, f func(int) bool) int {
    ...
}
```
