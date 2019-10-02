import lng from 'wpe-lightning'
import Component from './Component'

const defaults = {
  name: 'App',
}

export default function() {
  const App = Component(defaults, ...arguments)

  return class BoltApplication extends lng.Application {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        rect: true,
        App,
      }
    }

    _getFocused() {
      return this.tag(App.ref)
    }
  }
}
