<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { LMap, LTileLayer, LMarker, LPolyline, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

// Vite 번들 환경에서 Leaflet 기본 마커 아이콘 경로가 깨지는 문제를 해결 (모듈 최초 로드 시 1회만 실행)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl })

// 선택된 지점 전용 마커: 펄스 링 + 흔들리는 배(⛵) 아이콘 (odyssey.css의 @keyframes 사용)
const selectedIcon = L.divIcon({
  className: 'odyssey-marker-selected-wrapper',
  html: '<span class="odyssey-marker-selected-ring"></span><span class="odyssey-marker-ship">⛵</span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
})

const props = defineProps({
  waypoints: { type: Array, required: true },
  selectedId: { type: String, default: null },
})

defineEmits(['select'])

const mapCenter = [37.5, 18] // 지중해 중앙 대략 좌표
const selectedWaypoint = computed(() => props.waypoints.find((wp) => wp.id === props.selectedId) ?? null)
const selectedOrder = computed(() => selectedWaypoint.value?.order ?? 0)

// 항로를 "이미 지나온 구간(금색 실선)"과 "앞으로 갈 구간(보라 점선)"으로 나눈다.
// 선택 지점이 없으면 전체를 미답파 구간으로 취급한다.
const traveledPoints = computed(() => props.waypoints.filter((wp) => wp.order <= selectedOrder.value).map((wp) => [wp.lat, wp.lon]))
const remainingPoints = computed(() => props.waypoints.filter((wp) => wp.order >= selectedOrder.value).map((wp) => [wp.lat, wp.lon]))

const mapRef = ref(null)

// 선택 지점이 바뀔 때마다 지도가 그 좌표로 부드럽게 이동
watch(
  () => props.selectedId,
  async (id) => {
    const target = props.waypoints.find((wp) => wp.id === id)
    if (!target) return
    await nextTick()
    mapRef.value?.leafletObject?.flyTo([target.lat, target.lon], 6, { duration: 0.6 })
  },
)
</script>

<template>
  <div class="odyssey-map">
    <LMap ref="mapRef" :zoom="5" :center="mapCenter" :use-global-leaflet="false">
      <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />

      <!-- 두 폴리라인 모두 selectedId를 key에 물려서, 선택이 바뀔 때마다 깨끗하게 다시 그린다
           (vue-leaflet의 prop reactivity가 불안정한 걸 확인했기 때문에 강제 리마운트로 우회) -->
      <LPolyline v-if="traveledPoints.length > 1" :key="`traveled-${selectedId}`" :lat-lngs="traveledPoints" color="#f5b301" :weight="4" />
      <LPolyline :key="`remaining-${selectedId}`" :lat-lngs="remainingPoints" color="#8e6cff" :weight="3" :dash-array="'6,8'" />

      <LMarker v-for="wp in waypoints" :key="wp.id" :lat-lng="[wp.lat, wp.lon]" :opacity="wp.id === selectedId ? 1 : 0.7" @click="$emit('select', wp.id)">
        <LTooltip>#{{ wp.order }} {{ wp.nameKorean }}</LTooltip>
      </LMarker>

      <!-- 선택된 지점 위에만 얹는 배 마커 오버레이 (v-if로 마운트/언마운트하여
           vue-leaflet의 icon prop 스왑 시 발생하는 내부 크래시를 피한다) -->
      <LMarker
        v-if="selectedWaypoint"
        :key="`highlight-${selectedWaypoint.id}`"
        :lat-lng="[selectedWaypoint.lat, selectedWaypoint.lon]"
        :icon="selectedIcon"
        :interactive="false"
        :z-index-offset="1000"
      />
    </LMap>
  </div>
</template>
