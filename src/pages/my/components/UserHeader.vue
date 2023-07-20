<template>
  <div class="user-header-box">
    <van-row>
      <van-col span="4">
        <span class="icon iconfont user-head-img">&#xe667;</span>
      </van-col>
      <van-col class="content" span="13">
        <h4><span class="icon iconfont">&#xe774;</span> {{ userStore?.userInfo?.username }}</h4>
        <p>个人介绍</p>
      </van-col>
      <van-col class="content-3" span="7">
        <div class="money-box">
          <div class="money-par">
            <h5>我的余额</h5>
            <span>{{ userStore?.userInfo?.goldCoin || 0 }}</span>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script setup lang="ts">
const router = useRouter();
const userStore = useUserStore();

const toPage = (item: string) => {
  router.push(item);
};
</script>

<style scoped lang="less">
.user-header-box {
  .settings-box {
    padding-bottom: 15px;
    height: 60px;
    .icon-setting-o {
      // position: absolute;
      color: #fff;
      // right: 20px;
    }
  }
  .user-head-img {
    font-size: 40px;
  }
  h4 {
    font-size: 13px;
    font-family: Hiragino Sans GB;
    font-weight: normal;
    color: #111111;
  }
  p {
    color: #888888;
  }
  .content {
    padding: 5px 0;
  }
  .icon-setting-o {
    margin-bottom: 5px;
  }
  .content-3 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .money-box {
    background: #fff;
    border-radius: 25px 0 0 25px;
    height: 35px;
    box-sizing: border-box;

    & > div {
      display: inline-block;
      text-align: center;
      line-height: 16px;
    }
    .img-div {
      padding-left: 10px;
      height: 35px;
      line-height: 35px;
      float: left;
    }
    .money-par {
      padding: 4px 10px 4px 5px;
      font-size: 12px;
      h5 {
        color: #a55b1a;
      }
      span {
        color: #d38546;
      }
    }
  }
}
</style>
