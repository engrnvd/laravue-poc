import { ref } from 'vue'

export function useToggle(value = null) {
  const selected = ref(value)

  function toggle(item) {
    if (selected.value === item) {
      selected.value = null
      return
    }

    selected.value = item
  }

  return { selected, toggle }
}
