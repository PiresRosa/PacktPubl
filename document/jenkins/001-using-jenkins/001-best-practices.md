# Best practices
- Continuous Integration (CI) với automated test execution đã làm thay đổi cách mà các công ty quản lý build, quản lý release, quản lý deployment và điều phối test.
- Trong section này,chúng ta cùng explore các best practices khi sử dụng Jenkins để quản lý project.

# Automated job definition
- Jenkins có khả năng tạo, update, delete jobs dựa trên repository.
- Tận dụng tính năng này và optimize cách quản lý job của bạn bằng cách cấu trúc các job definition theo cách có thể tận dụng được tối đa các lợi ích mà Jenkins cung cấp cho job management.
- Có vài cách:
    - Sử dụng organization folders (prefer)
    - Sử dụng multibranch Pipelines
    - Sử dụng Pipeline.

## Sử dụng organization folders
### GitHub
- Vào git, tạo application mới.
- Sau khi có app, tạo secret key cho app. 
- Down key về và convert sang format:
```
openssl pkcs8 -topk8 -inform PEM -outform PEM -in jenkins-github.private-key.pem -out converted-github-app.pem -nocrypt
```
- Vào Jenkins, Global credentials, thêm cái key GitHub vừa convert vào.
- Tạo project mới, chọn GitHub organization, connect credential vào, scan project là ra.
- Tiến hành thêm Jenkinsfile đầu tiên:
```
pipeline {
    agent {label "linux"}
    stages {
        stage('Hello') {
            steps {
                echo "hello from Jenkinsfile"
            }
        }
    }
}
```
- Có thể thêm filter:

```
pipeline {
    agent {label "linux"}
    stages {
        stage('Hello') {
            steps {
                echo "hello from jenkinsfile'
            }
        }
        stage('for the fix branch') {
            when {
                branch 'fix-*'
            }
            steps {
                sh '''
                    cat README.md
                '''
            }
        }
        stage('for the PR') {
            when {
                branch 'PR-*'
            }
            steps {
                echo 'this only runs for the PRs'
            }
        }
    }
}
```
- Mỗi lần thêm nhánh, xóa nhánh, có thể chọn scan repository now để update hiển thị.
- Trong project setting, có thể cấu hình nhiều Jenkinsfile (cho nhiều repo):
    - Ví dụ: repo1 có Jenkinsfile, repo2 có Jenkinsfile-m2
    - Truờng hợp repo có cả 2 Jenkinsfile match với điều kiện -> ưu tiên lấy theo nội dung file phía trên trước.