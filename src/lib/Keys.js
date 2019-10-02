export default SuperClass => {
  // todo: add support for capture as well
  return class BoltKeys extends SuperClass {
    _handleLeft() {
      return this.exec(this.config.keys.left)
    }

    _handleRight() {
      return this.exec(this.config.keys.right)
    }

    _handleUp() {
      return this.exec(this.config.keys.up)
    }

    _handleDown() {
      return this.exec(this.config.keys.down)
    }

    _handleEnter() {
      return this.exec(this.config.keys.enter)
    }

    _handleBack() {
      return this.exec(this.config.keys.back)
    }

    _handleExit() {
      return this.exec(this.config.keys.exit)
    }
  }
}
