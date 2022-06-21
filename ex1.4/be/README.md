# I did it when study TDD course

# Run without docker-compose.yml:
  - docker build . -t usb9/ex2:ver2
  - docker push usb9/ex2:ver2

  - kubectl apply -f manifests/deployment.yaml
  - kubectl get pods
  - kubectl logs -f ex2-<string>