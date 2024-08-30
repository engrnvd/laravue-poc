import { onBeforeUnmount, onMounted } from 'vue'

export function useInterval(func, delay) {
  let interval = null

  onMounted(() => {
    interval = setInterval(func, delay)
  })

  onBeforeUnmount(() => {
    clearInterval(interval)
  })
}
