<script setup>
import { ref, watch } from 'vue'

const STORAGE_KEY = 'exercise-theme'
const isDark = ref(localStorage.getItem(STORAGE_KEY) === 'dark')

// isDark 값이 바뀔 때마다 <html> 태그에 dark 클래스를 붙였다 뗐다 하고,
// 다음 방문에도 유지되도록 localStorage에 저장한다.
watch(
  isDark,
  (value) => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light')
  },
  { immediate: true },
)

const toggle = () => {
  isDark.value = !isDark.value
}
</script>

<template>
  <button type="button" class="theme-toggle-btn" @click="toggle">
    {{ isDark ? '🌙 다크모드' : '☀️ 라이트모드' }}
  </button>
</template>
