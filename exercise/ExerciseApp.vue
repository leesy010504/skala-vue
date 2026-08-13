<script setup>
import { ref, watch } from 'vue'
import WeatherMockup from './components/exercise/WeatherMockup.vue'
import WeatherComposition from './components/exercise/WeatherComposition.vue'
import WeatherParent from './components/exercise/WeatherParent.vue'
import ThemeToggler from './components/exercise/ThemeToggler.vue'
import UnitToggler from './components/exercise/UnitToggler.vue'
import OdysseyVoyage from './components/exercise/OdysseyVoyage.vue'

const tabs = [
  { key: 'mockup', label: '과제 1' },
  { key: 'composition', label: '과제 2-1' },
  { key: 'component', label: '과제 2-2' },
  { key: 'router', label: '과제 3' },
  { key: 'final', label: '최종본' },
]

// 새로고침해도 마지막에 보던 탭을 유지하기 위해 localStorage에 저장/복원한다.
const STORAGE_KEY = 'exercise-active-tab'
const savedTab = localStorage.getItem(STORAGE_KEY)
const isValidTab = tabs.some((tab) => tab.key === savedTab)
const activeTab = ref(isValidTab ? savedTab : 'mockup')

watch(activeTab, (newTab) => {
  localStorage.setItem(STORAGE_KEY, newTab)
})
</script>

<template>
  <div class="app-container">
    <div class="theme-toggle-bar">
      <ThemeToggler />
    </div>
    <h1>⛅ 날씨 대시보드 (과제 1, 2-1, 2-2, 3, 최종본)</h1>
    <nav class="task-tab-bar">
      <button v-for="tab in tabs" :key="tab.key" type="button" class="task-tab" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
        {{ tab.label }}
      </button>
    </nav>
    <hr />

    <WeatherMockup v-if="activeTab === 'mockup'" />
    <WeatherComposition v-else-if="activeTab === 'composition'" />
    <WeatherParent v-else-if="activeTab === 'component'" />
    <div v-else-if="activeTab === 'router'" class="dashboard-wrapper">
      <nav class="navigation-bar">
        <RouterLink to="/" class="nav-item">☁️ 날씨 대시보드</RouterLink>
        <span class="divider">|</span>
        <RouterLink to="/about" class="nav-item">ℹ️ 서비스 소개</RouterLink>
        <UnitToggler />
      </nav>
      <main>
        <RouterView />
      </main>
    </div>
    <OdysseyVoyage v-else-if="activeTab === 'final'" />
  </div>
</template>

<style>
@import '@/assets/exercise.css';
@import '@/assets/odyssey.css';
</style>
