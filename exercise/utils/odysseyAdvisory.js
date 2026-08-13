// 풍속(m/s)과 파고(m)를 보퍼트 풍력계급 기준으로 엮어 "출항 가능?"을 3단계로 판정한다.
// Weather Mockup 과제의 25도 기준 v-if/v-else 조건부 렌더링과 같은 결의 단순 임계값 로직.

const WIND_DANGER = 10.8 // 보퍼트 6(강풍) 이상
const WIND_CAUTION = 5.5 // 보퍼트 4(순풍~센바람) 이상
const WAVE_DANGER = 2.5
const WAVE_CAUTION = 1.25

export function getAdvisory({ windSpeedMs, waveHeightM } = {}) {
  const hasWind = typeof windSpeedMs === 'number'
  const hasWave = typeof waveHeightM === 'number'

  if (!hasWind && !hasWave) {
    return {
      level: 'unknown',
      emoji: '❓',
      title: '판정 불가',
      message: '이 지점의 날씨/해양 데이터를 아직 불러오지 못했습니다.',
    }
  }

  const isDanger = (hasWind && windSpeedMs > WIND_DANGER) || (hasWave && waveHeightM > WAVE_DANGER)
  const isCaution = (hasWind && windSpeedMs > WIND_CAUTION) || (hasWave && waveHeightM > WAVE_CAUTION)

  if (isDanger) {
    return {
      level: 'danger',
      emoji: '⚡',
      title: '포세이돈의 분노 — 출항 금지',
      message: '강풍 또는 높은 파도가 감지되었습니다. 오뒷세우스도 이 바다는 피했을 것입니다.',
    }
  }

  if (isCaution) {
    return {
      level: 'caution',
      emoji: '🌊',
      title: '주의 — 신중히 출항',
      message: '바람과 파도가 다소 거칩니다. 노잡이들을 단단히 챙기세요.',
    }
  }

  return {
    level: 'safe',
    emoji: '🌤️',
    title: '순풍 — 출항 가능',
    message: '바다가 잔잔합니다. 지금이 이타카로 향할 때입니다.',
  }
}
