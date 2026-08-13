<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'

const router = useRouter()
const route = useRoute()

// [고도화] 실제 외부 API 데이터를 받아와 채워줄 빈 반응형 배열과 로딩 상태 정의
const weatherList = ref([])
const searchQuery = ref('')
const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')
const isLoading = ref(false)

// OpenWeatherMap 필수 연동 규격 정의
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// 3개 도시의 실제 실시간 데이터를 병렬로 긁어오는 비동기 파이프라인 함수
const fetchRealTimeWeather = async () => {
  isLoading.value = true
  try {
    const [seoulRes, suwonRes, busanRes] = await Promise.all([
      axios.get(`${BASE_URL}?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Suwon&appid=${API_KEY}&units=metric&lang=kr`),
      axios.get(`${BASE_URL}?q=Busan&appid=${API_KEY}&units=metric&lang=kr`),
    ])

    // 기존 자식 컴포넌트(WeatherCard)가 요구하는 프로퍼티 규격에 맞춰 JSON 알맹이 맵핑
    weatherList.value = [
      { id: 'city_01', name: '서울', temp: seoulRes.data.main.temp, status: seoulRes.data.weather[0].description },
      { id: 'city_02', name: '수원', temp: suwonRes.data.main.temp, status: suwonRes.data.weather[0].description },
      { id: 'city_03', name: '부산', temp: busanRes.data.main.temp, status: busanRes.data.weather[0].description },
    ]
    console.log('🟢 [API 통신 완료] 실시간 기상 장부 동기화:', weatherList.value)
  } catch (error) {
    console.error('🔴 날씨 API 연동 실패:', error)
  } finally {
    isLoading.value = false
  }
}

// 초기 마운트 시 주소창의 쿼리(?search=) 스트링 읽어서 상태 복원
onMounted(() => {
  if (route.query.search) {
    searchQuery.value = route.query.search
  }
  fetchRealTimeWeather() // ★ 장착 직후 실시간 데이터 호출
})

// 타이핑될 때마다 주소창의 쿼리 스트링 값을 실시간 푸시 개편
watch(searchQuery, (newQuery) => {
  router.push({
    path: route.path,
    query: { search: newQuery || undefined },
  })
})

// ⚠ 기존 computed 는 그대로 둔다. 지우면 템플릿이 이 이름을 못 찾아 화면이 빈다
const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return weatherList.value
  return weatherList.value.filter((item) => item.name.includes(query))
})

// 자식 카드 컴포넌트의 상세보기 신호를 받으면 해당 ID 주소로 라우터 점프 실행
const handleDetailJump = (id) => {
  router.push(`/weather/${id}`)
}
</script>

<template>
  <div class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="(val) => (searchQuery = val)" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황 (실시간 기상청 연동)</h3>

      <p v-if="isLoading" style="text-align: center; color: #3498db; font-weight: bold; padding: 20px 0">🛰️ 글로벌 기상 위성으로부터 실시간 기상 데이터를 수신 중입니다...</p>

      <template v-else>
        <WeatherCard v-for="item in filteredWeatherList" :key="item.id" :city-item="item" @select-card="(msg) => (selectedCityInfo = msg)" @click-detail="handleDetailJump(item.id)" />
        <p v-if="filteredWeatherList.length === 0" style="text-align: center; color: #e74c3c; padding: 10px 0">😢 검색 결과와 일치하는 도시가 없습니다.</p>
      </template>
    </BaseDashboardCard>

    <div class="status-bar">{{ selectedCityInfo }}</div>
  </div>
</template>

<style scoped>
.status-bar {
  background: var(--success-bg);
  padding: 10px;
  text-align: center;
  color: var(--success-text);
  font-weight: bold;
  border-radius: 6px;
}
</style>
