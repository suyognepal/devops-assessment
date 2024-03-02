pipeline {
    agent any
    
    options {
        // Cache npm dependencies
        skipDefaultCheckout(true)
        timeout(time: 1, unit: 'HOURS')
    }
    
    stages {
        stage('Checkout') {
            steps {
                sh 'git clone --depth 1 --branch master https://github.com/suyognepal/devops-assessment.git .'
            }
        }
        
        stage('Check for node_modules') {
            steps {
                script {
                    if (!fileExists('node_modules')) {
                        // If node_modules directory doesn't exist, run npm install and stash it
                        sh 'npm install'
                        stash(name: 'node_modules', includes: 'node_modules/**')
                    } else {
                        // If node_modules directory exists, use the cached version
                        unstash('node_modules')
                        echo 'Using cached node_modules directory'
                    }
                }
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
            // Clean up
            cleanWs()
        }
        success {
            // Clean up
            cleanWs()
        }
        failure {
            // Clean up
            cleanWs()
        }
    }
}

