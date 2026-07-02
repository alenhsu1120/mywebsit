import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useReveal(threshold = 0.18): { el: Ref<HTMLElement | null>; visible: Ref<boolean> } {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    }, { threshold })
    observer.observe(el.value)
  })

  onUnmounted(() => observer?.disconnect())

  return { el, visible }
}
