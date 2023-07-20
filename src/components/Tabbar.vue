<template>
  <div v-if="!newIsSearch" class="tab-bottom-box">
    <van-tabbar v-model="active" route :border="false" inactive-color="#fff" active-color="#fff">
      <van-tabbar-item replace to="/">
        <span>首页</span>
        <template #icon="props">
          <img v-if="path.fullPath === '/' || props.active" :src="homeImgCurr" />
          <img v-else :src="homeImg" />
        </template>
      </van-tabbar-item>

      <!-- 游戏 -->
      <van-tabbar-item replace to="/video">
        <span>视频</span>
        <template #icon="props">
          <img v-if="path.fullPath === '/video' || props.active" :src="videoImgCurr" />
          <img v-else :src="videoImg" />
        </template>
      </van-tabbar-item>

      <!-- 动态 -->
      <van-tabbar-item replace to="/dynamic">
        <span>社区</span>
        <template #icon="props">
          <img v-if="path.fullPath === '/dynamic' || props.active" :src="dynamicImgCurr" />
          <img v-else :src="dynamicImg" />
        </template>
      </van-tabbar-item>

      <!-- 我的 -->
      <van-tabbar-item replace :to="'/mine'">
        <span>我的</span>
        <template #icon="props">
          <img v-if="path.fullPath === '/mine' || props.active" :src="myImgCurr" />
          <img v-else :src="myImg" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
import homeImg from '@/assets/images/home/bottom/home.png'
import homeImgCurr from '@/assets/images/home/bottom/home-1.png'
import myImg from '@/assets/images/home/bottom/my.png'
import myImgCurr from '@/assets/images/home/bottom/my-1.png'
import dynamicImg from '@/assets/images/home/bottom/dynamic.png'
import dynamicImgCurr from '@/assets/images/home/bottom/dynamic-1.png'
import videoImg from '@/assets/images/home/bottom/video.png'
import videoImgCurr from '@/assets/images/home/bottom/video-1.png'

const homeStore = useHomeStore()
const userStore = useUserStore()
const router = useRouter()
const active = ref(0)

const path = computed(() => router.currentRoute.value)
const newIsSearch = computed(() => false)
</script>

<style lang="less">
.tab-bottom-box {
  background-color: #000b1a;
  z-index: 9;
  .van-tabbar-item {
    position: relative;
  }
  .upload-box {
    padding: 6px 6px 0 6px;
    border-radius: 50px 50px 0px 0px;
    background-color: #000b1a;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -8px;
    width: 30px;
    height: 30px;
    left: 50%;
    margin-left: -21px;
  }
  .upload-div {
    min-width: 24px;
    min-height: 24px;
  }
  .upload-span {
    position: relative;
    // top: -6px;
  }
  span {
    opacity: 0.6;
  }
  .van-tabbar-item--active span {
    opacity: 1 !important;
  }
  .van-tabbar,
  .van-tabbar-item {
    background-color: #000b1a;
  }
  .van-tabbar {
    padding-bottom: 10px;
  }
  img {
    min-width: 24px;
    min-height: 24px;
  }
}
</style>
