import { Dep, Computed } from './Dep'

export default (config = {}, context) => {
  const Data = {}

  if (config.data) {
    Object.keys(config.data).forEach(key => {
      let internalValue = config.data[key]

      const dep = new Dep()

      Object.defineProperty(Data, key, {
        get() {
          dep.depend()
          return internalValue
        },
        set(newVal) {
          internalValue = newVal
          if (config.watch && config.watch[key]) {
            config.watch[key].call(context, newVal)
          }
          dep.notify()
        },
      })
    })
  }

  if (config.computed) {
    Object.keys(config.computed).forEach(key => {
      Computed(() => {
        Object.defineProperty(Data, key, {
          get() {
            let internalValue = config.computed[key].apply(context)
            config.watch && config.watch[key] && config.watch[key].call(context, internalValue)
            return internalValue
          },
        })
      })
    })
  }

  Object.keys(Data, 'data', {
    get() {
      return Data
    },
  })

  return Object.seal(Data)
}
