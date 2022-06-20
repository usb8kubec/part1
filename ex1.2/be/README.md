# I did it when study TDD course

# Run without docker-compose.yml:
  - docker build . -t ex2
  - docker run -p 5000:5000 ex2
  - docker tag ex2 usb9/ex2
  - docker push usb9/ex2

  - kubectl create deployment ex2 --image=usb9/ex2
  - kubectl get pods
  - kubectl logs -f ex2-<string>