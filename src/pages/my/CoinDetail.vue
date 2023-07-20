<template>
  <div class="coin-detail-box">
    <van-nav-bar :fixed="true" title="购买记录">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <main>
      <van-tabs v-model:active="active" swipeable>
        <van-tab v-for="(item, pageIndex) in tabsList" :key="item.id" :title="item.title">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="getRecommend"
          >
            <!-- <header>
              <van-cell title="选择日期" :value="date" @click="show = true" />
              <van-calendar
                color="#fc671e"
                v-model:show="show"
                :min-date="minDate"
                :max-date="maxDate"
                type="range"
                @confirm="onConfirm"
              />
            </header> -->
            <DisplayBlock :info-item="resultList"></DisplayBlock>
          </van-list>
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>
<script setup lang="ts">
import { getFinanceHistory, geBuyTvideoHistory } from "@/api/manager";
import dayjs from "dayjs";
import DisplayBlock from "@/pages/my/components/DisplayBlock.vue";
const router = useRouter();
const active = ref<number>(0);
const showBottom = ref<boolean>(false);
const tabsList = reactive([
  { id: 0, title: "充值记录" },
  { id: 1, title: "购买记录" },
]);

const loading = ref(false);
const finished = ref(false);
const pageIndex = ref<number>(1);
const pageSize = ref<number>(20);
const apiResult = ref(false);

const show = ref<boolean>(false);
const date = ref("");
const min = dayjs().subtract(7, "day") as any;
const minDate = ref(min.$d as any);
const maxDate = ref(new Date() as any);
const startTime = ref("" as any);
const endTime = ref("" as any);

const resultList = ref<any>([]);

const formatDate = (date: { getFullYear: () => any; getMonth: () => number; getDate: () => any }) => {
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
};

const resultListInit = (res: any) => {
  if (!res) {
    finished.value = true;
    return;
  }
  resultList.value = resultList.value.concat(res.data);
  loading.value = false;
  apiResult.value = false;
  if (resultList.value.length >= res.total) {
    finished.value = true;
  } else {
    pageIndex.value++;
  }
};
const onClickLeft = () => {
  router.back();
};

const getRecommend = () => {
  if (apiResult.value) {
    return;
  }
  loading.value = true;
  apiResult.value = true;
  if (active.value === 0) {
    getFinanceHistoryApi();
  }
  if (active.value === 1) {
    geBuyTvideoHistoryApi();
  }
};

const getFinanceHistoryApi = () => {
  getFinanceHistory(pageSize.value, pageIndex.value).then((res: any) => {
    resultListInit(res);
  });
};
const geBuyTvideoHistoryApi = () => {
  geBuyTvideoHistory(pageSize.value, pageIndex.value).then((res: any) => {
    resultListInit(res);
  });
};
const scrollDataInit = () => {
  loading.value = false;
  finished.value = false;
  pageIndex.value = 1;
  resultList.value = [];
  getRecommend();
};

watch(
  () => active.value,
  (newValue) => {
    scrollDataInit();
  },
  { deep: true }
);

onMounted(() => {
  getRecommend();
});
</script>

<style lang="less">
.coin-detail-box {
  padding-top: 46px;
  .van-tabs__line {
    background: @color1;
  }
  header {
    padding: 10px 20px;
    // background: #ccc;
  }
  .van-cell {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  main {
  }
}
</style>
