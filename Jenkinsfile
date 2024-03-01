pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'your_repository_url'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'npm run deploy'
            }
        }
    }
    
    post {
        always {
            // Cleanup steps, if needed
        }
        success {
            // Actions to take on successful build
            // For example, sending notifications
        }
        failure {
            // Actions to take on build failure
            // For example, sending notifications or rolling back deployments
        }
    }
}
