<template>
  <div class="container">
    <Map />
    <Plane ref="plane" />
    <Controller
        :isAnimating="isAnimating"
        @startAnimation="startPlaneAnimation"
        @stopAnimation="stopPlaneAnimation"
    />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import Plane from '~/components/Plane.vue'
import Controller from '~/components/Controller.vue'
import Map from '~/components/Map.vue'

const isAnimating = ref(false)
const plane = ref(null)

const startPlaneAnimation = () => {
  isAnimating.value = true
  plane.value.startAnimation(() => {
    isAnimating.value = false
  })
}

const stopPlaneAnimation = () => {
  isAnimating.value = false
  plane.value.stopAnimation()
}
</script>
