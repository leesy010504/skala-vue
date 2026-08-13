<script setup>
defineProps({
  waypoint: { type: Object, required: true },
  selected: { type: Boolean, default: false },
})

defineEmits(['select'])
</script>

<template>
  <div class="odyssey-card" :class="{ selected }" @click="$emit('select', waypoint.id)">
    <div class="odyssey-card-header">
      <span class="odyssey-order">#{{ waypoint.order }}</span>
      <h4>{{ waypoint.nameKorean }}</h4>
    </div>
    <p class="odyssey-lore">{{ waypoint.lore }}</p>

    <div v-if="waypoint.weather" class="odyssey-metrics">
      <span>🌡️ {{ waypoint.weather.tempC != null ? `${Math.round(waypoint.weather.tempC)}°C` : '—' }}</span>
      <span>💨 {{ waypoint.weather.windSpeedMs != null ? `${waypoint.weather.windSpeedMs.toFixed(1)}m/s` : '—' }}</span>
      <span>{{ waypoint.weather.description }}</span>
    </div>
    <div v-else class="odyssey-metrics odyssey-muted">날씨 데이터를 불러오는 중...</div>

    <div v-if="waypoint.wave" class="odyssey-metrics">
      <span>🌊 파고 {{ waypoint.wave.waveHeightM.toFixed(1) }}m</span>
    </div>
    <div v-else class="odyssey-metrics odyssey-muted">해양 데이터 없음</div>

    <span v-if="waypoint.advisory" class="odyssey-badge" :class="`odyssey-badge-${waypoint.advisory.level}`"> {{ waypoint.advisory.emoji }} {{ waypoint.advisory.title }} </span>
  </div>
</template>
