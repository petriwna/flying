<template>
  <div class="container__controller">
    <button class="button" @click="toggle">
      {{ isAnimating ? 'Стоп' : 'Почати' }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({ isAnimating: Boolean })
const emit = defineEmits(['startAnimation', 'stopAnimation'])

const toggle = () => {
  props.isAnimating ? emit('stopAnimation') : emit('startAnimation')
}
</script>
