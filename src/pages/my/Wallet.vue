<template>
  <div class="wallet-box">
    <van-nav-bar :fixed="true" title="视频钱包">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
      <template #right>
        <span @click="onClickRight">购买记录</span>
      </template>
    </van-nav-bar>
    <header>
      <h1>当前余额</h1>
      <div>{{ userStore.userInfo?.goldCoin }}</div>
      <p>注： 1奇点等于1元</p>
    </header>
    <main>
      <div class="activity-title">
        <h1>视频钱包奇点只用于购买点播视频</h1>
        <span>类似于爱奇艺的云视频，类似于爱奇艺的云视频</span>
      </div>
      <h2>购买奇点</h2>
      <ul>
        <li v-for="item in vipList" :key="item.id" :class="{ 'active-li ': activeLi === item.id }" @click="activeLi = item.id">
          <h3>{{ item.num }}</h3>
          <div>{{ item.num }} 元</div>
        </li>
      </ul>
      <div class="btn-box">
        <van-button
          type="primary"
          size="large"
          color="linear-gradient(to right, #fc671e, #ff6034)"
          @click="showBottom = !showBottom"
          >立即购买</van-button
        >
      </div>
    </main>
    <van-popup v-model:show="showBottom" position="bottom" round :style="{ height: '60%' }">
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
    </van-popup>
  </div>
</template>
<script setup lang="ts">
const userStore = useUserStore();
const router = useRouter();
const activeLi = ref<number>(0);
const showBottom = ref<boolean>(false);

const payList = ref<any>([]);
const vipList = reactive([
  { id: 0, title: "体验VIP", num: 30 },
  { id: 1, title: "15天VIP", num: 30 },
  { id: 2, title: "月卡", num: 30 },
  { id: 3, title: "季度卡", num: 30 },
  { id: 4, title: "年卡", num: 30 },
  { id: 5, title: "终身VIP", num: 30 },
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
const onClickRight = () => {
  if (userStore.token === "-1") {
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
  router.push("/coinDetail");
};
const onBtn = () => {
  showToast("等待开发");
  showBottom.value = false;
  setTimeout(() => {
    router.back();
  }, 1500);
};
</script>

<style lang="less">
.wallet-box {
  @color8: #fc671e;
  padding-top: 46px;

  .van-nav-bar__right {
    color: #fff;
  }

  header {
    margin: 10px;
    padding: 20px;
    background: linear-gradient(90deg, #fe0666, @color8);
    border-radius: 15px;
    color: #fff;
    h1 {
      font-size: 14px;
      font-weight: 600;
    }
    div {
      font-size: 26px;
    }
    p {
      margin-top: 14px;
    }
  }
  main {
    padding: 10px;
    .activity-title {
      text-align: center;
      padding: 10px;
      color: @color7;
      h1 {
        font-size: 16px;
        font-weight: 600;
      }
    }
    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-top: 20px;
      padding: 10px 0;
    }
    ul {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      li {
        border: 1px solid @color8;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 10px;
        text-align: center;
        color: @color8;
      }
      .active-li {
        background: linear-gradient(135deg, @color8 -0.74%, #e8397f 99.26%);
        color: #fff;
        animation: bounceIn 1s;
      }
      h3 {
        font-size: 16px;
        font-weight: 600;
      }
    }
    .btn-box {
      padding: 20px 0;
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

  @keyframes bounceIn {
    0%,
    20%,
    40%,
    60%,
    80%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    0% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    20% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1);
      transform: scale3d(1.1, 1.1, 1.1);
    }

    40% {
      -webkit-transform: scale3d(0.9, 0.9, 0.9);
      transform: scale3d(0.9, 0.9, 0.9);
    }

    60% {
      opacity: 1;
      -webkit-transform: scale3d(1.03, 1.03, 1.03);
      transform: scale3d(1.03, 1.03, 1.03);
    }

    80% {
      -webkit-transform: scale3d(0.97, 0.97, 0.97);
      transform: scale3d(0.97, 0.97, 0.97);
    }

    to {
      opacity: 1;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }

  .animate__bounceIn {
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
    -webkit-animation-duration: calc(var(--animate-duration) * 0.75);
    animation-duration: calc(var(--animate-duration) * 0.75);
    -webkit-animation-name: bounceIn;
    animation-name: bounceIn;
  }
}
</style>
