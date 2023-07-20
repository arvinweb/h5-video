<template>
  <div class="tbs-search-box">
    <header>
      <van-row>
        <van-col span="4">
          <img class="logo" :src="logoImg" alt="" />
        </van-col>
        <van-col span="17">
          <input type="text" @click="router.push('/search?urlType=1')" />
          <van-icon size="20" :name="sreachImg" />
        </van-col>
        <van-col class="flex-right" span="3">
          <ToNotify></ToNotify>
        </van-col>
      </van-row>
    </header>
  </div>
</template>

<script setup lang="ts">
import logoImg from '@/assets/images/logo.png'
import sreachImg from '@/assets/images/video/sreach.png'

// 初始化pinia
const homeStore = useHomeStore()
const userStore = useUserStore()

const router = useRouter()
</script>

<style scoped lang="less">
.tbs-search-box {
  height: 60px;
  header {
    background-image: linear-gradient(to bottom, #000619 0%, #0f1925 100%);
    .logo {
      width: 38px;
      height: 38px;
    }
    .the-bell-img {
      width: 20px;
      height: 20px;
    }
    .van-row {
      padding: 11px 20px;
    }
    .van-row,
    .van-col {
      display: flex;
      align-items: center;
      position: relative;
    }
    .van-col--3 {
      justify-content: center;
      align-items: center;
    }
    input {
      width: 100%;
      border-style: none;
      background-color: #1b2431;
      border-radius: 20px;
      height: 32px;
    }
    i {
      position: absolute;
      right: 10px;
      color: #474f59;
    }
    .tabs-box {
      display: flex;
      overflow-x: auto;
      padding-left: 12px;
      background-color: #0e1621;
      & > div {
        padding: 15px 8px;
        font-size: 16px;
        white-space: nowrap;
        font-weight: 400;
        display: inline-block;
        // color: rgba(255, 255, 255, 0.7);
        color: #fff;
      }
      .tab-active {
        color: #f94f92;
        font-weight: 600;
      }
      .tab-active::after {
        content: '';
        display: block;
        background: #f94f92;
        width: 100%;
        height: 2px;
        position: relative;
        top: 5px;
        transition-duration: 0.8s;
      }
    }
    .tabs-box::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
