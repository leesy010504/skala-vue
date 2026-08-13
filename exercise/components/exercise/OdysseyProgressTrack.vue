<script setup>
import { computed } from 'vue'

const props = defineProps({
  waypoints: { type: Array, required: true }, // order 순으로 정렬되어 들어온다고 가정
  selectedId: { type: String, default: null },
})

const emit = defineEmits(['select'])

const total = computed(() => props.waypoints.length)
const selectedIndex = computed(() => props.waypoints.findIndex((wp) => wp.id === props.selectedId))
const selectedWaypoint = computed(() => (selectedIndex.value >= 0 ? props.waypoints[selectedIndex.value] : null))

// 채워진(지나온) 구간의 비율 — 마지막 지점(index total-1)이 100%가 되도록 계산
const fillPercent = computed(() => {
  if (total.value <= 1 || selectedIndex.value < 0) return 0
  return (selectedIndex.value / (total.value - 1)) * 100
})
</script>

<template>
  <div class="odyssey-track">
    <p class="odyssey-track-label">
      🧭 여정 진행:
      <strong>{{ selectedIndex >= 0 ? selectedIndex + 1 : '-' }} / {{ total }}</strong>
      <span v-if="selectedWaypoint"> — {{ selectedWaypoint.nameKorean }}</span>
    </p>
    <div class="odyssey-track-rail">
      <div class="odyssey-track-rail-fill" :style="{ width: fillPercent + '%' }"></div>
      <button
        v-for="(wp, index) in waypoints"
        :key="wp.id"
        type="button"
        class="odyssey-track-dot"
        :class="{
          'is-visited': selectedIndex >= 0 && index < selectedIndex,
          'is-selected': wp.id === selectedId,
        }"
        :style="{ left: total > 1 ? (index / (total - 1)) * 100 + '%' : '0%' }"
        :title="`#${wp.order} ${wp.nameKorean}`"
        @click="emit('select', wp.id)"
      ></button>
    </div>
  </div>
</template>
