export default SuperClass => {
  return class BoltEvents extends SuperClass {
    // Note: _construct and _build are omitted on purpose,
    // because we don't have access to this.config at that point yet

    _setup() {
      // setup is used in the base class, so we need to call the super first
      super._setup()
      this.exec(this.config.events.setup)
    }

    _init() {
      if (this.config.debug === true) {
        console.log(this.config.name + ' initiated')
      }
      this.exec(this.config.events.init)
    }

    _attach() {
      this.exec(this.config.events.attach)
    }

    _detach() {
      this.exec(this.config.events.detach)
    }

    _firstEnable() {
      this.exec(this.config.events.firstEnable)
    }

    _enable() {
      this.exec(this.config.events.enable)
    }

    _disable() {
      this.exec(this.config.events.disable)
    }

    _firstActive() {
      super._firstActive()
      this.exec(this.config.events.firstActive)
    }

    _active() {
      this.exec(this.config.events.active)
    }

    _inactive() {
      this.exec(this.config.events.inactive)
    }

    _focus() {
      if (this.config.debug === true) {
        console.log(this.config.name + ' received focus')
      }
      this.exec(this.config.events.focus)
    }

    _unfocus() {
      if (this.config.debug === true) {
        console.log(this.config.name + ' lost focus')
      }
      this.exec(this.config.events.unfocus)
    }
  }
}
