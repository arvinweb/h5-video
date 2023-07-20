<template>
  <div class="select-tab-box">
    <header>
      <van-nav-bar title="选择标签" left-arrow right-text="确认" @click-right="onClickRight" @click-left="onClickLeft" />
    </header>

    <main>
      <!-- <div>最多只能选择3个标签！</div> -->
      <h4>帖子标签</h4>
      <ul>
        <li v-for="item in tabsList" :key="item.id" :class="activeLiClass(item)" @click="onLi(item)">
          {{ item.name }}
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
import { getDynamicTagApi } from '@/api/dynamic'
import { dynamicTag } from '@/interface/dynamic'
const emits = defineEmits(['setShowRight', 'setActiveList'])
const route = useRouter()
const tabsList = ref<Array<dynamicTag>>([])
const activeList = ref([] as any)

const onClickRight = () => {
  emits('setActiveList', activeList.value)
  emits('setShowRight')
}
// 获取所有 tag
const getDynamicTag = () => {
  // getDynamicTagApi
  getDynamicTagApi().then((res: any) => {
    console.log(res)
    if (res) {
      res.forEach((item: dynamicTag) => {
        item.checked = false
      })
      tabsList.value = res
    }
  })
}

const activeLiClass = (item: any) => {
  let result = ''
  if (item.checked) {
    result = 'active-li'
  }
  return result
}
const onLi = (item: any) => {
  if (!item.checked) {
    if (activeList.value.length >= 3) {
      return
    }
  }

  item.checked = !item.checked
  activeList.value = []
  tabsList.value.forEach((ite: { checked: boolean }) => {
    if (ite.checked) {
      activeList.value.push(ite)
    }
  })
}
const onClickLeft = () => {
  emits('setShowRight')
}

onMounted(() => {
  getDynamicTag()
})
</script>

<style lang="less">
.select-tab-box {
  background: #0e1621;
  height: 100%;
  position: relative;
  header {
    position: fixed;
    top: 0px;
    width: 100%;
  }
  main {
    padding: 10px 15px;
    padding-top: 54px;
    box-sizing: border-box;
    text-align: left;
    background: #0e1621;
    height: 100%;
    overflow-y: scroll !important;
    h4 {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      padding: 0 5px;
    }
    li {
      min-width: 76px;
      height: 27px;
      margin: 5px;
      border-radius: 16px;
      background-color: rgba(80, 89, 101, 0.2);
      display: inline-block;
      text-align: center;
      line-height: 27px;
      color: #9aa4b4;
      border: solid 0.5px rgba(80, 89, 101, 0.2);
      box-sizing: border-box;
    }
    .active-li {
      border: solid 0.5px #ff086a;
      background-color: rgba(255, 8, 106, 0.1);
      color: #ff086a;
    }
    & > div {
      width: 345px;
      height: 40px;

      line-height: 40px;
      color: #fff;
      text-align: center;
      border-radius: 4px;
      font-size: 12px;
      -webkit-backdrop-filter: blur(14px);
      backdrop-filter: blur(14px);
      background-color: rgba(38, 38, 43, 0.8);
      margin-bottom: 24px;
    }
  }
}
</style>
