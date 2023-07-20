<template>
  <div class="display-block">
    <div v-for="(item, index) in infoList" :key="index" class="content-box">
      <van-row>
        <van-col class="left" span="6"> 订单号 </van-col>
        <van-col class="right" span="18">
          <span class="color-fff">{{ item.id }} </span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="left" span="6">金额</van-col>
        <van-col class="right" span="18">
          <span class="color-fff money">{{ item.amount || item.goldCoin }}</span>
        </van-col>
      </van-row>
      <!-- <van-row> 
          <van-col class="left" span="6"> 支付方式</van-col> 
          <van-col class="right" span="18"> 
            <span class="color-fff">{{ payTypeInit(item.type) }}</span> 
          </van-col> 
        </van-row> -->
      <van-row>
        <van-col class="left" span="6"> 订单时间</van-col>
        <van-col class="right" span="18">
          <span class="color-fff">{{ dayjs(item.createdAt).format("YYYY-MM-DD HH:mm") }}</span>
        </van-col>
      </van-row>
      <van-row>
        <van-col class="left" span="6"> 状态</van-col>
        <van-col class="right" span="18">
          <span class="color-fff status-2">{{ initItemType(item.type) }}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
const props = defineProps({
  // 视频播放地址
  infoItem: {
    type: Array,
    default: () => [],
  },
});
const initItemType = (item: any) => {
  let result = "成功";
  if (item === 0) {
    result = "失败";
  }
  return result;
};
const infoList = computed(() => {
  return props.infoItem as any;
});
</script>

<style scoped lang="less">
.display-block {
  padding: 0 20px;
}
.content-box {
  // background: linear-gradient(90deg, #fe0666, #fc671e);
  // background: linear-gradient(89.96deg, rgb(95, 221, 176) 0.04%, rgb(49, 175, 168) 99.97%);
  border: 0.02667rem solid #ccc;
  padding: 10px 16px;
  border-radius: 5px;
  margin-top: 10px;
  .color-fff {
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }
  .left {
    text-align: left;
    color: #333;
  }
  .right {
    text-align: right;
  }

  .status-1 {
    color: #07c160;
  }
  .status-2 {
    color: #f94f92;
  }
  .status-0 {
    color: #ccc;
  }
  img {
    width: 16px;
  }
}
</style>
