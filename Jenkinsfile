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
        
        stage('Git Pull') {
            steps {
                // Change to the specified directory and perform git pull
                dir('/opt/devops-task') {
                    sh 'git pull origin master'
                }
            }
        }        
        
        stage('Compare package.json') {
            steps {
                script {
                    def cloneChecksum = sh(script: 'md5sum package.json', returnStdout: true).trim().split()[0]
                    def optChecksum = sh(script: 'md5sum /opt/devops-task/package.json', returnStdout: true).trim().split()[0]
                    
                    if (cloneChecksum != optChecksum) {
                        // If checksums are different, run npm install in /opt/devops-task
                        dir('/opt/devops-task') {
                            sh 'npm install'
                        }
                    } else {
                        // If checksums are same, use cached node_modules directory
                        echo 'Using cached node_modules directory'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                // Run tests in /opt/devops-task directory
                dir('/opt/devops-task') {
                    sh 'npm test test/index.js'
                }
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
    } // Add the missing closing curly brace for the 'stages' section
    
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

