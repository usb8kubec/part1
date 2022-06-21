# I did todo app when study TDD course

# Run without docker-compose.yml:
  <!-- - docker build . -t usb9/ex2:ver2 -->
  <!-- - docker push usb9/ex2:ver2 -->

  - kubectl apply -f manifests/deployment.yaml
  - kubectl get pods
  - kubectl logs -f <pod>

# Connect from outside:
  - kubectl get po
  - kubectl port-forward <po> <3003:5000>
  - http://localhost:3003  <!-- Hello word --> 
  - But can see the content "Hello word".
  - >>> But Ex1.6 worked. The reason for this, may be that I use gcp insteads of localhost / my computer - is weak