import json from '../../package.json'
// Config
class Config {
  constructor(properties) {
    this.json    = json
    this.env     = 'development'
    this.api     = 'http://api.criticalmasser.com'
    this.version = this.json.version
  }
}

// Export
export default new Config