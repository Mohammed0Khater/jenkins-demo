pipeline {
    agent any // Run on any available Jenkins agent

    tools {
        // Ensure the 'nodejs' tool (configured in Jenkins) is available
        nodejs 'NodeJS 18'
    }

    stages {
        stage('Clone') {
            steps {
                // This stage is implicitly handled by Jenkins when you configure the repo
                echo 'Cloning the repository...'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm install' // Install dependencies
                sh 'npm test'    // Run the test suite
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                script {
                    // Build the Docker image, tagging it with the build number for uniqueness
                    docker.build("my-app:${env.BUILD_NUMBER}")
                }
            }
        }

        stage('Run') {
            steps {
                echo 'Running the application container...'
                script {
                    // Stop and remove any old container
                    sh 'docker stop my-app-container || true'
                    sh 'docker rm my-app-container || true'
                    
                    // Run the new container
                    sh "docker run -d --name my-app-container -p 3001:3000 my-app:${env.BUILD_NUMBER}"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! The app is running on http://localhost:3001'
        }
        failure {
            echo 'Pipeline failed! Check the logs for errors.'
        }
    }
}
