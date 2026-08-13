<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push({ name: 'WeatherHome' })
}
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-icon">🌤️❓</div>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <p>요청하신 주소가 존재하지 않거나,<br />아직 개발되지 않았습니다.</p>
      <button class="home-button" @click="goHome">날씨 메인으로 이동</button>
    </div>
  </div>
</template>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
.not-found-content {
  text-align: center;
  background: var(--surface-muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 30px;
  width: 100%;
  color: var(--text);
}
.error-icon {
  font-size: 2.5rem;
  margin-bottom: 10px;
}
.home-button {
  margin-top: 15px;
  padding: 10px 20px;
  background: var(--accent);
  color: var(--accent-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.home-button:hover {
  opacity: 0.85;
}
</style>
