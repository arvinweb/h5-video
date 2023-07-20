<template>
  <div class="to-notify-box">
    <img :src="logoImg" alt="" @click="toPage('/reminder')" />
    <div>
      <span v-if="isNotify"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImg from '@/assets/images/logo.png'
import router from '@/router'
const userStore = useUserStore()
const homeStore = useHomeStore()

const isNotify = computed(() => {
  let result = false

  return result
})
const toPage = (url: string) => {
  router.push(url)
}
</script>

<style scoped lang="less">
.to-notify-box {
  position: relative;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    text-align: center;
    line-height: 13px;
    border-radius: 5px;
    background-color: #f94f92;
    font-size: 4px;
    color: #fff;
    position: absolute;
    right: -0px;
    top: -6px;
  }
}
</style>
