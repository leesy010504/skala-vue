# skala-vue 종합실습

Vue 3 (Composition API)로 만든 날씨 대시보드 종합실습 프로젝트입니다. 화면 상단 탭으로 과제별 결과물을 확인할 수 있습니다.

## 실행 방법

```bash
npm install
```

`.env.local` 파일을 프로젝트 루트에 만들고 아래 값을 채워주세요. (OpenWeatherMap 가입 후 My API keys에서 발급)

```
VITE_OPENWEATHER_API_KEY=발급받은키
VITE_WEATHER_API_KEY=발급받은키
```

```bash
npm run dev
```

## 탭 구성

- **과제 1** — v-for, v-if/v-else, 한글 입력(:value/@input), 이벤트/수식어를 한 화면에 통합한 날씨 목업
- **과제 2-1** — Composition API로 다시 짠 버전. computed로 검색 필터링, watch/watchEffect 실습
- **과제 2-2** — 위 화면을 BaseDashboardCard / SearchBar / WeatherCard로 컴포넌트 분리 (props/emits)
- **과제 3** — Vue Router로 목록/상세 페이지 분리, Pinia(configStore)로 섭씨·화씨 전역 토글, Axios로 OpenWeatherMap 실시간 데이터 연동, Element Plus로 검색창/버튼 일부 교체
- **최종본** — 개인 과제. 오뒷세우스가 트로이아에서 이타카로 돌아가는 항로의 실제 좌표에 실시간 날씨(OpenWeatherMap)와 파고(Open-Meteo Marine) 데이터를 입혀 "지금 출항해도 되는지"를 판정해주는 지도 기반 페이지

## 사용 기술

Vue 3, Vue Router, Pinia, Axios, Element Plus, Leaflet(@vue-leaflet), Vite

## 코드 품질

```bash
npm run lint     # oxlint + eslint
npm run format   # prettier
```

## 참고

- 지도 위 신화 속 지점의 좌표는 학자들 사이에서도 여러 설이 있는 전설적 추정치입니다.
- OpenWeatherMap 키는 무료 티어라 발급 직후 최대 몇 시간 정도 활성화 대기 시간이 있을 수 있습니다.
