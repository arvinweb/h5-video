<template>
  <div class="video-index-box">
    <tabSearch></tabSearch>

    <van-tabs v-model:active="active" background="#000b1a" swipeable loop :shrink="true" :animated="true" :sticky="true">
      <van-tab cla v-for="item in tabsList" :key="item.id" :title="item.name">
        <VideoMain v-if="item.id !== -1 && item.id !== -2" :active="active" :pageIndex="pageIndex" :curr-item="item"></VideoMain>
        <van-list
          v-if="item.id === -1 || item.id === -2"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getRecommend"
        >
          <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
            <main class="main-grid-2">
              <VideoItem v-for="ite in item.children.data" :video-item="ite"></VideoItem>
            </main>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import { getBannerApi, getHomeCategoryApi, getHomeHotApi, getHomeNewApi, getHomeCagoryListApi } from '@/api/video'
import { tabsFace } from '@/interface/video'
import { useVideoStore } from '~@/store/video'
import VideoMain from '@/pages/video/components/VideoMain.vue'
import VideoItem from '@/pages/video/components/VideoItem.vue'

const videoStore = useVideoStore()
const active = ref<number>(0)

const tabsList = ref<any>()

// 无限下滑动模块
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const pageIndex = ref<number>(1)
const pageSize = ref<number>(20)
const apiResult = ref<boolean>(false)
const refreshLoading = ref<boolean>(false)

// list组件下拉到底回调
const getRecommend = () => {
  const currItemId = tabsList.value[active.value].id
  if (currItemId === -2) {
    getHot()
  }
  if (currItemId === -1) {
    getNew()
  }
}
const getCategoryList = () => {
  const currItemId = tabsList.value[active.value].id
  if (tabsList.value[active.value].children.length > 0) {
    return
  }
  getHomeCagoryListApi(currItemId).then((res: any) => {
    tabsList.value.forEach((item: any) => {
      if (item.id === currItemId) {
        item.children = res.reverse()
      }
    })
  })
}

// 监听滑动获取分类据
const changeActive = (e: any) => {
  const currItemId = tabsList.value[active.value].id
  if (currItemId === -1) {
    // getHot();
  } else if (currItemId === -2) {
    if (tabsList.value[2]?.children?.data?.length > 0) {
      pageIndex.value = tabsList.value[2]?.pageIndex
    } else {
      pageIndex.value = 1
      tabsList.value[2].children = []
      getHot()
    }
  } else if (currItemId === -1) {
    if (tabsList.value[1]?.children?.data?.length > 0) {
      pageIndex.value = tabsList.value[1]?.pageIndex
    } else {
      pageIndex.value = 1
      tabsList.value[1].children = []
      getNew()
    }
  } else {
    getCategoryList()
  }
}

// 获取最热视频数据
const getHot = () => {
  if (apiResult.value) {
    refreshLoading.value = false
    return
  }
  loading.value = true
  apiResult.value = true
  getHomeHotApi(pageSize.value, pageIndex.value).then((res: any) => {
    const currItemId = tabsList.value[active.value].id
    apiResult.value = false
    tabsList.value.forEach((item: any) => {
      if (item.id === currItemId && active.value == 2) {
        if (pageIndex.value === 1) {
          item.children = res
        } else {
          item.children.data = item.children?.data.concat(res.data)
        }
        loading.value = false
        if (item.children.data.length >= res.total) {
          finished.value = true
        } else {
          pageIndex.value++
        }
      }
    })
    refreshLoading.value = false
  })
}
// 获取最新视频数据
const getNew = () => {
  loading.value = true
  if (apiResult.value) {
    refreshLoading.value = false
    return
  }
  apiResult.value = true
  getHomeNewApi(pageSize.value, pageIndex.value).then((res: any) => {
    const currItemId = tabsList.value[active.value].id
    apiResult.value = false
    tabsList.value.forEach((item: any) => {
      if (item.id === currItemId && active.value == 1) {
        if (pageIndex.value === 1) {
          item.children = res
        } else {
          item.children.data = item.children?.data.concat(res.data)
        }
        loading.value = false
        if (item.children.data.length >= res.total) {
          finished.value = true
        } else {
          pageIndex.value++
        }
      }
    })
    refreshLoading.value = false
  })
}

// 上拉加载刷新回调
const onRefresh = () => {
  setTimeout(() => {
    refreshLoading.value = !refreshLoading.value
  }, 3000)
}

// 点击搜索
const onSearch = () => {}

// 获取轮播数据
const getBanner = () => {
  if (videoStore.swiperCom) {
    return
  }
  getBannerApi().then((res: any) => {
    console.log(res)
    videoStore.setSwiperCom(res)
  })
}

// 监听道tab滑动后的公共方法
const scrollDataInit = () => {
  loading.value = false
  finished.value = false

  changeActive(active.value)
}
// 获取推荐数据
const getHomeCategory = () => {
  getHomeCategoryApi().then((res: any) => {
    const reslut = res as Array<tabsFace>
    const tabsListRes = JSON.parse(JSON.stringify(res))
    tabsInit(reslut.reverse())

    tabsList.value.forEach((item: { children: any; id: number }) => {
      if (item.id == -1) {
        tabsList.value[0].children = tabsListRes.reverse()
      }
    })
  })
}

const tabsInit = (reslut: Array<tabsFace>) => {
  reslut.unshift({
    id: -2,
    name: '最热',
    parentId: -1,
    children: []
  })
  reslut.unshift({
    id: -1,
    name: '最新',
    parentId: -1,
    children: []
  })
  reslut.unshift({
    id: -3,
    name: '推荐',
    parentId: 0,
    children: []
  })

  reslut.forEach(ite => (ite.children = []))
  // reslut.push(...reslut);
  tabsList.value = reslut
}
const init = () => {
  getBanner()
  getHomeCategory()
}
// 监听滑动
watch(
  () => active.value,
  (newValue, oldVal) => {
    if (oldVal === -1) {
      tabsList.value[1].pageIndex = pageIndex.value
    } else if (oldVal === -2) {
      tabsList.value[2].pageIndex = pageIndex.value
    } else {
      pageIndex.value = 1
    }
    scrollDataInit()
  },
  { deep: true }
)
onMounted(() => {
  init()
})
</script>

<style lang="less">
.video-index-box {
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
}
</style>
