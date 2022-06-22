# Ref: https://github.com/kubernetes-hy/material-example/tree/master/app3
  - Solving file images: read, write, delete

# How to use:
  - (set chown -R <hieu>:root <dir>)
  - sudo su
  - kubectl delete -f manifests/ (At old right directory >>> Remove: old dep, service, ingress)

  - docker build . -t usb9/pingpong:ver1.11
  - docker push usb9/pingpong:ver1.11

  - docker build . -t usb9/logoutput:ver1.11
  - docker push usb9/logoutput:ver1.11

  - kubectl apply -f manifests/
  - kubectl get svc,ing
  - kubectl delete -f manifests/