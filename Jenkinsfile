pipeline {
    agent any
    
    options {
        skipDefaultCheckout(true)
        timeout(time: 1, unit: 'HOURS')
    }
    
    stages {
        stage('Checkout') {
            steps {
                shell 'git clone --depth 1 --branch master https://github.com/suyognepal/devops-assessment.git .'
            }
        }
        
        stage('Git Pull') {
            steps {
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
                        dir('/opt/devops-task') {
                            sh 'npm install'
                        }
                    } else {
                        echo 'Using cached node_modules directory'
                    }
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('/opt/devops-task') {
                    sh 'npm test test/index.js'
                }
            }
        }
        
        stage('Deploy') {
            parallel {
                stage('Deploy Dev') {
                    steps {
                        sh "pm2 restart development"
                    }
                }
                stage('Deploy Stage') {
                    steps {
                        sh "pm2 restart staging"
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
            emailext (
                to: 'suyog.nepal10@gmail.com',
                subject: 'Pipeline Success Notification',
                body: 'Your pipeline has succeeded. Congratulations!',
                attachLog: true
            )
        }
        failure {
            emailext (
                to: 'suyog.nepal10@gmail.com',
                subject: 'Pipeline Failure Notification',
                body: 'Your pipeline has failed. Please investigate.',
                attachLog: true
            )
        }
        aborted {
            emailext (
                to: 'suyog.nepal10@gmail.com',
                subject: 'Pipeline Failure Notification',
                body: 'Your pipeline was aborted',
                attachLog: true
            )
        }        
    }
}

