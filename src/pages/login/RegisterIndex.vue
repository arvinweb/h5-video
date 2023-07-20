<template>
  <div class="register-container">
    <van-nav-bar :fixed="true" :title="'注册'">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <header>
      <van-image
        class="swipe-item-img"
        :width="baseSetRem(110, 'px')"
        :height="baseSetRem(110, 'px')"
        :src="baseAddRequestPrefix(homeStore.homeConfig?.logoUrl)"
        fit="fill"
      >
        <template #loading>
          <div class="default-bg-img-box">加载中...</div>
        </template>
      </van-image>
      <h2>{{ homeStore?.homeConfig?.name }}</h2>
    </header>
    <van-form>
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          maxlength="24"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="form.password"
          :type="passwordType"
          name="密码"
          label="密码"
          maxlength="24"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #button>
            <van-icon size="24" v-show="passwordType === 'password'" @click="passwordType = 'text'" name="eye-o" />
            <van-icon size="24" v-show="passwordType === 'text'" @click="passwordType = 'password'" name="closed-eye" />
          </template>
        </van-field>
        <van-field
          v-model="form.confirmPassword"
          :type="confirmPasswordType"
          name="确认密码"
          label="确认密码"
          maxlength="24"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        >
          <template #button>
            <van-icon size="24" v-show="confirmPasswordType === 'password'" @click="confirmPasswordType = 'text'" name="eye-o" />
            <van-icon
              size="24"
              v-show="confirmPasswordType === 'text'"
              @click="confirmPasswordType = 'password'"
              name="closed-eye"
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button
          round
          block
          type="primary"
          color="linear-gradient(to right, #fc671e, #ff6034)"
          :loading="loading"
          :disabled="disabled"
          native-type="submit"
          @click="onRegister"
        >
          立即注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { useLogin } from './composables/login'
import { baseAddRequestPrefix, baseSetRem } from '@/utils/base'
const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()
const { form, loading, onRegister } = useLogin()
const passwordType = ref<any>('password')
const confirmPasswordType = ref<any>('password')
const disabled = computed(() => {
  let reslut = true
  if (form.username.length > 4 && form.password.length > 4 && form.password === form.confirmPassword) {
    reslut = false
  }
  return reslut
})

const onBtn = () => {
  showSuccessToast('登录成功')
  userStore.setUserInfo({
    id: '1',
    isSuper: 1,
    token: '51e8b72ac1044b16965454353f140fdda9e5c',
    username: '游客账号1234',
    type: 0,
    money: 0,
    total: '',
    goldCoin: ''
  })
  router.push('/')
}
const onClickLeft = () => {
  router.back()
}
</script>

<style scoped lang="less">
.register-container {
  padding-top: 46px;
  height: 100%;
  background: #fff;
  header {
    padding: 20px;
    text-align: center;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto;
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
      padding: 20px;
    }
  }
}
</style>
