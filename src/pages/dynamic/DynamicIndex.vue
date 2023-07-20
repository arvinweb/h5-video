<template>
  <div class="dynamic-index-box" v-if="tabsList.length > 0">
    <tabSearch></tabSearch>
    <van-tabs v-model:active="active" background="#000b1a" swipeable loop :shrink="true" :animated="true" :sticky="true">
      <van-tab v-for="item in tabsList" :key="item.id" :title="item.name">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getRecommend"
        >
          <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
            <template v-if="active === 0">
              <NotLoggedIn></NotLoggedIn>
            </template>
            <template v-else-if="apiResult">
              <DynamicSkeleton></DynamicSkeleton>
            </template>
            <template v-else>
              <DynamicMain v-for="(item, index) in 5" :key="index" :curr-item="{}"></DynamicMain>
            </template>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
    <!-- 添加社区动态 -->
    <div class="release-btn">
      <img :src="releaseImg" alt="" @click="onReleaseBtn" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAllDynamicApi } from '@/api/dynamic'
import { tabsFace } from '@/interface/video'
import tabSearch from '@/components/tabSearch.vue'
import DynamicSkeleton from '@/pages/dynamic/components/Skeleton.vue'
import NotLoggedIn from '@/pages/dynamic/components/NotLoggedIn.vue'
import DynamicMain from '@/pages/dynamic/components/DynamicMain.vue'

import releaseImg from '@/assets/images/dynamic/release3.png'
const router = useRouter()
const homeStore = useHomeStore()
const dynamicStore = useDynamicStore()

const active = ref<number>(1)

const tabsList = ref<Array<tabsFace>>([])

// 无限下滑动模块
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const pageIndex = ref<number>(1)
const pageSize = ref<number>(20)
const apiResult = ref<boolean>(false)
const refreshLoading = ref<boolean>(false)

// list组件下拉到底回调
const getRecommend = () => {}

// 上拉加载刷新回调
const onRefresh = () => {
  setTimeout(() => {
    refreshLoading.value = !refreshLoading.value
  }, 3000)
}

// 点击搜索
const onSearch = () => {}

// 点击添加动态
const onReleaseBtn = () => {
  router.push({
    path: '/release'
  })
}

// 获取轮播数据
const getBanner = () => {
  if (homeStore.swiperCom) {
    return
  }
}
// 获取社区数据
const getAllDynamic = () => {
  getAllDynamicApi(pageSize.value, pageIndex.value).then((res: any) => {
    console.log(res)
    if (res) {
    }
  })
}
const tabsInit = () => {
  tabsList.value.push(
    {
      id: 1,
      name: '关注',
      parentId: -1,
      children: []
    },
    {
      id: 2,
      name: '推荐',
      parentId: -1,
      children: []
    },
    {
      id: 3,
      name: '话题',
      parentId: -1,
      children: []
    },
    {
      id: 4,
      name: '我的',
      parentId: -1,
      children: []
    }
  )
}
const init = () => {
  tabsInit()
  getBanner()
  getAllDynamic()
}

onMounted(() => {
  init()
})
</script>

<style lang="less">
.dynamic-index-box {
  padding-bottom: 65px;
  height: 100%;
  box-sizing: border-box;
  position: relative;

  .van-tabs__line {
    background: @color1;
  }
  .van-tab {
    font-size: 18px;
    span {
      color: #fff;
    }
  }
  .van-swipe-item {
    min-height: 60vh;
  }
  .van-tab--active {
    span {
      color: @color1;
      font-weight: 600;
    }
  }

  .release-btn {
    position: fixed;
    right: 20px;
    bottom: 70px;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
    }
  }
}
</style>
