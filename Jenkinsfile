env.BUILD_PACKAGE_FILE = "${JOB_BASE_NAME}_${BUILD_NUMBER}.tar"
env.NODE_DEFAULT

def extcode
def props

timestamps {
    stage ('Checkout') {
        node('npm') {
            sh 'rm -rf $WORKSPACE/*'
            checkout scm
            checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'devops']], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'DADHX01_SSH', url: 'git@dadhx01:devops/jenkins.git']]])
            extcode = load 'devops/deploy.groovy'

            NODE_DEFAULT = "${NODE_NAME}"

            props = readProperties file: 'jenkins.properties'

            if (props != null && props.size() > 0)
                propsToEnv(props)
            else
                error("Erro ao recuperar arquivo de propriedades!")
        }
    }
}

timestamps {
    node("${NODE_DEFAULT}") {
        extcode.buildStage()
        extcode.integrationStage()
        extcode.archiveStage()
        extcode.codeQualityStage()
        extcode.deployQAStage()
    }
    
    extcode.promoverHMGStage()
    
    node("${NODE_DEFAULT}") {
        extcode.deployHMGStage()
    }
    
    extcode.releaseStage()
    
    node("${NODE_DEFAULT}") {
        extcode.deployPRDStage()
    }
}

@NonCPS
def propsToEnv(propsMap) {
    for (entry in propsMap) {
        env."${entry.key}" = entry.value
    }
}