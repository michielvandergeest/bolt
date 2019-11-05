import Component from '../Component'
import lng from 'wpe-lightning'

const size = 24

export default Component({
  template: {
    w: 144,
    h: size,
    color: 0x00000000,
    mount: 0.5,
    x: w => w / 2,
    y: h => h / 1.8,
    Bullet1: {
      texture: lng.Tools.getRoundRect(size, size, size / 2, 0, null, true, 0xffffffff),
      alpha: 0.2,
    },
    Bullet2: {
      texture: lng.Tools.getRoundRect(size, size, size / 2, 0, null, true, 0xffffffff),
      x: size + size / 2,
      alpha: 0.2,
    },
    Bullet3: {
      texture: lng.Tools.getRoundRect(size, size, size / 2, 0, null, true, 0xffffffff),
      x: (size + size / 2) * 2,
      alpha: 0.2,
      color: 0xffffffff,
    },
  },
  data: {
    count: -1,
  },
  computed: {
    current() {
      return this.data.count % (this.children.length + 1)
    },
  },
  events: {
    mounted() {
      this.interval = setInterval(() => {
        this.data.count++
      }, 250)
    },
    detach() {
      clearInterval(this.interval)
    },
  },
  watch: {
    count() {
      if (this.data.current >= this.children.length) {
        for (let i = 0; i < this.children.length; i++) {
          this.children[i].setSmooth('alpha', 0.2)
        }
      } else {
        this.children[this.data.current].setSmooth('alpha', 0.6)
      }
    },
  },
})
