> https://wanago.io/2020/04/06/geeky-with-git-remotes-upstream-branches/

# 1.Remotes and upstream branches
- `-u` là set up stream

# 2.Building block of commit
- Git có 3 vùng: Working directory, Staging, Repository
- Khi dùng lệnh `git commit` ~> git sẽ tạo 1 snapshot của repo tại thời điểm commit.
- Git coi data là 1 stream của snapshots
- 1 repository là 1 collection của objects
- object được sinh ra bằng cách hash content của nó
    - dùng SHA-1 hash function. Khi tính tóan hash của file, nó thêm prefix bao gồm length và object type vào
```
printf "blob 0\0" | shasum
```
- Như VD trên thì bao gồm:
    - type: blob
    - length: 0
    - content: rỗng
- Đọc thêm:
    - Git merge mutiple object thành 1 file gọi là [packfiles](https://git-scm.com/book/en/v2/Git-Internals-Packfiles), một article hay nữa [ở đây](http://alblue.bandlem.com/2011/09/git-tip-of-week-objects-and-packfiles.html)
    - Tracking big binary file cũng khá tốn storage, vì thế mà extension [Git Large File Storage] tồn tại

## Tree object
- Loại object quan trọng thứ 2 đó là tree. Nó cho phép lưu trữ nhiều file cùng lúc.
- 