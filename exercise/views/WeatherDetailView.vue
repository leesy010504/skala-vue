<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

// 라우터 ID 파라미터를 실제 OpenWeatherMap 쿼리용 영문/한글 명칭과 매핑하는 사전 장부
const cityMapping = {
  city_01: { english: 'Seoul', korean: '대한민국 서울특별시' },
  city_02: { english: 'Suwon', korean: '경기도 수원시 영통구' },
  city_03: { english: 'Busan', korean: '부산광역시 해운대구' },
}

const cityData = ref(null)
const isLoading = ref(false)

onMounted(async () => {
  const id = route.params.cityId
  const targetCity = cityMapping[id]

  if (targetCity) {
    isLoading.value = true
    try {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather` + `?q=${targetCity.english}&appid=${API_KEY}&units=metric&lang=kr`)

      const raw = response.data
      // 화면 템플릿 구조가 깨지지 않도록 JSON 알맹이를 정확히 역매핑
      cityData.value = {
        name: targetCity.korean,
        temp: raw.main.temp, // 섭씨 온도 원본 기록
        status: raw.weather[0].description,
        humidity: `${raw.main.humidity}%`,
        wind: `${raw.wind.speed}m/s`,
      }
    } catch (error) {
      console.error('🔴 상세 정보 로딩 중 네트워크 에러 발생:', error)
    } finally {
      isLoading.value = false
    }
  }
})

// 🔥 [핵심 과제] 상세 정보창에서도 화씨 상태일 때 기온을 자동 변환
const displayTemp = computed(() => {
  if (!cityData.value) return 0 // 아직 못 불러왔을 때 대비
  const rawTemp = cityData.value.temp // 원본 섭씨 온도
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 공식 적용
  }
  return rawTemp // celsius 상태일 땐 원본 반환
})
</script>

<template>
  <div class="detail-container">
    <h3>📊 지역별 상세 기상 관측 정보 (실시간 데이터 연동)</h3>
    <hr />

    <div v-if="isLoading" style="text-align: center; padding: 20px 0; color: #7f8c8d">데이터베이스로부터 상세 정보를 동기화하는 중입니다...</div>

    <template v-else>
      <div v-if="cityData" class="info-card">
        <h4>📍 지정 지역: {{ cityData.name }}</h4>
        <p>
          실시간 기온: <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
        </p>
        <p>기상 현황: {{ cityData.status }}</p>
        <p>대기 습도: {{ cityData.humidity }}</p>
        <p>현재 풍속: {{ cityData.wind }}</p>
      </div>
      <div v-else>
        <p>해당 지역의 상세 데이터 장부가 존재하지 않거나 에러가 발생했습니다.</p>
      </div>
    </template>

    <el-button class="back-btn" @click="router.push('/')">← 메인 대시보드로 돌아가기</el-button>
  </div>
</template>

<style scoped>
.detail-container {
  padding: 10px 0;
}
.info-card {
  background: var(--surface-muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  line-height: 1.8;
  color: var(--text);
}
.back-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background: var(--accent);
  color: var(--accent-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.back-btn:hover {
  opacity: 0.85;
}
</style>
