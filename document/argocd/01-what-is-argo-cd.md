> https://argo-cd.readthedocs.io/en/stable/#what-is-argo-cd

# Basic
- ArgoCD là một declerative continuous delivery tool cho Kubernetes.
- Tại sao dùng Argo CD?
    - Declarative: dễ triển khai (automated), dễ hiểu.
    - Git: quản lý dễ dàng, auditable.
- Bắt đầu với ArgoCD
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

# How it work
- ArgoCD sử dụng GitOps pattern, coi Git là nơi tin tưởng và lưu trữ trạng thái ứng dụng mong muốn.
- Kubernetes manifest có thể được định nghĩa theo một vài kiểu:
    - kustomize application
    - helm charts
    - jsonnet files
    - file YAML hoặc JSON.
    - Bất cứ custom config management tool nào
- ArgoCD tự động deploy ứng dụng tới môi trường mong muốn.
- Application deployment có thể được track thông qua branches, tags hoặc một phiên bản cụ thể.

# Architecture
![ArgoCD architecture](https://argo-cd.readthedocs.io/en/stable/assets/argocd_architecture.png)
- ArgoCD được implement như một kubernetes controller, so sánh state của ứng dụng hiện tại và state mong muốn.
- Nếu state khác nhau, ta gọi là `OutOfSync`
- ArgoCD report và visualize sự khác biệt, cung cấp các tools để sync automatic và sync manually.

# Một số features
- Tự động deploy ứng dụng tới môi trường cụ thể.
- Support nhiều định dạng configuration template‌/tools: Kustomize, Helm, Jsonnet, plain-YAML
- Có khả năng quản lý, deploy nhiều cluster.
- SSO integration.
- Multi-tenant và RBAC policies để xác thực.
- Rollback dễ dàng đến bất kì phiên bản nào.
- Phân tích tình trạng và application resources.
- Phát hiện các cấu hình thay đổi không mong muốn và visualize chúng.
- Auto hoặc manual sync application state.
- Web UI để monitor real-time
- CLI để automation và CI integration.
- Webhook integration
- Access token cho automation.
- PreSync, Sync, PostSync hooks để support các ứng dụng phức tạp.
- Audit trails cho ứng dụng như events và API calls.
- Prometheus metrics
- Parameter overrides cho overriding helm parameters in Git.
