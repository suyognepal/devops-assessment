pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/suyognepal/devops-assessment.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test test/index.js'
            }
        }
        
        stage('Deploy') {
            steps {
                sh 'pm2 restart index.js'
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            cleanWs()
        }
        failure {
            cleanWs()
        }
    }
}
