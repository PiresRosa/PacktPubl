> https://docs.github.com/en/actions/about-github-actions/about-continuous-integration-with-github-actions

- Bạn có thể tạo custom continuos workflow ngay trong GitHub repository với GitHub Actions.

# Về CI
- CI là một software practice, khi bạn commit code lên thì chạy test hoặc check để bạn phát hiện sớm ra các lỗi của mình.
- Để chạy được test, check thì cần có server. Bạn có thể chạy local hoặc chạy trên CI server.

# Về CI sử dụng GitHub Actions
- GitHub action có sẵn hosted-runner hoặc bạn có thể tự cài self-hosted runner. 
- Khi CI chạy, bạn sẽ dễ dàng quan sát là chages của bạn có làm gì fail ko.
- GitHub có sẵn rất nhiều template. Bạn có thể extend và viết thêm theo nhu cầu: https://github.com/actions/starter-workflows/tree/main/ci