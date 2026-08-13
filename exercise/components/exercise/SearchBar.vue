<script setup>
// 1. 상위로 입력 텍스트를 전달할 커스텀 이벤트 등록 (매크로)
defineEmits(['update-query'])

// 2. 상위로부터 현재 검색 상태 값을 수신 (한글 동기화 상태 유지용)
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>
    <!-- el-input의 v-model/@input은 한글 조합(IME)이 끝날 때까지 값 반영을 미루므로,
         조합 중에도 실시간 반영되어야 하는 검색창은 네이티브 input을 :value + @input으로 직접 다룬다. -->
    <input type="text" :value="currentQuery" placeholder="검색할 도시 이름 입력" @input="(e) => $emit('update-query', e.target.value)" />
    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
  </div>
</template>
