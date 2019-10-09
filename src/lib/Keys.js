export default SuperClass => {
  // by default keys are considered to be of the type `handle`
  // capture keys can be configured in a `capture` object inside `keys`
  // optionally (to be more explicit) handle keys can also be wrapped
  // inside a `handle` object inside `keys` (which takes presedence over root keys!)
  return class BoltKeys extends SuperClass {
    _handleLeft() {
      return this.exec(
        (this.config.keys.handle && this.config.keys.handle.left) || this.config.keys.left
      )
    }

    _handleRight() {
      return this.exec(
        (this.config.keys.handle && this.config.keys.handle.right) || this.config.keys.right
      )
    }

    _handleUp() {
      return this.exec(
        (this.config.keys.handle && this.config.keys.handle.up) || this.config.keys.up
      )
    }

    _handleDown() {
      return this.exec(
        (this.config.keys.handle && this.config.keys.handle.down) || this.config.keys.down
      )
    }

    _handleEnter() {
      return this.exec(
        (this.config.keys.handle && this.config.keys.handle.enter) || this.config.keys.enter
      )
    }

    _handleBack() {
      return this.exec(
        (this.config.keys.handle && this.config.keys.handle.back) || this.config.keys.back
      )
    }

    _handleExit() {
      return this.exec(this.config.keys.exit)
    }

    _captureLeft() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.left)
    }

    _captureRight() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.right)
    }

    _captureUp() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.up)
    }

    _captureDown() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.down)
    }

    _captureEnter() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.enter)
    }

    _captureBack() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.back)
    }

    _captureExit() {
      return this.exec(this.config.keys.capture && this.config.keys.capture.exit)
    }
  }
}
