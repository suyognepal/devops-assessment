pipeline {
    agent any
    
    options {
        // Cache npm dependencies
        skipDefaultCheckout(true)
    }
    
    stages {
        stage('Checkout') {
            steps {
                sh 'git clone --depth 1 --branch master https://github.com/suyognepal/devops-assessment.git .'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Test') {
            steps {
                // Run tests in parallel using a test runner if supported
                sh 'npm test test/index.js'
            }
        }
        
        stage('Deploy') {
            parallel {
                stage('Deploy Dev') {
                    steps {
                        sh "pm2 restart all"
                    }
                }
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

