import { onMounted, ref } from 'vue'

const params = new URLSearchParams(window.location.search)

export function useUrlParam(param) {
  const p = ref('')

  function update() {
    p.value = params.get(param)
  }

  onMounted(update)

  return p
}
