import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollSmoother from 'gsap/ScrollSmoother'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(
  ScrollSmoother,
  SplitText,
  ScrollTrigger,
)

function initScrollSmoother() {
  const sm = ScrollSmoother.create({
    effects: true,
    smooth: 1,
    smoothTouch: 0.1,
  })
  return sm
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollSmoother,
      initScrollSmoother,
      SplitText,
    },
  }
})
