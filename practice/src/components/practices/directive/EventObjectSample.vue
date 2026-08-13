<script setup>
import { ref } from 'vue'

// 1) 암묵적 이벤트 객체 전달 (함수명만 적으면 e가 자동으로 넘어옴)
const position = ref('')
const getOnlyEvent = (e) => {
  position.value = `좌표: X=${e.clientX}, Y=${e.clientY}`
}

// 2) 명시적 $event 전달 (다른 인자와 함께 이벤트 객체도 같이 넘기고 싶을 때)
const tagName = ref('')
const getWithParam = (name, e) => {
  tagName.value = `대상: ${name} / 클릭된 태그: ${e.target.tagName}`
}

// 3) e.target vs e.currentTarget (리스너는 부모에 걸려 있음)
const targetLog = ref('')
const handleBoxClick = (e) => {
  targetLog.value = `target(실제 클릭된 태그): ${e.target.tagName} / currentTarget(리스너가 걸린 태그): ${e.currentTarget.tagName}`
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 객체($event) 활용</h2>

    <h3>1) 암묵적 이벤트 객체 전달</h3>
    <p>{{ position }}</p>
    <button @click="getOnlyEvent">클릭 좌표 알아내기</button>

    <br />

    <h3>2) 명시적 $event 전달</h3>
    <p>{{ tagName }}</p>
    <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>

    <br />

    <h3>3) e.target vs e.currentTarget</h3>
    <p>{{ targetLog }}</p>
    <div class="parent-box" @click="handleBoxClick">
      부모 영역 (리스너 위치)
      <button>자식 버튼 (클릭해도 리스너는 여전히 부모)</button>
    </div>
  </div>
</template>

<style scoped>
.parent-box {
  padding: 16px;
  background-color: #f1f3f5;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
</style>
