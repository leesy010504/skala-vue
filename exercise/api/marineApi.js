import axios from 'axios'

// Open-Meteo Marine API — 무료, API 키 불필요. 근해/내해 좌표는 데이터가 없을 수 있어
// null을 반환하는 것을 정상 흐름으로 취급한다 (호출부에서 "해양 데이터 없음" 폴백 처리).
export async function fetchWaveHeight(lat, lon) {
  const url = 'https://marine-api.open-meteo.com/v1/marine'

  try {
    const response = await axios.get(url, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'wave_height,swell_wave_height',
      },
    })

    const current = response.data?.current
    if (!current || current.wave_height == null) {
      return null
    }

    return {
      waveHeightM: current.wave_height,
      swellWaveHeightM: current.swell_wave_height ?? null,
    }
  } catch (error) {
    console.warn('[marineApi] 해양 데이터 조회 실패 (근해 좌표일 가능성):', error.message)
    return null
  }
}
