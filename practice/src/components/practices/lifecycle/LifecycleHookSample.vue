<script setup>
import { ref } from 'vue'
import LifecycleTimerChild from './LifecycleTimerChild.vue'

// v-if로 자식 컴포넌트를 붙였다 뗐다 하면서 마운트/언마운트를 직접 관찰합니다.
const showChild = ref(true)
const logs = ref([])

const handleLog = (message) => {
  console.log(message)
  logs.value.push(message)
}
</script>

<template>
  <div class="practice-section">
    <h2>컴포넌트 생명주기 (Lifecycle Hook Example)</h2>
    <p>setup → onMounted → onUpdated(반복) → onUnmounted 순서로 로그가 쌓이는 것을 확인하세요.</p>
    <button @click="showChild = !showChild">
      {{ showChild ? '컴포넌트 제거 (Unmount)' : '컴포넌트 부착 (Mount)' }}
    </button>
    <button @click="logs = []">로그 초기화</button>

    <LifecycleTimerChild v-if="showChild" @log="handleLog" />

    <div class="monitor">
      <h3>🕓 Lifecycle 로그</h3>
      <p v-if="logs.length === 0">아직 기록된 로그가 없습니다.</p>
      <p v-for="(log, index) in logs" :key="index">{{ log }}</p>
    </div>
  </div>
</template>
