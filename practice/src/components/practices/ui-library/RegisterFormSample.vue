<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('⚠️ 이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <div class="practice-section">
    <h2>Element Plus - 회원가입 폼</h2>
    <el-card shadow="hover" class="ui-card">
      <template #header>
        <strong>📝 신규 회원가입</strong>
      </template>
      <el-input
        v-model="userForm.email"
        placeholder="이메일 주소를 입력하세요"
        class="email-input"
      />
      <div class="agree-row">
        <el-switch v-model="userForm.agree" />
        <span>이용약관에 동의합니다</span>
      </div>
      <el-button type="primary" @click="handleRegister">회원가입</el-button>
    </el-card>
  </div>
</template>
