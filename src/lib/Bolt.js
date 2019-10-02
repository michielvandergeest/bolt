import Base from './Base'
import Events from './Events'
import Keys from './Keys'
import Template from './Template'

export default SuperClass => {
  return [Base, Events, Keys, Template].reduce((c, mixin) => mixin(c), SuperClass)
}
