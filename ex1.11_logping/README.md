# Ref: https://github.com/kubernetes-hy/material-example/tree/master/app3
  - Solving file images: read, write, delete

# How to use:
  - (TODO: ==> DONE:)
  - (Create both a PersistentVolume and PersistentVolumeClaim and alter the Deployment to utilize it)

  - sudo su
  - (set chown -R <hieu>:root <dir>)
  - kubectl delete -f manifests/ (At old right directory >>> Remove: old dep, service, ingress)

  - NOTE (for persitent vol): docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube
  - docker build . -t usb9/pingpong:1.11.8
  - docker push usb9/pingpong:1.11.8
  
  - docker build . -t usb9/logoutput:1.11.8
  - docker push usb9/logoutput:1.11.8

  - kubectl apply -f manifests/
  - kubectl get svc,ing
  - kubectl delete -f manifests/
  - kubectl apply -f manifests/

  <!-- ----------------- FIX BUG EXAMPLE ------------------ -->
  kubectl get svc,ing
  kubectl get po
  kubectl logs <po>

  cd logoutput
  nano index.js
  docker build . -t usb9/logoutput:ver3
  docker push usb9/logoutput:ver3

  cd ..
  nano manifests/deployment.yaml
  kubectl apply -f manifests/deployment.yaml
  kubectl delete -f manifests/deployment.yaml