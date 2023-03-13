# Deployment instruction
Tested on Windows 10 Home (intel core i7-8750H).

## Prerequisites
- Windows with hyper-v enabled
- `kubectl` installed ([download](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/))
- `minikube` installed ([download](https://minikube.sigs.k8s.io/docs/start/))

## Start cluster
Open PowerShell as administrator and run following command:   
- `minikube start --driver=hyperv`  

All `minikube` commands should be run this way.

Minikube on hyper-v driver will start a cluster with a single node, whose IP's match.

## Apply Services
Apply service manifests first, running these commands from project root:  
- `kubectl apply -f backend-service.yaml`  
- `kubectl apply -f frontend-service.yaml`  

All `kubectl` commands can be run from any terminal.  

In minikube (hyper-v driver) cluster services can be accessed with `<NodeIP>`:`<NodePort>`.

## Apply Deployments
Next, apply deployment manifests with these commands:  
- `kubectl apply -f backend-deployment.yaml`  
- `kubectl apply -f frontend-deployment.yaml`  

It will run 2 pods with express-js app and 1 angular-js pod, based on docker images, 
which were built with corresponding Dockerfiles in *backend-expressjs* and *frontend-angular* folders.

## Summary
Now demo cluster is ready. You can access apps in browser, exposing services (`minikube service backend-service` and `minikube service frontend-service`) 
(redundant in hyper-v minikube) or open cluster dashboard (`minikube dashboard`).
