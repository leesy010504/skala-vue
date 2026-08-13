<script setup>
defineEmits(['go-story'])
</script>

<template>
  <div>
    <h3>ℹ️ 서비스 소개</h3>
    <hr />
    <div class="description-box">
      오뒷세우스가 트로이아에서 이타카로 돌아가는 신화 속 항로에, 실제 기상 데이터를 입혀 "지금 출항해도 되는가"를 알려주는 실습 페이지입니다.
      <ul>
        <li>지도 위 14개 지점은 학자들 사이에서도 이견이 있는 <strong>전설적 추정 좌표</strong>입니다.</li>
        <li>날씨(풍속·기온)는 OpenWeatherMap, 파고는 Open-Meteo Marine API에서 실시간으로 가져옵니다.</li>
        <li>풍속이 강하거나 파고가 높으면 "포세이돈의 분노 – 출항 금지"로 판정됩니다.</li>
      </ul>
    </div>
    <el-button class="home-btn" type="primary" @click="$emit('go-story')">🗺️ 지도 및 이야기로 이동</el-button>
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
  width: 100%;
}
</style>
