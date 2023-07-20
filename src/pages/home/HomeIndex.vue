<template>
  <div class="home-index-box">
    <!-- 首页头部 -->
    <HeadNavigation></HeadNavigation>

    <!-- 首页主体 -->
    <HomeMain></HomeMain>
    <!-- 公共评论模块 -->
    <CommentCom></CommentCom>
  </div>
</template>
<script setup lang="ts">
import HeadNavigation from '@/pages/home/components/HeadNavigation.vue'
import CommentCom from '@/pages/home/components/CommentCom.vue'
import HomeMain from '@/pages/home/components/HomeMain.vue'

import { useUserStore } from '~@/store/user'

const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()
</script>

<style lang="less">
.home-index-box {
}
</style>
