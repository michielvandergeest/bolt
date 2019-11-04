export default SuperClass => {
  return class BoltTemplate extends SuperClass {
    _setup() {
      this.mounted = false

      if (this.config.lazy === true) {
        // only set the position and dimension part of the template (in order know when first active)
        this.patch({
          x: this.config.template.x || null,
          y: this.config.template.y || null,
          w: this.config.template.w || null,
          h: this.config.template.h || null,
        })

        // default boundsmargin for lazy created components
        // need to review the logic of this ...
        if (!this.config.boundsMargin) {
          this.boundsMargin = [
            (this.config.template.w || 0) * 2,
            (this.config.template.h || 0) * 2,
            0,
            0,
          ]
        }
      } else {
        this.patch(this.config.template)
        this.mounted = true
        this.exec(this.config.events.mounted)
        if (this.config.debug === true) {
          console.log(this.config.name + ' template mounted during setup')
        }
      }
      super._setup()
    }

    _focus() {
      if (this.mounted === false) {
        this.patch(this.config.template)
        this.mounted = true
        this.exec(this.config.events.mounted)
        if (this.config.debug === true) {
          console.log(this.config.name + ' template mounted during focus')
        }
        this._refocus()
      }
      super._focus()
    }

    _firstActive() {
      if (this.mounted === false) {
        this.patch(this.config.template)
        this.mounted = true
        this.exec(this.config.events.mounted)
        if (this.config.debug === true) {
          console.log(this.config.name + ' template mounted during firstActive')
        }
      }
      super._firstActive()
    }
  }
}
