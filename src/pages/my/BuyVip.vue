<template>
  <div class="buy-vip-box">
    <van-nav-bar :fixed="true" title="VIP">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <header>
      <user-header></user-header>
    </header>
    <main>
      <div class="vip-box overflowcScroll">
        <div
          v-for="(item, index) in memberList"
          :key="item.id"
          :class="{ 'active-div': active === index }"
          @click="active = index"
        >
          <h1>{{ item.name }}</h1>
          <p>
            <span>{{ item.described }}</span>
          </p>
          <div>{{ item.goldCoin }} 元</div>
        </div>
      </div>
      <div class="activity-title">
        <h1>VIP限时特惠，特惠不断</h1>
        <span>活动结束后立即恢复原价</span>
      </div>
      <div class="btn-box">
        <van-button type="primary" size="large" color="linear-gradient(to right, #fc671e, #ff6034)" @click="onBtn"
          >立即购买</van-button
        >
      </div>
      <h2>VIP特权</h2>
      <br />
      <ul>
        <li v-for="item in vipPrivilege">
          <div>
            <span class="icon iconfont font-50" :class="item.icon"></span>
          </div>
          <label>{{ item.title }}</label>
        </li>
      </ul>
    </main>
    <!-- <van-popup v-model:show="showBottom" position="bottom" round :style="{ height: '60%' }">
      <div class="payment-method-box">
        <h2>请选择支付方式</h2>

        <div v-for="item in payList" :key="item.id" @click="changeChecked(item)">
          <van-row>
            <van-col span="3">
              <span class="icon iconfont font-30" :class="item.icon"></span>
            </van-col>
            <van-col span="19"
              ><p>{{ item.title }}</p></van-col
            >
            <van-col span="2">
              <div class="box-2">
                <van-checkbox v-model="item.checked" checked-color="#f74c7b"></van-checkbox>
              </div>
            </van-col>
          </van-row>
        </div>
        <footer>
          <van-button color="linear-gradient(to right, #fc671e, #ff6034)" type="primary" block @click="onBtn">
            立即购买
          </van-button>
        </footer>
      </div>
    </van-popup> -->
  </div>
</template>
<script setup lang="ts">
import { getMember, setBuyMember } from "@/api/manager";
import UserHeader from "@/pages/my/components/UserHeader.vue";

const userStore = useUserStore();
const router = useRouter();
const active = ref<number>(0);
const showBottom = ref<boolean>(false);

const payList = ref<any>([]);
const memberList = ref<any>([]);
const vipList = reactive([
  { id: 0, title: "30", text: "月卡", num: 15, icon: "icon-wuguanggao" },
  { id: 1, title: "90", text: "季度卡", num: 30, icon: "icon-guanyingqia" },
  { id: 2, title: "180", text: "半年卡", num: 60, icon: " icon-VIP1" },
  { id: 3, title: "360", text: "年卡", num: 90, icon: "icon-rengongkefu" },
  { id: 4, title: "9999", text: "终身VIP", num: 180, icon: "icon-rengongkefu" },
]);

const vipPrivilege = reactive([
  { id: 0, title: "过滤广告", num: 30, icon: "icon-wuguanggao" },
  { id: 1, title: "无线观影", num: 30, icon: "icon-guanyingqia" },
  { id: 2, title: "VIP标识", num: 30, icon: " icon-VIP1" },
  { id: 3, title: "专属客服", num: 30, icon: "icon-rengongkefu" },
]);
payList.value = [
  { id: 0, title: "支付宝", checked: true, icon: "icon-zhifubaozhifu" },
  { id: 1, title: "微信", checked: false, icon: "icon-weixin" },
  { id: 2, title: "银行卡", checked: false, icon: "icon-yinhangqia" },
];
const changeChecked = (item: { checked: boolean; id: number }) => {
  payList.value.forEach((el: { id: number; checked: boolean }) => {
    el.checked = item.id == el.id ? true : false;
  });
};
const onClickLeft = () => {
  router.back();
};
const onBtn = () => {
  if (!userStore.token || userStore.token === "-1") {
    showConfirmDialog({
      title: "提示",
      message: "账号权限不足，是否立即注册登录？",
    })
      .then(() => {
        router.push("/login");
      })
      .catch(() => {
        // on cancel
      });
    return;
  }
  const memberId = memberList.value[active.value].id;
  setBuyMember(memberId).then((res: any) => {
    if (res) {
      showToast("购买成功");
      setTimeout(() => {
        router.back();
      }, 1500);
    }
  });
};
onMounted(() => {
  getMember().then((res: any) => {
    memberList.value = res;
  });
});
</script>

<style scoped lang="less">
.buy-vip-box {
  padding-top: 46px;
  header {
    padding: 10px;
    h4 {
      font-size: 14px;
      font-weight: 500;
    }
    .content {
      padding: 10px;
    }
    .icon-setting-o {
      margin-bottom: 5px;
    }
    .content-3 {
      text-align: center;
      padding: 10px 0;
    }
    .balance {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  main {
    .vip-box {
      padding: 5px;

      & > div {
        background: #eee;
        color: #333;
        height: 135px;
        width: 135px;
        text-align: left;
        margin: 0 5px;
        border-radius: 10px;
        display: inline-block;

        box-sizing: border-box;
        padding: 10px;
        color: #000;
        overflow: hidden;
        text-align: center;
      }
      .active-div {
        background: @color6;
        color: #fff;
      }
      h1 {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
      }
      p {
        text-align: center;
        word-wrap: break-word !important;
        white-space: pre-line;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 65px;
      }
    }
    .activity-title {
      text-align: center;
      padding: 10px;
      color: @color7;
      h1 {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .btn-box {
      padding: 10px;
    }
    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
      padding: 0 10px;
    }

    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      text-align: center;
      padding: 0 10px;
      text-align: center;
      img {
        width: 55px;
        height: 55px;
        border-radius: 5px;
      }
      div {
        display: flex;
        justify-content: center;
        margin-bottom: 5px;
      }
      label {
        font-size: 13px;
        font-weight: 600;
        color: #333;
      }
    }
  }
  .payment-method-box {
    padding: 20px 10px;
    img {
      width: 30px;
      height: 30px;
    }
    h2 {
      font-size: 16px;
      font-weight: 600;
      text-align: center;
    }
    & > div {
      margin: 15px 0;
      height: 30px;
      line-height: 30px;
    }
    p {
      font-size: 14px;
      color: @color3;
    }
    .van-col--2 {
      display: flex;
      align-items: center;
    }
  }
  .font-30 {
    font-size: 20px;
  }
  .font-50 {
    font-size: 40px;
  }
}
</style>
