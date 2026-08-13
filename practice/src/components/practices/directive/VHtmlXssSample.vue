<script setup>
import { ref } from 'vue'
import DOMPurify from 'dompurify'

const inputValue = ref('')
const message = ref('')

// xss 방어 추가
function showMessage() {
  message.value = DOMPurify.sanitize(inputValue.value)
}
</script>

<template>
  <div class="practice-section">
    <h2>v-html XSS 학습</h2>

    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showMessage">확인</button>

    <div v-html="message"></div>
  </div>
</template>
