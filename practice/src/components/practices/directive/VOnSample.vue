<script setup>
import { ref } from 'vue'

// 1) 인라인 핸들러용
const count = ref(0)

// 2) 메서드 핸들러용
function showAlert() {
  alert('함수가 성공적으로 호출되었습니다!')
}

// 3) input vs change 차이 확인용
const inputLog = ref('')
const changeLog = ref('')

// 4) keydown vs keyup 차이 확인용
const lastKeydown = ref('')
const lastKeyup = ref('')

// 5) mouseenter / mouseleave 상태 확인용
const isHovering = ref(false)

// 6) submit 이벤트 확인용
const username = ref('')
const submittedName = ref('')
function handleSubmit(e) {
  e.preventDefault() // 수식어 없이 이벤트 객체로 직접 새로고침 방지
  submittedName.value = username.value
}
</script>

<template>
  <div class="practice-section">
    <h2>v-on 이벤트 핸들링 (@)</h2>

    <h3>1) 인라인 핸들러</h3>
    <p>현재 카운트: {{ count }}</p>
    <button @click="count++">1씩 증가</button>

    <br />

    <h3>2) 메서드 핸들러</h3>
    <button @click="showAlert">알림창 띄우기</button>

    <br />

    <h3>3) input vs change</h3>
    <input v-model="inputLog" @change="changeLog = inputLog" placeholder="입력해보세요" />
    <p>input(입력할 때마다): {{ inputLog }}</p>
    <p>change(포커스를 벗어나야): {{ changeLog }}</p>

    <br />

    <h3>4) keydown vs keyup</h3>
    <input
      @keydown="lastKeydown = $event.key"
      @keyup="lastKeyup = $event.key"
      placeholder="키를 눌러보세요"
    />
    <p>keydown(누르는 순간): {{ lastKeydown }}</p>
    <p>keyup(떼는 순간): {{ lastKeyup }}</p>

    <br />

    <h3>5) mouseenter / mouseleave</h3>
    <div class="hover-box" @mouseenter="isHovering = true" @mouseleave="isHovering = false">
      마우스를 올려보세요
    </div>
    <p>현재 호버 상태: {{ isHovering }}</p>

    <br />

    <h3>6) submit</h3>
    <form @submit="handleSubmit">
      <input v-model="username" placeholder="이름 입력" />
      <button type="submit">제출</button>
    </form>
    <p>제출된 이름: {{ submittedName }}</p>
  </div>
</template>

<style scoped>
.hover-box {
  padding: 20px;
  text-align: center;
  background-color: #f1f3f5;
  border: 1px solid #ced4da;
  border-radius: 4px;
  transition: background-color 0.15s ease;
}
</style>
