<template>
  <div class="swiper-box">
    <van-swipe class="my-swipe" style="height: 168px" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in videoStore.swiperCom" :key="item.id" @click="onSwiper(item)">
        <img :src="baseAddRequestPrefix(item.imgUrl)" alt="" />
        <!-- <van-image class="swipe-item-img" :data="item" :src="item.imgUrl" fit="cover">
          <template #loading>
            <div class="default-bg-img-box">加载中...</div>
          </template>
        </van-image> -->
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script setup lang="ts">
import { baseAddRequestPrefix } from '@/utils/base'
const win = window as any
const homeStore = useHomeStore()
const videoStore = useVideoStore()

const onSwiper = (item: any) => {
  win.uni.getEnv((res: any) => {
    if (res.h5) {
      const winRef = window.open('', '_blank') as any
      winRef.location = item.linkUrl
    }
    if (res.plus) {
      win.uni.postMessage({
        data: {
          action: item.linkUrl
        }
      })
    }
  })
}
onMounted(() => {})
</script>
<style lang="less">
.swiper-box {
  margin: 10px;
  box-sizing: border-box;

  .van-swipe-item {
    height: 168px !important;
    min-height: 168px !important;
  }
  .my-swipe {
    border-radius: 10px !important;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
