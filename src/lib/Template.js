export default SuperClass => {
  return class BoltTemplate extends SuperClass {
    _setup() {
      this.patch(this.config.template)
      super._setup()
    }
  }
}
