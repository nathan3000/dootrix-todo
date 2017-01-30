import devConfig from './config.dev'
import testConfig from './config.test'
import prodConfig from './config.prod'

const config = function() {
    switch(process.env.NODE_ENV){
        case 'development':
            return devConfig
        case 'test':
            return testConfig
        case 'production':
            return prodConfig
        default:
            return devConfig
    }
}

export default config()

