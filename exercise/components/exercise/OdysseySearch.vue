<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  waypoints: { type: Array, required: true },
})

const emit = defineEmits(['select'])

// :value + @input으로 직접 다룬다. el-input의 v-model은 한글 조합(IME)이 끝나야 값이 반영되어
// 마지막 글자를 칠 때 목록이 갱신되지 않는 문제가 있어, 네이티브 input 이벤트로 매 타이핑마다 반영한다.
const searchQuery = ref('')

const filteredWaypoints = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return props.waypoints
  return props.waypoints.filter((wp) => wp.nameKorean.includes(query) || wp.nameGreek.includes(query))
})
</script>

<template>
  <div class="odyssey-search">
    <input type="text" :value="searchQuery" placeholder="지역 이름으로 검색 (예: 이타카, 세이렌)" @input="(e) => (searchQuery = e.target.value)" />
    <p class="odyssey-search-count">
      검색 결과: <strong>{{ filteredWaypoints.length }}</strong
      >곳
    </p>

    <div class="odyssey-grid">
      <div v-for="wp in filteredWaypoints" :key="wp.id" class="odyssey-search-item" @click="emit('select', wp.id)">
        <span class="odyssey-order">#{{ wp.order }}</span>
        <h4>{{ wp.nameKorean }}</h4>
        <p class="odyssey-lore">{{ wp.lore }}</p>
      </div>
    </div>

    <p v-if="filteredWaypoints.length === 0" class="odyssey-search-empty">😢 검색 결과와 일치하는 지역이 없습니다.</p>
  </div>
</template>
