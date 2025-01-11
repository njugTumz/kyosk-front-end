# Book List App

This project is a simple book list application built using **Next.js** and **TypeScript**. The app displays a static list of books, showcasing best practices in frontend development with a focus on automation, containerization, and deployment using modern DevOps practices.

## Table of Contents
- [Application Setup](#application-setup)
- [Containerization](#containerization)
- [CI/CD Automation](#cicd-automation)
- [Kubernetes Deployment (Minikube)](#kubernetes-deployment-minikube)
- [Documentation](#documentation)
- [Challenges & Decisions](#challenges-decisions)

---

## Application Setup

### Prerequisites

- **Node.js** (v18 or later)
- **Docker** (for containerization)
- **Minikube** (for Kubernetes deployment)
- **GitHub** (for the GitHub Actions CI/CD pipeline)

### Installation & Running Locally

1. **Clone the Repository**

   Start by cloning the repository to your local machine.

   ```bash
   git clone https://github.com/your-username/book-list-app.git
   cd book-list-app
2. **Install Dependencies**
   Install the required dependencies using npm or yarn.
   npm install

3. **Run the App Locally**
   npm run dev
   The app will be available at http://localhost:3000.

## Containerization

### Dockerfile
The Dockerfile has been written to containerize the application. It includes the following steps:
1. **Base Image:**
   We use the node:18-alpine image to run the app.
2. **Dependencies**
   Install the app dependencies from package.json
3. **Build & Copy Files**
   Copy the app source code into the container.
4. **Expose Port:**
   The container exposes port 3000 for external access
5. **Run the App**
   Starts the app with npm run dev

### Build & Run with Docker
1. **Build the Docker Image:**
   After ensuring that Docker is installed, build the Docker image:
   docker build -t book-list-app .

2. **Run the Docker Container**
   Once the image is built, run the container
   docker run -p 3000:3000 book-list-app
The application will be available at http://localhost:3000 inside the container.

## CI/CD Automation
The CI/CD pipeline is automated using GitHub Actions.

### Workflow Overview
The GitHub Actions workflow is defined in .github/workflows/docker.yml. It includes the following steps:

1. **Build Docker Image:**
  Automatically builds the Docker image for the app on push or pull request events.
2. **Push Docker Image:**
  After a successful build, the image is pushed to GitHub Container Registry.
3. **GitHub Actions Workflow Configuration**
The following snippet defines the key actions used in the CI/CD pipeline:

name: CI/CD Pipeline

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v2

      - name: Build Docker Image
        run: |
          docker build -t ghcr.io/geektums/book-list-app:latest .
        
      - name: Push Docker Image to GitHub Container Registry
        run: |
          docker push ghcr.io/geektums/book-list-app:latest

This GitHub Actions workflow will automatically build and push the image every time code is pushed to the main branch.

## Kubernetes Deployment (Minikube)

## Minikube Setup
1. **Start Minikube**
    First, start your Minikube cluster with the following command:
    minikube start
2. **Create Kubernetes Manifests**
   The Kubernetes deployment is defined in the following YAML files:
   **deployment.yaml:** Defines the deployment configuration for the containerized app.

    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: book-list-app
    spec:
    replicas: 1
    selector:
        matchLabels:
        app: book-list-app
    template:
        metadata:
        labels:
            app: book-list-app
        spec:
        containers:
            - name: book-list-app
            image: ghcr.io/geektums/book-list-app:latest
            ports:
                - containerPort: 3000

   **service.yaml:**
   Exposes the app as a service

    apiVersion: v1
    kind: Service
    metadata:
    name: book-list-app-service
    spec:
    type: NodePort
    selector:
        app: book-list-app
    ports:
        - protocol: TCP
        port: 3000
        targetPort: 3000
        nodePort: 30001

3. **Deploy to MiniKube**
   Apply the manifests to deploy the app and expose it as a service:
  
   kubectl apply -f deployment.yaml
   kubectl apply -f service.yaml

4. **Access the App**
   Once deployed, access the application at http://localhost:30001 (NodePort) or use Minikube’s built-in service access commands.

## Documentation

### Steps to Build and Run the Application Locally
1. **Clone the repository**
2. **Run npm install to install dependencies**
3. **Start the app with npm run dev and access it at http://localhost:3000.**

### Steps to Deploy the Application on Minikube
1. **Ensure Minikube is running with minikube start.**
2. **Apply the Kubernetes manifests using kubectl apply -f.**
3. **Access the app at http://localhost:30001.**

### CI/CD Pipeline Explanation
1. **The CI/CD pipeline is automated with GitHub Actions.**
2. **On every push or pull request to the main branch, the app is automatically built into a Docker image and pushed to GitHub Container Registry.**

### Assumptions & Challenges
The app was kept simple for quick deployment and focus on DevOps tasks.
Challenges included configuring Docker correctly for the app and ensuring Kubernetes manifests worked as expected.


## Challenges & Decisions
1.**Containerization:**
    Decided to use node:18-alpine as the base image for its small size and efficiency.
2. **CI/CD:**
    Chose GitHub Actions for ease of integration with GitHub repositories and container registries.
3.  **Kubernetes:**
    Used NodePort for local exposure in Minikube for simplicity.

