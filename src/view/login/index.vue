<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>hello</h1>
          <h2>欢迎</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              :prefix-icon="Lock"
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user' // ✅ 正确的 store
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router' // ✅ 导入 useRouter

const userStore = useUserStore()
const router = useRouter() // ✅ 获取 router 实例

let loading = ref(false) 

// 注意：password 末尾不要有空格
let loginForm = reactive({ username: 'admin', password: '111' })

// ✅ 添加 async
const login = async () => {
  loading.value = true;
  try {
    // ✅ 只调用一次，且使用正确的 userStore
    await userStore.userLogin(loginForm)
    
    // ✅ 使用 router 而不是 $router
    router.push('/')
    
    ElNotification({
      type: 'success',
      message: '登录成功'
    })
    loading.value=false
  } catch (error) {
    loading.value=false
    // 建议至少打印错误，方便调试
    console.error('登录失败:', error)
    ElNotification({
      type: 'error',
      message: '登录失败，请重试'
    })
  }
}
</script>

<style scoped lang="scss">
/* 注意：是 lang="scss"，不是 long="scss" */
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 10px 0;
  }
}
.login_btn {
  width: 100%;
}
</style>