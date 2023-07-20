<template>
  <div class="home-main-box">
    <SwiperCom></SwiperCom>

    <template v-if="currItem.id === -1">
      <!-- <VanNoticeBar class="border-1" :scrollable="false" @click="toPage('/message')">
        <template #left-icon>
          <span class="icon iconfont">&#xe87e;</span>
        </template>
        <VanSwipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :touchable="false"
          color="#2d2d2d"
          :background="'#fff'"
          :show-indicators="false"
        >
          <VanSwipeItem v-for="item in homeStore.messageList" :key="item.id">{{ item.title || item.content }}</VanSwipeItem>
        </VanSwipe>
      </VanNoticeBar> -->
    </template>

    <main>
      <VideoPackage v-for="item in currItem.children" :currItem="item" :active="currItem.id" :key="item.id"></VideoPackage>
    </main>
  </div>
</template>

<script setup lang="ts">
import SwiperCom from '@/components/swiperCom.vue'
import VideoPackage from '@/pages/video/components/VideoPackage.vue'
const router = useRouter()
const homeStore = useHomeStore()
const props = defineProps({
  active: {
    type: Number,
    default: 0
  },
  pageIndex: {
    type: Number,
    default: 0
  },
  currItem: {
    type: Object,
    default: []
  }
})

const isSwiperCom = computed(() => {
  let reslut = true
  return reslut
})
const toPage = (url: string) => {
  router.push(url)
}

onMounted(() => {})
</script>
<style scoped lang="less">
.home-main-box {
  min-height: 80vh;
  img {
    height: 100%;
    width: 100%;
  }

  .notice-swipe {
    height: 40px;
    line-height: 40px;
  }
  .van-notice-bar {
    background: #fff;
  }
  .my-swipe {
    border-radius: 5px !important;
    overflow: hidden;
    margin: 0 10px;
  }
  .van-swipe-item {
    height: 38px;
    min-height: 38px;
  }
  .border-1 {
    border: 1px solid #ececec;
    border-radius: 5px;
    margin: 10px;
    margin-top: 15px;
  }
  .iconfont {
    margin-right: 5px;
    font-size: 24px;
  }

  main {
    padding: 0 10px;
  }
}
</style>
