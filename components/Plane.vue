<template>
  <svg class="flight-map" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
    <g :transform="`translate(${position.x}, ${position.y}) rotate(${rotation}) scale(0.1)`">
      <image href="@/assets/plane.svg" x="-15" y="-15" height="30" width="30" />
    </g>
  </svg>
</template>
<script setup>
import rawData from '~/assets/data/flight_data.json';

import { ref } from 'vue';

const TOTAL_DURATION_MS = 20000;

const position = ref({ x: 50, y: 50 });
const rotation = ref(0);
const path = ref([{ x: 50, y: 50 }]);
let animationFrame;
let startTime;
const baseTimestamp = rawData[0].timestamp;
const flightData = rawData.map(item => ({
  ...item,
  timestamp: item.timestamp - baseTimestamp,
  speed: Number(item.speed),
  direction: Number(item.direction)
}));

const totalFlightTime = flightData.at(-1).timestamp;
const kmToSvgFactor = 0.13;
const deg2rad = deg => deg * (Math.PI / 180);

function calculateOffset(time, speed, direction) {
  const timeInHours = time / 3600;
  const distanceKm = speed * timeInHours;
  const distance = distanceKm * kmToSvgFactor;

  const dx = distance * Math.sin(deg2rad(direction));
  const dy = -distance * Math.cos(deg2rad(direction));

  return { dx, dy };
}

function interpolate(start, end, progress) {
  const speed = start.speed + (end.speed - start.speed) * progress;
  const direction = start.direction + (end.direction - start.direction) * progress;
  return { speed, direction };
}

function animateFrame(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsedMs = timestamp - startTime;
  const progress = Math.min(elapsedMs / TOTAL_DURATION_MS, 1);
  const flightTime = totalFlightTime * progress;

  let x = 50;
  let y = 50;
  let angle = 0;

  for (let i = 0; i < flightData.length - 1; i++) {
    const a = flightData[i];
    const b = flightData[i + 1];

    if (flightTime >= b.timestamp) {
      const { speed, direction } = interpolate(a, b, 1);
      const { dx, dy } = calculateOffset(b.timestamp - a.timestamp, speed, direction);
      x += dx;
      y += dy;
    } else {
      const segmentTime = b.timestamp - a.timestamp;
      const localProgress = (flightTime - a.timestamp) / segmentTime;
      const { speed, direction } = interpolate(a, b, localProgress);
      const { dx, dy } = calculateOffset(segmentTime * localProgress, speed, direction);
      x += dx;
      y += dy;
      angle = direction;
      break;
    }
  }

  position.value = { x, y };
  rotation.value = angle;
  path.value.push({ x, y });

  if (progress < 1) {
    animationFrame = requestAnimationFrame(animateFrame);
  }
}

const startAnimation = () => {
  reset();
  animationFrame = requestAnimationFrame(animateFrame);
};

const stopAnimation = () => {
  cancelAnimationFrame(animationFrame);
  reset();
};

function reset() {
  startTime = null;
  position.value = { x: 50, y: 50 };
  rotation.value = 0;
  path.value = [{ x: 50, y: 50 }];
}

defineExpose({startAnimation, stopAnimation});
</script>
