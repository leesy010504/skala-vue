import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// 좌표 기준 현재 날씨 조회 (커리큘럼 7장 Axios 예제와 동일한 엔드포인트)
export async function fetchCurrentWeather(lat, lon) {
  if (!API_KEY) {
    console.warn('[weatherApi] VITE_OPENWEATHER_API_KEY가 설정되지 않았습니다. .env.local을 확인하세요.')
    return null
  }

  const url = 'https://api.openweathermap.org/data/2.5/weather'
  const response = await axios.get(url, {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  const data = response.data
  return {
    tempC: data.main?.temp ?? null,
    description: data.weather?.[0]?.description ?? '알 수 없음',
    windSpeedMs: data.wind?.speed ?? null,
    windDeg: data.wind?.deg ?? null,
  }
}
