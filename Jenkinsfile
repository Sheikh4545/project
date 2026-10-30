pipeline {
    agent any

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                // Build the Playwright Docker image
                sh 'docker build -t playwright-tests .'
            }
        }
        stage('Run Tests') {
            steps {
                // Run the Playwright tests inside the container
                sh 'docker run --rm --ipc=host playwright-tests'
            }
        }
    }

    post {
        always {
            echo 'Test run completed.'
        }
    }
}

