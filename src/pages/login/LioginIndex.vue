<template>
  <div class="login-container">
    <van-nav-bar :fixed="true" :title="'登录'">
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
          @click="onSubmit"
        >
          登录
        </van-button>
      </div>
      <div style="margin: 16px" v-if="userStore.token != '-1'">
        <van-button round block type="primary" native-type="submit" color="#FF5D04" plain @click="onBtn"> 游客登录 </van-button>
      </div>
    </van-form>
    <footer>
      <div @click="toPage('/register')" class="register-btn">立即注册</div>
      <div class="forget-password-btn" @click="onForgetPassword">忘记密码</div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useLogin } from './composables/login'
import { baseAddRequestPrefix, baseSetRem } from '@/utils/base'
const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()
const { form, loading, onSubmit } = useLogin()
const passwordType = ref<any>('password')
const disabled = computed(() => {
  let reslut = true
  if (form.username.length > 4 && form.password.length > 4) {
    reslut = false
  }
  return reslut
})
const onBtn = () => {
  showSuccessToast('登录成功')
  const num = Math.random().toString().slice(-6)
  userStore.setUserInfo({
    id: '-1',
    isSuper: 1,
    token: '-1',
    type: 0,
    username: '游客账号_' + num,
    money: 0,
    total: '',
    goldCoin: '0'
  })
  router.push('/')
}
const onClickLeft = () => {
  router.back()
}
const toPage = (url: string) => {
  router.push(url)
}
const onForgetPassword = () => {
  showToast('后续开发')
}
</script>

<style scoped lang="less">
.login-container {
  padding-top: 66px;
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
  footer {
    padding: 0 20px;
    div {
      display: inline-block;
      color: #ff5d04;
    }
    .register-btn {
      float: left;
    }
    .forget-password-btn {
      float: right;
    }
  }
}
</style>
