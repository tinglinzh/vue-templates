import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import '@/assets/style/main.css'

const app = createApp(App)

const map = new WeakMap()
const ob = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const animation = map.get(entry.target).play()
      animation && animation.play()
      ob.unobserve(entry.target)
    }
  })
})

function isBelowViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
};
app.directive('sidein', {
  mounted(el: HTMLElement) {
    if (!isBelowViewport(el))
      return
    const animate = el.animate(
      [
        {
          transform: 'translateY(100px)',
          opacity: 0.5,
        },
        {
          transform: 'translateY(0px)',
          opacity: 1,
        },
      ],
      {
        duration: 500,
        easing: 'ease-out',
        fill: 'forwards',
      },
    )
    animate.pause()
    map.set(el, animate)
    ob.observe(el)
  },
  unmounted(el: HTMLElement) {
    ob.unobserve(el)
  },
})

const pinia = createPinia()
app.use(pinia)
app.mount('#app')
