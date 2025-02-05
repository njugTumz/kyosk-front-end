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
   git clone https://github.com/njugTumz/kyosk-front-end.git

2. **Install Dependencies**
   <br>Navigate to the folder you have cloned the repository:
   ```
   cd kyosk-front-end
   ```
   Install the required dependencies using npm or yarn.
   ```
   npm install
   ```

3. **Run the App Locally**
   ```
   npm run dev
   ```
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
1. **Ensure Docker Desktop is Running** <br>
   -Open Docker Desktop and ensure it is running <br>
   -Run the following commands in your terminal to verify Docker is installed and running::<br>

   ```
   docker --version
   ```

   ```
   docker info
   ```

   -If these commands fail, reinstall Docker Desktop.

2. **Build the Docker Image:**
   After ensuring that Docker is installed, build the Docker image:
   ```
   docker build -t book-list-app .
   ```

   <br> <br>
   ![Alt text](./screenshots/docker_build.jpg)

3. **Run the Docker Container**
   Once the image is built, run the container
   ```
   docker run -p 3000:3000 book-list-app
   ```

   <br> <br>
   ![Alt text](./screenshots/docker_run.jpg)

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

   ```
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
      - name: Checkout code
         uses: actions/checkout@v2

      - name: Set up Node.js
         uses: actions/setup-node@v2
         with:
         node-version: '18'

      - name: Install dependencies
         run: npm install

      - name: Build Docker image
         run: docker build -t geektums/book-list-app .

      - name: Login to Docker Hub
         uses: docker/login-action@v2
         with:
         username: ${{ secrets.DOCKER_USERNAME }}
         password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Push Docker image to Docker Hub
         run: docker push geektums/book-list-app

    ```

This GitHub Actions workflow will automatically build and push the image every time code is pushed to the main branch.

## Kubernetes Deployment (Minikube)

## Minikube Setup
1. **Start Minikube**
    First, start your Minikube cluster with the following command:
    ``` 
    minikube start 
    ```
2. **Create Kubernetes Manifests**
   The Kubernetes deployment is defined in the following YAML files:
   **deployment.yaml:Defines the deployment configuration for the containerized app.**

    ```
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
        image: geektums/book-list-app:latest
        ports:
        - containerPort: 3000
    ```
   **service.yaml:Exposes the app as a service**

    ```
    apiVersion: v1
    kind: Service
    metadata:
     name: book-list-app-service
    spec:
     selector:
      app: book-list-app
    ports:
     - protocol: TCP
       port: 80
       targetPort: 3000
    type: NodePort
    ```

3. **Deploy to MiniKube**
   Apply the manifests to deploy the app and expose it as a service:
  
  ```
   kubectl apply -f k8s/deployment.yaml
   ```

   ```
   kubectl apply -f k8s/service.yaml
   ```

4. **Access the App** <br>
   Once deployed, access the application 
   ```
   minikube service book-list-app-service --url
   ```
   
   <br> <br>
   ![Alt text](./screenshots/miniurl.jpg)

   <br><br>
   ![Alt text](./screenshots/app_url.jpg)

   
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
2. **On every push or pull request to the main branch, the app is automatically built into a Docker image and pushed to Docker Container Registry.**

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

