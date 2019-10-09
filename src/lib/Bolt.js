import Base from './Base'
import Events from './Events'
import Keys from './Keys'
import Services from './Services'
import Template from './Template'

export default SuperClass => {
  return [Base, Events, Keys, Services, Template].reduce((c, mixin) => mixin(c), SuperClass)
}
