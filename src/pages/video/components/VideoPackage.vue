<template>
  <div class="video-package-box">
    <header>
      <h1>
        {{ currItem.name || '分类名字' }}
        <span @click="toPage()">更多<van-icon szi="16" name="arrow" /></span>
      </h1>
    </header>
    <main>
      <VideoItem v-for="item in currItem.children" :video-item="item"></VideoItem>
    </main>
  </div>
</template>
<script setup lang="ts">
import VideoItem from '@/pages/video/components/VideoItem.vue'
const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  active: {
    type: Number,
    default: 0
  },
  currItem: {
    type: Object,
    default: 0
  }
})

const toPage = () => {
  router.push({
    path: '/more',
    query: {
      title: props.currItem.name,
      urlType: props.active === -1 ? 'moreCagory' : 'category',
      id: props.currItem.id
    }
  })
}
</script>
<style lang="less">
.video-package-box {
  padding: 0 10px;
  margin-bottom: 15px;
  color: #fff;
  header {
    h1 {
      font-size: 16px;
      font-weight: 600;
      color: @color1;
      height: 44px;
      line-height: 44px;
      color: @color1;
      span {
        float: right;
        right: 10px;
        font-size: 12px;
        color: #8b8b8b;
      }
    }
  }
  main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}
</style>
