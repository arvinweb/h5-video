<template>
  <div class="setting-index-box">
    <van-nav-bar :fixed="true" title="设置">
      <template #left>
        <van-icon size="20" name="arrow-left" color="#000" @click="onClickLeft" />
      </template>
    </van-nav-bar>
    <header>
      <span class="icon iconfont user-head-img">&#xe667;</span>
    </header>
    <main>
      <div v-for="item in list" :key="item.id" class="van-hairline--bottom">
        <van-cell :title="item.title" is-link arrow-direction="right" :value="item.content">
          <template #icon>
            <span class="icon iconfont" :class="item.icon"></span>
          </template>
        </van-cell>
      </div>
    </main>
    <footer>
      <van-button color="linear-gradient(to right, #fc671e, #ff6034)" type="primary" block @click="onBtn"> 退出登录 </van-button>
    </footer>
  </div>
</template>
<script setup lang="ts">
import activityInfoImg from "@/assets/images/activity-info.png";

const userStore = useUserStore();
const router = useRouter();
const active = ref<number>(0);
const showBottom = ref<boolean>(false);

const payList = ref<any>([]);
const list = reactive([
  { id: 0, title: "昵称", content: userStore.userInfo?.username, icon: "icon-xingmingyonghumingnicheng" },
  { id: 1, title: "性别", content: "保密", icon: "icon-xingbie-xian" },
  { id: 2, title: "账号管理", content: "", icon: "icon-zhanghaoguanli" },
  { id: 3, title: "手机号码", content: "", icon: "icon-shoujihaoma" },
  { id: 4, title: "修改密码", content: "", icon: "icon-icon_xiugaimima" },
]);
const onClickLeft = () => {
  router.back();
};
const onBtn = () => {
  userStore.setUserInfo({} as any);
  router.push("/");
};
</script>

<style lang="less">
.setting-index-box {
  padding-top: 46px;
  header {
    text-align: center;
    padding: 10px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50px;
      margin: 0 auto;
    }
    .user-head-img {
      font-size: 60px;
    }
    .icon-edit {
      position: relative;
      left: 35px;
      top: -15px;
    }
  }
  .van-cell--clickable {
    height: 50px;
    i {
      display: flex;
      align-items: center;
      margin-right: 15px;
    }
    .iconfont {
      margin-right: 15px;
    }
  }
  footer {
    padding: 20px;
  }
}
</style>
