import Deepmerge from 'deepmerge'

export default SuperClass => {
  return class BoltTemplate extends SuperClass {
    constructor() {
      super(...arguments)
      this.constructor.parsedTemplates = this.constructor.parsedTemplates || {}
    }

    _setup() {
      super._setup()
      this.componentId = this.config.id

      this.mounted = false
      // first see if we have a parsed a templated for this id
      if (!this.constructor.parsedTemplates[this.componentId]) {
        // if not, parse it and store it
        this.config.template = Deepmerge.all(
          this.config.template.map(template => {
            return typeof template === 'function' ? template.apply(this) : template
          })
        )

        this.constructor.parsedTemplates[this.componentId] = this.constructor.parseTemplate(
          this.config.template
        )

        if (this.config.debug === true) {
          console.log(this.config.name + ' template parsed')
        }
      }

      // apply (previously) parsed template for this instance
      this.constructor.parsedTemplates[this.componentId].f(
        this,
        this.constructor.parsedTemplates[this.componentId].a
      )

      // if lazy is enabled, only set the position and dimension
      // in order know when first active
      if (this.config.lazy === true) {
        const patch = ['x', 'y', 'w', 'z'].reduce((obj, key) => {
          if (this.config.patch && this.config.patch[key]) {
            obj[key] = this.config.patch[key]
          }
          return obj
        }, {})

        this.patch(patch)

        // default boundsmargin for lazy created components
        // need to review the logic of this ...
        if (!this.config.boundsMargin) {
          this.boundsMargin = [
            (patch.w || this.config.template.w || 0) * 2,
            (patch.h || this.config.template.h || 0) * 2,
            0,
            0,
          ]
        }
      } else {
        // patch and mount the entire template
        this.patchAndMount()
        if (this.config.debug === true) {
          console.log(this.config.name + ' template patched and mounted during setup')
        }
      }
    }

    _firstActive() {
      super._firstActive()
      if (this.mounted === false) {
        this.patchAndMount()
        if (this.config.debug === true) {
          console.log(this.config.name + ' template patched and mounted during firstActive')
        }
      }
    }

    patchAndMount() {
      // patch any configured changes for this instance
      this.config.patch && this.patch(this.config.patch)

      // template is mounted
      this.mounted = true
      this.exec(this.config.events.mounted)
    }
  }
}
