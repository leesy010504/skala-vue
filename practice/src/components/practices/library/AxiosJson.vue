<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 1. 백엔드 공용 주소
const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

// 2. 반응형 상태 데이터
const items = ref([]) // 서버에서 받아온 데이터 배열 박스
const textInput = ref('') // 입력창과 연결된 글자 데이터 박스

// ----------------------------------------------------
// [READ] GET : 데이터 가져오기
// ----------------------------------------------------
const handleRead = async () => {
  try {
    // 공부용으로 딱 3개만 들고 옵니다.
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    console.log('GET 성공:', response.data)
  } catch (error) {
    console.error('GET 실패:', error)
  }
}

// ----------------------------------------------------
// [CREATE] POST : 새 데이터 등록하기
// ----------------------------------------------------
const handleCreate = async () => {
  if (!textInput.value) return

  try {
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '실습으로 추가한 게시글입니다.',
      userId: 1,
    })
    // JSONPlaceholder는 실제로 저장하지 않고 id:101을 붙여 흉내만 내주므로, 화면에서는 직접 목록 맨 앞에 얹어준다.
    items.value.unshift(response.data)
    textInput.value = ''
    console.log('POST 성공:', response.data)
  } catch (error) {
    console.error('POST 실패:', error)
  }
}

// ----------------------------------------------------
// [UPDATE] PUT : 기존 데이터 수정하기
// ----------------------------------------------------
const handleUpdate = async (item) => {
  try {
    const response = await axios.put(`${BASE_URL}/${item.id}`, {
      ...item,
      title: `${item.title} (수정됨)`,
    })
    // 서버가 돌려준 결과로 화면의 해당 항목만 교체
    const index = items.value.findIndex((i) => i.id === item.id)
    items.value[index] = response.data
    console.log('PUT 성공:', response.data)
  } catch (error) {
    console.error('PUT 실패:', error)
  }
}

// ----------------------------------------------------
// [DELETE] DELETE : 데이터 삭제하기
// ----------------------------------------------------
const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    // 삭제 성공 시 서버는 빈 응답을 주므로, 화면 목록에서 직접 걸러낸다.
    items.value = items.value.filter((item) => item.id !== id)
    console.log('DELETE 성공: id =', id)
  } catch (error) {
    console.error('DELETE 실패:', error)
  }
}

// 컴포넌트가 화면에 부착되는 즉시 목록을 한 번 조회해 온다.
onMounted(() => {
  handleRead()
})
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios CRUD 프로토타입 훈련 (JSONPlaceholder)</h2>

    <input
      v-model="textInput"
      placeholder="저장할 텍스트를 입력하세요"
      @keyup.enter="handleCreate"
    />
    <button @click="handleCreate">POST (추가)</button>

    <div v-for="item in items" :key="item.id" class="result-card">
      <p>ID: {{ item.id }}</p>
      <p>{{ item.title }}</p>
      <button @click="handleUpdate(item)">PUT (수정)</button>
      <button @click="handleDelete(item.id)">DEL (삭제)</button>
    </div>
  </div>
</template>
