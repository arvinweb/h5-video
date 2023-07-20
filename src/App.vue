<template>
  <div>
    <router-view v-if="!route.meta.keepAlive" />
    <keep-alive>
      <router-view v-if="route.meta.keepAlive" />
    </keep-alive>
    <tabbar v-show="isShow" />
  </div>
</template>
<script setup lang="ts">
const homeStore = useHomeStore()
const router = useRouter()
const route = useRoute()

// 用于判断是否是主页的页面，如不是关闭tabbar
const path = computed(() => router.currentRoute.value)
const isShow = computed(() => {
  return ['/', '/dynamic', '/mine', '/video'].includes(path.value.path) && !homeStore.showCommentBottom
})
</script>

<style>
#nprogress .bar {
  background-color: #f4f4f4 !important;
  height: 3px !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100% !important;
  height: 100% !important;
  font-size: 16px;
  box-sizing: border-box;
  text-align: left;
}
#app > div {
  height: 100%;
}
</style>
