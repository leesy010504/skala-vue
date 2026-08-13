<script setup>
import { ref, computed, onMounted } from 'vue'
import { odysseyRoute } from '@/data/odysseyRoute.js'
import { fetchCurrentWeather } from '@/api/weatherApi.js'
import { fetchWaveHeight } from '@/api/marineApi.js'
import { getAdvisory } from '@/utils/odysseyAdvisory.js'
import OdysseyRouteMap from './OdysseyRouteMap.vue'
import OdysseyWaypointCard from './OdysseyWaypointCard.vue'
import OdysseyAdvisoryBanner from './OdysseyAdvisoryBanner.vue'
import OdysseyProgressTrack from './OdysseyProgressTrack.vue'
import OdysseySearch from './OdysseySearch.vue'
import OdysseyAbout from './OdysseyAbout.vue'

// 신화 원본 데이터를 실시간 날씨/파고/판정을 담을 필드와 함께 반응형으로 복제
const waypoints = ref(odysseyRoute.map((wp) => ({ ...wp, weather: null, wave: null, advisory: null })))
const selectedId = ref(odysseyRoute[0].id)
const isLoading = ref(true)
const loadError = ref('')

// 과제 3(Vue Router 날씨 대시보드 | 서비스 소개)과 같은 구조의 서브 탭 3개
const sections = [
  { key: 'search', label: '🔍 검색' },
  { key: 'about', label: 'ℹ️ 소개' },
  { key: 'story', label: '🗺️ 지도 및 이야기' },
]
const activeSection = ref('search')

const orderedWaypoints = computed(() => [...waypoints.value].sort((a, b) => a.order - b.order))
const selectedWaypoint = computed(() => waypoints.value.find((wp) => wp.id === selectedId.value) ?? null)

function selectWaypoint(id) {
  selectedId.value = id
}

// 검색 결과를 클릭하면 선택과 동시에 지도 탭으로 바로 넘어간다
function selectFromSearch(id) {
  selectWaypoint(id)
  activeSection.value = 'story'
}

// 지점 하나의 날씨+파고를 병렬로 가져와 채운다. 마린 API는 근해 좌표에서 null이 나올 수 있으므로
// allSettled로 감싸 한쪽이 실패해도 나머지 지점/데이터에 영향이 없도록 한다.
async function loadWaypointData(waypoint) {
  const [weatherResult, waveResult] = await Promise.allSettled([fetchCurrentWeather(waypoint.lat, waypoint.lon), fetchWaveHeight(waypoint.lat, waypoint.lon)])

  waypoint.weather = weatherResult.status === 'fulfilled' ? weatherResult.value : null
  waypoint.wave = waveResult.status === 'fulfilled' ? waveResult.value : null
  waypoint.advisory = getAdvisory({
    windSpeedMs: waypoint.weather?.windSpeedMs,
    waveHeightM: waypoint.wave?.waveHeightM,
  })
}

onMounted(async () => {
  try {
    await Promise.all(waypoints.value.map((wp) => loadWaypointData(wp)))
  } catch (error) {
    loadError.value = '데이터를 불러오는 중 문제가 발생했습니다.'
    console.error('[OdysseyVoyage] 전체 로딩 실패:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="odyssey-voyage">
    <p class="odyssey-disclaimer">⚠️ 각 지점의 좌표는 학자들 사이에서도 이견이 있는 <strong>전설적 추정 위치</strong>입니다. 날씨·파고는 실제 API 데이터입니다.</p>

    <nav class="navigation-bar">
      <template v-for="(section, index) in sections" :key="section.key">
        <button type="button" class="nav-item odyssey-nav-btn" :class="{ 'is-active': activeSection === section.key }" @click="activeSection = section.key">
          {{ section.label }}
        </button>
        <span v-if="index < sections.length - 1" class="divider">|</span>
      </template>
    </nav>

    <p v-if="isLoading" class="odyssey-loading">🌬️ 지중해 전역의 바람과 파도를 살피는 중...</p>
    <p v-if="loadError" class="odyssey-error">{{ loadError }}</p>

    <OdysseySearch v-if="activeSection === 'search'" :waypoints="orderedWaypoints" @select="selectFromSearch" />

    <OdysseyAbout v-else-if="activeSection === 'about'" @go-story="activeSection = 'story'" />

    <template v-else>
      <OdysseyRouteMap :waypoints="orderedWaypoints" :selected-id="selectedId" @select="selectWaypoint" />

      <OdysseyProgressTrack :waypoints="orderedWaypoints" :selected-id="selectedId" @select="selectWaypoint" />

      <OdysseyAdvisoryBanner :waypoint="selectedWaypoint" :advisory="selectedWaypoint?.advisory" />

      <div class="odyssey-grid">
        <OdysseyWaypointCard v-for="wp in orderedWaypoints" :key="wp.id" :waypoint="wp" :selected="wp.id === selectedId" @select="selectWaypoint" />
      </div>
    </template>
  </div>
</template>
