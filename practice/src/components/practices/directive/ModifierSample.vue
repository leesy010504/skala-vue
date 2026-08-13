<script setup>
import { ref } from 'vue'

// 1) .prevent
const linkMessage = ref('')
const handleLink = () => {
  linkMessage.value = '수식어 덕분에 이동하지 않고 함수만 실행됩니다!'
}

// 2) .stop
const bubbleLog = ref('')
const handleBox = () => {
  bubbleLog.value = '부모 박스가 클릭됨'
}
const handleChild1 = () => {
  bubbleLog.value = '1번 자식 클릭! (버블링 발생 → 부모까지 전파됨)'
}
const handleChild2 = () => {
  bubbleLog.value = '2번 자식 클릭! (.stop으로 버블링 차단)'
}

// 3) .once
const likeCount = ref(0)
const handleLike = () => {
  likeCount.value++
}

// 4) .self
const isModalOpen = ref(false)
const closeModal = () => {
  isModalOpen.value = false
}

// 5) .enter (키보드 수식어)
const message = ref('')
const submittedMessage = ref('')
const handleEnter = () => {
  submittedMessage.value = message.value
}

// 6) .ctrl / .ctrl.exact (시스템 수식어)
const ctrlLog = ref('')
const handleCtrlClick = () => {
  ctrlLog.value = 'Ctrl+클릭 감지 (다른 키가 같이 눌려도 동작)'
}
const handleCtrlExactClick = () => {
  ctrlLog.value = 'Ctrl+클릭(.exact) 감지 (오직 Ctrl만 눌렀을 때만 동작)'
}
</script>

<template>
  <div class="practice-section">
    <h2>이벤트 수식어(Modifiers) 학습</h2>

    <h3>1) .prevent (기본 동작 막기)</h3>
    <p>{{ linkMessage }}</p>
    <a href="https://www.naver.com" @click.prevent="handleLink">네이버 링크</a>

    <br />

    <h3>2) .stop (이벤트 버블링 막기)</h3>
    <p>{{ bubbleLog }}</p>
    <div class="parent-box" @click="handleBox">
      부모 영역 (클릭 시 반응)
      <button @click="handleChild1">버블링 발생 버튼</button>
      <button @click.stop="handleChild2">버블링 차단 버튼</button>
    </div>

    <br />

    <h3>3) .once (최초 1회만 실행)</h3>
    <p>좋아요 수: {{ likeCount }} (몇 번을 눌러도 1까지만 올라감)</p>
    <button @click.once="handleLike">좋아요</button>

    <br /><br />

    <h3>4) .self (자기 자신을 직접 클릭했을 때만 실행)</h3>
    <button @click="isModalOpen = true">모달 열기</button>
    <div v-if="isModalOpen" class="dim-overlay" @click.self="closeModal">
      <div class="modal-content">배경(Dim)을 클릭하면 닫히고, 이 박스를 클릭하면 안 닫혀요.</div>
    </div>

    <br />

    <h3>5) .enter (키보드 수식어)</h3>
    <input v-model="message" @keyup.enter="handleEnter" placeholder="입력 후 Enter" />
    <p>전송된 메시지: {{ submittedMessage }}</p>

    <br />

    <h3>6) .ctrl / .ctrl.exact (시스템 수식어)</h3>
    <p>{{ ctrlLog }}</p>
    <button @click.ctrl="handleCtrlClick">Ctrl+클릭</button>&nbsp;
    <button @click.ctrl.exact="handleCtrlExactClick">Ctrl+클릭(exact)</button>
  </div>
</template>

<style scoped>
.parent-box {
  padding: 20px;
  background-color: #eee;
}
.dim-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  max-width: 300px;
}
</style>
