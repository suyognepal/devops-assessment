pipeline {
    agent any
   environment {

   }
   options { 
       disableConcurrentBuilds() 
   }
    tools {
    }
   parameters {
        string(name: "Branch", defaultValue: '3.', description: 'Please type the branch name you want me to deploy')
    }
   stages {
        stage('Preparation') {
            steps {
                 git branch: "${Branch}", credentialsId: 'github-token', url: 'http://gitlab.f1soft.com/esewa/esewa-cas.git'
            }
        }
        stage("Build") {
            steps {
                script {
                    sh (script: "sh $JENKINS_HOME/.env/esewa-cas.sh esewa-cas '${Branch}' $BUILD_NUMBER", returnStdout: true)
                }
            }
        }
        stage("Deploy") {
                steps {

                }
        }
        stage("Restart Tomcat") {
            steps {

            }
        }
        stage("Docker build") {
            steps {

            }
        }    
        stage('Results') {
            steps {
                archiveArtifacts 'build/libs/*'
            }
           
        }
        stage("Publish_Artifact") {
            steps {
               
		   }
		            
                }
    }
   }
   post {
        success {
            cleanWs()
            sendPRNotificationGitlab('success') 
            sendNotification([status:"SUCCESS",to:"${env.githubUserEmail}", title:"Deployment is successfull"])
        }
        failure {
            script {
                cleanWs()
                sendPRNotificationGitlab('failed')
                sendNotification([status:"FAILURE",to:"${env.gitlabUserEmail}", title:"Deployment failed"])
            }
        }
        aborted {
            cleanWs()
            sendPRNotificationGitlab('canceled')
            sendNotification([status:"aborted",to:"${env.gitlabUserEmail}", title:"Deployment aborted"])
        }    
    }

}