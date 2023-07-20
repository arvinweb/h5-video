<template>
  <div class="others-index-box">
    <van-nav-bar :fixed="true" :title="uelQuery?.title">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
    </van-nav-bar>

    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <header>
        <van-row>
          <van-col span="4">
            <van-image round width="45px" height="45px" :src="baseAddRequestPrefix(uelQuery.avatar)" />
          </van-col>
          <van-col class="content" span="13">
            <h4><span class="icon iconfont">&#xe774;</span> {{ router.currentRoute.value.query?.title }}</h4>
            <p>{{ totals }} 部作品 | {{ router.currentRoute.value.query?.followCount }} 个粉丝</p>
          </van-col>
          <van-col class="content-3" span="7"> </van-col>
        </van-row>
      </header>
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
            <main class="main-grid-2">
              <VideoItem v-for="ite in item.children" :video-item="ite"></VideoItem>
            </main>
          </van-list>
        </van-tab>
      </van-tabs>
      <!-- <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getRecommend"
      >
        <main class="main-grid-2">
          <VideoItem v-for="item in resultList" :video-item="item"></VideoItem>
        </main>
      </van-list> -->
    </van-pull-refresh>
    <van-back-top v-if="currRouterHome" bottom="50" color="#fd6605" />
  </div>
</template>
<script setup lang="ts">
import { getInstitutionVideo } from "@/api/manager";
import { baseAddRequestPrefix } from "@/utils/base";
const router = useRouter();
const userStore = useUserStore();
const currRouterHome = computed(() => {
  return router.currentRoute.value.path === "/others";
});
const active = ref<number>(0);
const totals = ref<number>(0);
const resultList = ref<any>([]);
const tabsList = ref([
  {
    id: 0,
    name: "最新",
    children: [],
  },
  {
    id: 1,
    name: "推荐",
    children: [],
  },
  {
    id: 2,
    name: "排行",
    children: [],
  },
]);
const refreshLoading = ref<boolean>(false);
const loading = ref(false);
const finished = ref(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(20);
const apiResult = ref(false);

const uelQuery = computed(() => {
  return router.currentRoute.value.query as any;
});

const onRefresh = () => {
  init();
};
const onClickLeft = () => {
  router.back();
};
const init = () => {
  loading.value = false;
  finished.value = false;
  pageIndex.value = 1;

  resultList.value = [];
  tabsList.value.forEach((item) => {
    item.children = [];
  });
  getRecommend();
};

const getRecommend = () => {
  if (apiResult.value) {
    return;
  }
  const id = router.currentRoute.value.query.id as any;
  getInstitutionVideo(pageSize.value, pageIndex.value, id, active.value).then((res: any) => {
    if (!res) {
      finished.value = true;
      return;
    }
    totals.value = res.total;
    tabsList.value[active.value].children = tabsList.value[active.value].children.concat(res.data);
    refreshLoading.value = false;
    loading.value = false;
    apiResult.value = false;
    if (tabsList.value[active.value].children.length >= res.total) {
      finished.value = true;
    } else {
      pageIndex.value++;
    }
  });
};
watch(
  () => active.value,
  (newValue) => {
    init();
  },
  { deep: true }
);
watch(
  () => router.currentRoute.value,
  (newValue, oldVal) => {
    if (newValue.name === "others") {
      if (oldVal.name != "video") {
        init();
      }
    }
    // console.log(newValue.name, oldVal.name);
  },
  { deep: true }
);
onMounted(() => {
  getRecommend();
});
</script>

<style lang="less">
.others-index-box {
  padding-top: 46px;
  .van-tabs__line {
    background: @color1;
  }
  .van-tab {
    padding: 0 10px;
    font-size: 18px;
    span {
      color: @color101;
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
  // padding-bottom: 65px;
  header {
    padding: 20px 10px 10px 10px;
    // position: fixed;

    h4 {
      font-size: 13px;
      font-family: Hiragino Sans GB;
      font-weight: normal;
      color: #111111;
    }
    p {
      color: #888888;
    }
  }
}
</style>
