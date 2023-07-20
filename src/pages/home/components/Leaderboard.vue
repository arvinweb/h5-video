<template>
  <div class="leaderboard-box">
    <header>
      <div
        v-for="item in leaderList"
        :key="item.id"
        :class="{ activeDiv: leaderActive === item.id }"
        @click="leaderActive = item.id"
      >
        {{ item.name }}
      </div>
    </header>
    <main>
      <div>
        <div v-for="item in leftList" :key="item.id">{{ item.id + 1 }} {{ item.name }}</div>
      </div>
      <div>
        <div v-for="item in rightList" :key="item.id">{{ item.id + 1 }} {{ item.name }}</div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const leaderActive = ref<number>(0);
const leaderList = reactive([
  { id: 0, name: "7日榜" },
  { id: 1, name: "最新榜" },
  { id: 2, name: "VIP榜" },
  { id: 3, name: "免费榜" },
]);
const leftList = reactive([
  { id: 0, name: "AI大模型之美" },
  { id: 1, name: "AI大模型之美" },
  { id: 2, name: "AI大模型之美" },
  { id: 3, name: "AI大模型之美" },
]);
const rightList = reactive([
  { id: 4, name: "AI大模型之美" },
  { id: 5, name: "AI大模型之美" },
  { id: 6, name: "AI大模型之美" },
  { id: 7, name: "AI大模型之美" },
]);
const toPage = (item: string) => {
  router.push(item);
};
</script>
<style scoped lang="less">
.leaderboard-box {
  header {
    & > div {
      display: inline-block;
      padding: 10px 5px;
      color: #938e8b;
      font-size: 16px;
      width: 60px;
      text-align: center;
      // transition: all .5s;
    }
  }
  .activeDiv {
    color: #c6565f;
    font-weight: 600;
    // transform: scale(1.1) rotate(0.1deg);
  }
  main {
    & > div {
      display: inline-block;
      width: 50%;
      div {
        padding: 10px 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
