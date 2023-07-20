<template>
  <div class="head-navigation-box">
    <img class="logo" :src="logoImg" alt="" />
    <div class="tab">
      <div
        v-for="item in tabsList"
        :key="item.id"
        :data="item.id"
        :class="{ 'tab-active': active == item.id }"
        @click="updateActive(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <ToNotify></ToNotify>
  </div>
</template>
<script setup lang="ts">
import ToNotify from '@/components/ToNotify.vue'
import logoImg from '@/assets/images/logo.png'
import { baseAddRequestPrefix } from '@/utils/base'
// 初始化pinia
const homeStore = useHomeStore()
const router = useRouter()

const updateActive = (_item: any) => {
  active.value = _item
  return 1
}

const active = ref(1)
const tabsList = ref([] as any)

const searchVal = ref<string>('')

const toPage = (item: string) => {
  router.push(item)
}
const init = () => {
  tabsList.value = [
    { id: 0, name: '关注' },
    { id: 1, name: '推荐' }
  ]
}
onMounted(() => {
  init()
})
</script>
<style scoped lang="less">
.head-navigation-box {
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-image: linear-gradient(to bottom, #000619 0%, #0f1925 100%) !important;
  position: fixed;
  top: 0px;
  padding: 5px 10px;
  box-sizing: border-box;
  z-index: 9;

  .logo {
    width: 38.1px;
    height: 39px;
  }
  .tab {
    display: flex;
    font-family: PingFangSC;
    font-size: 16px;
    font-weight: 900;
    color: #b9b9b9;
    div:nth-child(1) {
      margin-right: 20px;
    }
    .tab-active {
      color: #ffffff !important;
    }
    .tab-active::after {
      content: '';
      display: block;
      background: #f94f92;
      width: 50%;
      height: 2px;
      position: relative;
      top: 5px;
      left: 25%;
      transition-duration: 0.8s;
    }
  }
}
</style>
