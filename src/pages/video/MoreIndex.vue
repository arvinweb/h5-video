<template>
  <div class="more-index-box">
    <van-nav-bar :fixed="true" :title="urlParm.title">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#fff" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <template v-if="urlParm.urlType === 'group'">
        <van-row class="group-heder">
          <van-col span="4">
            <van-image width="45px" height="45px" :src="baseAddRequestPrefix(urlParm?.avatar)" />
          </van-col>
          <van-col class="content" span="20">
            <h4><span class="icon iconfont">&#xe774;</span> {{ urlParm?.title }}</h4>
            <p>{{ urlParm?.description }}</p>
          </van-col>
        </van-row>
        <van-tabs v-model:active="active" swipeable>
          <van-tab v-for="(item, pageIndex) in tabsList" :key="item.id" :title="item.name">
            <van-list
              v-if="item.id === active"
              v-model:loading="loading"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="getRecommend"
            >
              <main>
                <VideoItem v-for="ite in item.children" :video-item="ite"></VideoItem>
              </main>
            </van-list>
          </van-tab>
        </van-tabs>
      </template>
      <template v-else>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getRecommend"
        >
          <main>
            <VideoItem v-for="item in resultList" :video-item="item"></VideoItem>
          </main>
        </van-list>
      </template>
    </van-pull-refresh>
    <van-back-top v-if="currRouterHome" bottom="90" color="#fd6605" />
  </div>
</template>

<script setup lang="ts">
import { before } from 'node:test'
import { baseAddRequestPrefix } from '@/utils/base'
import { getVideoSecondCategoryApi } from '@/api/video'

const router = useRouter()
const userStore = useUserStore()
const currRouterHome = computed(() => {
  return router.currentRoute.value.path === '/more'
})

const active = ref<number>(0)
const resultList = ref<any>([])
const refreshLoading = ref<boolean>(false)
const tabsList = ref([
  {
    id: 0,
    name: '最新',
    children: []
  },
  {
    id: 1,
    name: '推荐',
    children: []
  },
  {
    id: 2,
    name: '排行',
    children: []
  }
])

const loading = ref(false)
const finished = ref(false)
const pageIndex = ref<number>(1)
const pageSize = ref<number>(20)
const apiResult = ref(false)

const beforeMoreId = ref<any>(null)
beforeMoreId.value = router.currentRoute.value?.query?.id
const urlParm = computed(() => {
  const query = router.currentRoute.value.query as any

  return query
})

const searchVal = ref<string>('')
const onClickLeft = () => {
  router.back()
}
const onRefresh = () => {
  init()
}

const resultListInit = (res: any) => {
  if (!res) {
    finished.value = true
    return
  }
  let currTotal = resultList.value.length

  if (urlParm.value.urlType == 'group') {
    tabsList.value[active.value].children = tabsList.value[active.value].children.concat(res.data)
    currTotal = tabsList.value[active.value].children.length
  } else {
    resultList.value = resultList.value.concat(res.data)
  }

  refreshLoading.value = false
  loading.value = false
  apiResult.value = false
  if (currTotal >= res.total) {
    finished.value = true
  } else {
    pageIndex.value++
  }
}
const getRecommend = () => {
  if (apiResult.value) {
    return
  }
  loading.value = true
  apiResult.value = true
  const userId = userStore?.userInfo?.id as any
  getVideoSecondCategoryApi(pageSize.value, pageIndex.value, urlParm.value.id).then((res: any) => {
    resultListInit(res)
  })
}
const init = () => {
  loading.value = false
  finished.value = false
  pageIndex.value = 1

  resultList.value = []
  scrollDataInit()
  // getRecommend();
}
const scrollDataInit = () => {
  loading.value = false
  finished.value = false
  apiResult.value = false
  pageIndex.value = 1
  tabsList.value.forEach(item => {
    item.children = []
  })
  getRecommend()
}
watch(
  () => active.value,
  newValue => {
    scrollDataInit()
  },
  { deep: true }
)
watch(
  () => router.currentRoute.value,
  (newValue: any, oldVal) => {
    if (newValue.name === 'more') {
      if (beforeMoreId.value != newValue?.query?.id || oldVal.name === 'my') {
        document.documentElement.scrollTop = 0
        tabsList.value.forEach(item => {
          item.children = []
        })
        init()
      }
    }
    if (newValue.name === 'more') {
      beforeMoreId.value = newValue?.query?.id
    }
  },
  { deep: true }
)

onMounted(() => {
  init()
})
</script>

<style lang="less">
.more-index-box {
  padding-top: 45px;
  min-height: 70vh;

  .van-tabs__line {
    background: @color1;
  }
  .van-tab {
    padding: 0 10px;
    font-size: 18px;
    span {
      // color: @color101;
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
  main {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
  .van-pull-refresh {
    min-height: calc(100vh - 46px);
  }
  .group-heder {
    padding: 20px 10px 10px 10px;
    // font-size: 13px;
    h4 {
      color: #333;
    }
    p {
      color: #7f6c8a;
    }

    img {
      border-radius: 5px;
    }
  }
}
</style>
