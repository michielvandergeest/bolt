import Router from './support/Router'
import Observer from './support/Observer'

export default SuperClass => {
  return class BoltBase extends SuperClass {
    _setup() {
      this.actionsFlag = false // bit ugly
      // Create a params object
      this.params = {}

      // Set up the router when routes or router is defined
      if (this.config.routes || this.config.router) {
        this.$router = Router(
          this.config.routes || this.config.router.routes,
          {
            target: (this.config.router && this.config.router.target) || this.childList,
            onChange: (this.config.router && this.config.router.onChange) || null,
            beforeChange: (this.config.router && this.config.router.beforeChange) || null,
          },
          this
        )

        // add a $goTo method that can be called via fireAncestors
        this.constructor.prototype.$goTo = function() {
          return (
            (this.$router && this.$router.go(...arguments)) ||
            this.fireAncestors('$goTo', ...arguments)
          )
        }

        // add a $goBack method that can be called via fireAncestors
        this.constructor.prototype.$goBack = function() {
          return (
            (this.$router && this.$router.back(...arguments)) ||
            this.fireAncestors('$goBack', ...arguments)
          )
        }
      }
    }

    _firstActive() {
      this.reactiveData()
      this.setupActions()
      super._firstActive()
    }

    _focus() {
      this.reactiveData()
      this.setupActions()
      super._firstActive()
    }

    _detach() {
      // to look into: what about nested children
      this.children = []
      delete this._data
    }

    _getFocused() {
      if (this.config.delegateFocus && typeof this.config.delegateFocus === 'function') {
        return this.config.delegateFocus.apply(this)
      }
      return this
    }

    // remap _refocus to refocus
    refocus() {
      this._refocus()
    }

    exec(func) {
      // single function
      if (func && typeof func === 'function') {
        return func.apply(this)
      }
      // array of functions
      else if (func && Array.isArray(func)) {
        return func.forEach(f => {
          return f.apply(this)
        })
      }
      return false
    }

    get data() {
      if (this._data) return this._data
      else return Object.assign(this.config.data || {})
    }

    reactiveData() {
      if (this.config.data && !this._data) {
        this._data = Observer(
          { data: this.config.data, computed: this.config.computed, watch: this.config.watch },
          this
        )
      }
    }

    setupActions() {
      if (this.actionsFlag === true) return
      // Set up actions when defined
      const actionKeys = this.config.actions && Object.keys(this.config.actions)
      if (actionKeys) {
        // overwriting the _hasMethod to not only look at the prototype but also current instance
        // maybe this could be changed in Lightning core?
        this._hasMethod = function(name) {
          const member = this.constructor.prototype[name] || this[name]
          return !!member && typeof member === 'function'
        }
        // register the methods
        actionKeys.forEach(key => {
          this[key] = this.config.actions[key]
        })

        this.actionsFlag = true
      }
    }
  }
}
