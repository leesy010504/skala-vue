<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <div class="practice-section">
    <h2>Element Plus - 상품 구매 카드</h2>
    <el-card shadow="hover" class="ui-card">
      <template #header>
        <strong>🛒 Vue 스티커북 세트</strong>
      </template>
      <p>구매 수량</p>
      <el-input-number v-model="productQuantity" :min="1" :max="10" class="quantity-input" />
      <p>상품 평점</p>
      <el-rate v-model="productRate" />
      <p class="rate-info">선택 수량: {{ productQuantity }}개 / 평점: {{ productRate }}점</p>
    </el-card>
  </div>
</template>
