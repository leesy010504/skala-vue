<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <div>
    <h3>ℹ️ 서비스 소개</h3>
    <hr />
    <div class="description-box">
      본 앱은 Vue 3 및 Vue Router 4 기반 제작된 실습용 가상 관측 대시보드 시스템입니다.
      <ul>
        <li>components/exercise/ 폴더 내부의 독립 부품 연동</li>
        <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
        <li>URL 쿼리 스트링 매핑을 활용한 실시간 검색 상태 동기화</li>
      </ul>
    </div>
    <button @click="handleGoHome" class="home-btn">🏠 대시보드 홈으로 이동</button>
  </div>
</template>

<style scoped>
.description-box {
  background: var(--surface-muted);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  line-height: 1.8;
  color: var(--text);
}
.description-box ul {
  margin: 10px 0 0;
  padding-left: 20px;
}
.home-btn {
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
.home-btn:hover {
  opacity: 0.85;
}
</style>
