import Lightning from 'wpe-lightning'
import Deepmerge from 'deepmerge'
import Bolt from './lib/Bolt'

let i = 0

const defaults = {
  debug: false,
  lazy: true,
  template: {
    w: w => w,
    h: h => h,
  },
  events: {},
  data: {},
  keys: {},
  actions: {},
}

class BoltComponent extends Bolt(Lightning.Component) {}

export default function() {
  i++
  const config = Deepmerge.all(
    [{ name: 'Component' + i, id: 'Component' + i }, { ...defaults }, ...arguments].map(item => {
      // wrap templates in an array, so they can be merged even if template is a function
      item.template ? (item.template = [item.template]) : null
      return item
    })
  )

  return {
    ...{ type: BoltComponent },
    ...{ config },
  }
}
