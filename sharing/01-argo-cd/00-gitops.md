- Infrastructure as Code done right
# Infrastructure as Code
- Concept:
    - Define infrastructure as Code thay vì tạo manually.
    - Easy to reproduce
- Infrastructure không chỉ là infra, còn bao gồm:
    - Network as Code
    - Policy as Code
    - Configuration as Code
    - Security as Code
    - ...
-  Từ các file terraform, ansible, kubenetes configuration, yaml,... để build nên hệ thống.

# IaC wrong way
## 1. Not using Git
- Tạo file & test locally.

## 2. Using git, but not have review‌/approval process
- Push directly to main.
- Not define các quy trình:
    - pull request, review, approval, no collaboration, no automated test

## 3. Not apply the changes automatically
- kubectl apply ...
- terraform apply ...
- Everyone has access to infra.
- Hard to trace.

## 4. Kết luận
- Dù là IaC, nhưng vẫn có manual process

# IaC the right way
- Save all code in Git repository
- Procedure:
    - Create PR‌/ MR
    - Run CI Pipeline: Validate configuration files, run automation tests.
    - Approve changes: developer‌, security professional, engineer.
    - (2) và (3): tested và well reviewed.
    - Run CD pipeline: deployed to environment.
- -> kết luận: automated process, more transparent, quality IaC, collaboration, thing get tested.

# Push and pull model
## Push deployment
- Khi CD pipeline được trigger, sẽ build và deploy code lên môi trường.

## Pull deployment
- Có 1 agent được cài vào môi trường (VD: K8s cluster).
- Agent sẽ chủ động check xem state hiện tại trên môi trường và state mong muốn.
    - Nếu khác nhau, sẽ tự động sync.
- Phổ biến với model này có: ArgoCD, fluxCD, JenkinsX

# Benefit
- Easy rollback: dễ dàng back lại version cũ hơn
- Single source of truth: chỉ có 1 nơi 