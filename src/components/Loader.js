import Component from '../Component'
import Lightning from 'wpe-lightning'

const size = 24

export default Component({
  template: {
    w: w => w,
    h: h => h,
    colorTop: 0xff000000,
    colorBottom: 0xff444444,
    Bullets: {
      w: 144,
      h: size,
      color: 0x00000000,
      mount: 0.5,
      x: w => w / 2,
      y: h => h / 1.8,
      Bullet1: {
        texture: Lightning.Tools.getRoundRect(size, size, size / 2, 0, null, true, 0xffffffff),
        alpha: 0.2,
      },
      Bullet2: {
        texture: Lightning.Tools.getRoundRect(size, size, size / 2, 0, null, true, 0xffffffff),
        x: size + size / 2,
        alpha: 0.2,
      },
      Bullet3: {
        texture: Lightning.Tools.getRoundRect(size, size, size / 2, 0, null, true, 0xffffffff),
        x: (size + size / 2) * 2,
        alpha: 0.2,
        color: 0xffffffff,
      },
    },
  },
  data: {
    count: -1,
  },
  computed: {
    current() {
      return this.data.count % (this.tag('Bullets').children.length + 1)
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
      if (this.data.current >= this.tag('Bullets').children.length) {
        for (let i = 0; i < this.tag('Bullets').children.length; i++) {
          this.tag('Bullets').children[i].setSmooth('alpha', 0.2)
        }
      } else {
        this.tag('Bullets').children[this.data.current].setSmooth('alpha', 0.6)
      }
    },
  },
})
