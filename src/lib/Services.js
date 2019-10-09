const services = {}

export default SuperClass => {
  return class BoltServices extends SuperClass {
    _setup() {
      if (this.config.services) {
        Object.keys(this.config.services).forEach(service => {
          if (!services[service]) {
            services[service] = this.config.services[service]
          }
        })
      }
      // expose services in each component
      this.constructor.prototype.services = services

      super._setup()
    }
  }
}
