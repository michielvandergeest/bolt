import lng from 'wpe-lightning'
import Deepmerge from 'deepmerge'
import Bolt from './lib/Bolt'

let i = 0

const defaults = {
  debug: false,
  lazy: true, // or not lazy by default?
  template: {
    w: w => w,
    h: h => h,
    rect: true,
  },
  events: {},
  data: {},
  keys: {},
  actions: {},
}

class BoltComponent extends Bolt(lng.Component) {
  static _template() {
    return defaults.template
  }
}

export default function() {
  const config = Deepmerge.all([{ name: 'Component' + i++ }, defaults, ...arguments])

  return { ...{ ref: config.name }, ...{ type: BoltComponent }, ...{ config } }
}
