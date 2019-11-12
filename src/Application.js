import lng from 'wpe-lightning'
import Component from './Component'
import Loader from './components/Loader'

const defaults = {
  name: 'App',
  fonts: [],
  preload: [],
  template: {
    color: 0x00000000,
  },
}

export default function() {
  const App = Component(defaults, ...arguments)

  return class BoltApplication extends lng.Application {
    static _template() {
      return {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff000000,
        children: [Loader], // maybe make loader configurable?
        Preload: { alpha: 0.000001 },
      }
    }

    _setup() {
      Promise.all([
        this.loadFonts(App.config.fonts),
        this.preloadImages(App.config.preload),
        // todo:
        // - load locales
        // - more ?
      ])
        .then(() => {
          setTimeout(() => {
            // First add the app
            this.childList.a(App) //, MediaPlayer
            super._setup()
            // then remove the loader (at position 0)
            setTimeout(() => {
              this.childList.removeAt(0)
            }, 1000)
          }, 1000)
        })
        .catch(console.error)
    }

    loadFonts(fonts) {
      return new Promise((resolve, reject) => {
        fonts
          .map(({ family, url, descriptors }) => () => {
            const fontFace = new FontFace(family, 'url(' + url + ')', descriptors || {})
            document.fonts.add(fontFace)
            return fontFace.load()
          })
          .reduce((promise, method) => {
            return promise.then(() => method())
          }, Promise.resolve(null))
          .then(resolve)
          .catch(reject)
      })
    }

    preloadImages(images) {
      return new Promise((resolve, reject) => {
        images
          .map(src => () => {
            const tag = this.tag('Preload').add({ src })
            return new Promise((resolve, reject) => {
              tag.on('txLoaded', resolve)
              tag.on('txError', reject)
            })
          })
          .reduce((promise, method) => {
            return promise.then(() => method())
          }, Promise.resolve(null))
          .then(resolve)
          .catch(reject)
      })
    }

    _getFocused() {
      return this.tag(App.ref)
    }
  }
}
