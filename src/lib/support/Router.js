export default (routes, options, context) => {
  return {
    go(to, params) {
      const route = routes[to]

      if (route) {
        if (context.config.debug) {
          console.log('Routing to', to)
        }

        const target = getTarget(options.target, context)
        // try to find the component
        let component = getComponent(target, route.ref)

        // if not add it
        if (!component) {
          component = addComponent(target, route)

          component.constructor.prototype.enterRouter = function() {
            if (context.config.debug) {
              console.log('Entering route ' + to)
            }
            // this should probably be configurable with a custom animation etc.
            // because alpha 1 / 0 is not always the desired behaviour
            this.setSmooth('alpha', 1)
          }

          component.constructor.prototype.exitRoute = function() {
            if (context.config.debug) {
              console.log('Leaving route ' + to)
            }
            // same here, make this configurable / custom
            this.setSmooth('alpha', 0)
          }

          if (context.config.debug) {
            console.log('Loaded component for route ' + to)
          }
        }

        if (params) {
          if (context.config.debug) {
            console.log('Setting params to component ' + to, params)
          }

          component.params = params
        }

        setFocus(component, target, context, options.onChange, to)

        component.enterRouter()

        exitSiblingComponents(component, target)

        return true
      } else {
        console.log('Route ' + to + ' not found ...')
        return false
      }
    },
  }
}

const getTarget = (target, context) => {
  if (typeof target === 'string') {
    return context.tag(target)
  } else if (typeof target === 'object') {
    if (target.constructor.name === 'ElementChildList') {
      return target
    } else {
      return target
    }
  }
}

const getComponent = (target, ref) => {
  const childList = target.constructor.name === 'ElementChildList' ? target : target.__childList
  return childList._refs[ref]
}

const setFocus = (component, target, context, onChange, to) => {
  const focusPoint = target.constructor.name === 'ElementChildList' ? context : target

  focusPoint.config.delegateFocus = () => {
    return component
  }

  if (onChange && typeof onChange === 'function') {
    onChange.apply(context, [to, component])
  }

  // force refocus
  context._refocus()
}

const addComponent = (target, route) => {
  // childlist uses 'a' and a normal component uses 'add'
  return target.constructor.name === 'ElementChildList' ? target.a(route) : target.add(route)
}

const exitSiblingComponents = (component, target) => {
  const children = target.constructor.name === 'ElementChildList' ? target._items : target.children
  children
    .filter(child => child != component)
    // todo - add a filter to see if it's the active child, so we don't call exit on every child
    .forEach(child => (child.exitRoute ? child.exitRoute() : null))
}
