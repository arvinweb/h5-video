<template>
  <div class="not-logged-in-box">
    <img class="not-logged-in" :src="notLoggedInImg" alt="" />
    <h4>您目前尚未登录</h4>
    <p>登录帐号查看精采内容</p>
    <footer>
      <van-button color="linear-gradient(to bottom, #ff5296 0%, #ff3283 44%, #ff096a 100%)" @click="onBtn"> 立即登录 </van-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import notLoggedInImg from '@/assets/images/dynamic/not-logged-in.png'
const router = useRouter()
const onBtn = () => {
  router.push({ name: 'login' })
}
</script>

<style scoped lang="less">
.not-logged-in-box {
  padding-top: 100px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  .not-logged-in {
    width: 150px;
    height: 150px;
    position: relative;
    left: 50%;
    margin-left: -75px;
  }
  h4 {
    margin-top: 30px;
    flex-grow: 0;
    font-family: PingFangSC;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.76px;
    text-align: center;
    color: #fff;
  }
  p {
    font-family: PingFangSC;
    font-size: 12px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.3px;
    text-align: center;
    color: #fff;
  }
  footer {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    :deep(.van-button) {
      width: 282px;
      height: 50px;
      border-radius: 30px;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
