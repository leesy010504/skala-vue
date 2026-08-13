<script setup>
defineProps({
  waypoint: { type: Object, default: null },
  advisory: { type: Object, default: null },
})
</script>

<template>
  <div v-if="waypoint && advisory" class="odyssey-banner" :class="`odyssey-banner-${advisory.level}`">
    <div class="odyssey-banner-emoji">{{ advisory.emoji }}</div>
    <div>
      <h3>{{ waypoint.nameKorean }} — {{ advisory.title }}</h3>
      <p>{{ advisory.message }}</p>
    </div>
  </div>
  <div v-else class="odyssey-banner odyssey-banner-unknown">
    <p>지점을 선택하면 출항 가능 여부를 알려드립니다.</p>
  </div>
</template>
