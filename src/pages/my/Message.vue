<template>
  <div class="originality-index-box">
    <van-nav-bar :fixed="true" title="系统消息">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
    </van-nav-bar>

    <ul>
      <li v-for="item in homeStore.messageList" :key="item.id" class="van-hairline--bottom">
        <h1>
          {{ item.title }}
          <span>{{ "2023/06/01 09:00" }}</span>
        </h1>
        <p>
          {{ item.content }}
        </p>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { getMessage } from "@/api/manager";
import { messageFace } from "@/interface/responseApi";
const router = useRouter();
const homeStore = useHomeStore();
const messageList = ref<Array<messageFace>>([]);
const onClickLeft = () => {
  router.back();
};
onMounted(() => {
  if (!homeStore.messageList) {
    getMessage().then((res: any) => {
      messageList.value = res.data;
    });
  }
});
</script>

<style scoped lang="less">
.originality-index-box {
  padding-top: 46px;
  // background: #eee;
  ul {
    // padding: 10px;
  }
  li {
    // margin-bottom: 10px;
    background: #fff;
    padding: 10px;
    text-align: left;
  }
  h1 {
    font-size: 16px;
    color: #222222;
    font-weight: 600;
    padding-right: 95px;
    position: relative;
  }
  span {
    position: absolute;
    right: 0px;
    font-size: 12px;
    color: #888888;
    font-weight: 300;
    top: 2px;
  }
  P {
    text-align: left;
    color: #888888;
  }
}
</style>
