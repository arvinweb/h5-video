<template>
  <div class="home-main-box">
    <!-- :lazyPreloadPrevNext="2" // 惰性加载 -->
    <swiper
      :direction="'vertical'"
      :spaceBetween="0"
      ref="mySwiper"
      :lazyPreloadPrevNext="2"
      :show-indicators="false"
      :allowTouchMove="allowTouchMove"
      :style="`height: ${swipeHeight}px`"
      :mousewheel="true"
      :loop="true"
      @touchMove="touchMove"
      @touchEnd="touchEnd"
      @transitionEnd="transitionEnd"
      :pagination="{
        clickable: true
      }"
      :modules="[Mousewheel]"
      class="mySwiper"
    >
      <swiper-slide v-for="(item, index) in liveRecommendList" :key="item">
        <HomeBody :curr-item="item" :curr-index="index"></HomeBody>
      </swiper-slide>
      <HomeVideo class="home-video-par v-felx" :class="{ 'home-video-show': homeStore.homeVideoItem.isShow }"></HomeVideo>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

import { Mousewheel } from 'swiper/modules'
import HomeBody from '@/pages/home/components/HomeBody.vue'
import HomeVideo from '@/pages/home/components/HomeVideo.vue'
const router = useRouter()
const homeStore = useHomeStore()

const allowTouchMove = computed(() => {
  return !homeStore.showCommentBottom
})

// swipe高度
const swipeHeight = ref(0)
swipeHeight.value = document.body.offsetHeight

// 手势滑动开始Y轴
const touchStar = ref<number>(0)

// 当前索引
const activeIndex = ref<number | string>(0)

// 推荐数组
const liveRecommendList = ref<any>([
  {
    id: 0,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'http://101.43.70.172:8000/uploads/2023/06/15/1686806131669434.gif'
  },
  {
    id: 1,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'http://101.43.70.172:8000/uploads/2023/06/16/1686884800788528.gif'
  },
  {
    id: 2,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'http://101.43.70.172:8000/uploads/2023/06/15/1686806179476555.gif'
  },
  {
    id: 2,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'http://101.43.70.172:8000/uploads/2023/06/15/1686806179476555.gif'
  },
  {
    id: 2,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'http://101.43.70.172:8000/uploads/2023/06/15/1686806179476555.gif'
  },
  {
    id: 2,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    poster: 'http://101.43.70.172:8000/uploads/2023/06/15/1686806179476555.gif'
  }
])

// 手指触碰Swiper并滑动（手指）时执行
const touchMove = (e: any) => {
  if (touchStar.value === 0) {
    touchStar.value = e.touches.currentY
  }

  if (e.touches.currentY < touchStar.value - 10) {
    if (homeStore.homeVideoItem.isShow) {
      homeStore.setHomeVideoItemIsShow(false)
    }
  }
}
// 手指滑动结束
const touchEnd = (e: any) => {
  console.log('滑动结束')
  if (e.touches.currentY <= touchStar.value - 10 && e.touches.currentY <= touchStar.value - 50) {
    setTimeout(() => {
      homeStore.setHomeVideoItemIsShow(true)
    }, 500)
  }
  touchStar.value = 0
}

// 过度结束时触发
const transitionEnd = (e: any) => {
  activeIndex.value = e.activeIndex
  touchStar.value = 0
  homeStore.setHomeVideoItemIsShow(true)
}

onMounted(() => {
  swipeHeight.value = document.body.offsetHeight
})
</script>
<style lang="less">
.home-main-box {
  min-height: 100vh;
  background: #151515;

  position: relative;
  .home-video-par {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .home-video-show {
    opacity: 1;
  }
  .home-video-hide {
    opacity: 0;
  }
  .van-swipe {
    z-index: 2;
  }
  .box-1 {
    height: 100%;

    color: #fff;
  }
  .van-swipe-item {
    color: #fff;
    padding: 48px 0;
    box-sizing: border-box;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    // background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
