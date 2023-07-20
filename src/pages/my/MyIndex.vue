<template>
  <div class="my-index-box">
    <van-nav-bar :fixed="true" title="我的">
      <template #right>
        <!-- <span @click="onClickRight">购买记录</span> -->
        <van-icon class="icon-setting-o" color="#fff" size="24" name="setting-o" @click="toPage('/settings')" />
      </template>
    </van-nav-bar>
    <header>
      <UserHeader></UserHeader>
    </header>
    <main>
      <!-- <div class="vip-info"></div> -->

      <div class="money-info-box">
        <div class="video-item" @click="toPage('/wallet')">
          <h4>钱包余额</h4>
          <span> <span class="icon iconfont f-40">&#xe627;</span>{{ userStore?.userInfo?.goldCoin || 0 }}</span>
        </div>
        <div class="money-item" @click="toPage('/buyVip')">
          <h4>会员中心</h4>
          <span>去开通</span>
        </div>
      </div>
      <ul>
        <li v-for="item in tabsList" :key="item.id" @click="onRecord(item)">
          <div>
            <span class="icon iconfont font-60" :class="item.icon"></span>
          </div>
          <label>{{ item.title }}</label>
        </li>
      </ul>
      <div class="activity-info-box">
        <img :src="activityInfoImg" alt="" />
      </div>
      <ul>
        <li v-for="item in VideoPackageList" :key="item.id">
          <div>
            <img :src="item.icon" alt="" />
          </div>
          <label>{{ item.title }}</label>
        </li>
      </ul>
    </main>
    <footer>
      <!-- <div v-for="(item, pageIndex) in tabsList" :key="item.id">
        {{ item.title }}
      </div> -->
      <!-- <van-tabs v-model:active="active" swipeable>
        <van-tab v-for="(item, pageIndex) in tabsList" :key="item.id" :title="item.title">
          <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false">
            55
          </van-list>
        </van-tab>
      </van-tabs> -->
    </footer>
  </div>
</template>
<script setup lang="ts">
import UserHeader from '@/pages/my/components/UserHeader.vue'

import icon1Img from '@/assets/images/my/icon-1.png'
import icon2Img from '@/assets/images/my/icon-2.png'
import icon3Img from '@/assets/images/my/icon-3.png'
import icon4Img from '@/assets/images/my/icon-4.png'
import activityInfoImg from '@/assets/images/activity-info.png'
const router = useRouter()
const userStore = useUserStore()
const tabsList = reactive([
  { id: 0, title: '收藏视频', tag: 'favorite', icon: 'icon-jiaxingshoucang' },
  { id: 1, title: '历史记录', tag: 'browse', icon: 'icon-lishijilu1' },
  { id: 2, title: '购买记录', icon: 'icon-goumaijilu1-copy' },
  { id: 3, title: '离线视频', icon: 'icon-icon--copy' }
])

const VideoPackageList = reactive([
  { id: 0, title: '分享', url: '', icon: icon1Img },
  { id: 1, title: '客服', url: '', icon: icon2Img },
  { id: 2, title: '群组', url: '', icon: icon3Img },
  { id: 3, title: '邮箱', url: '', icon: icon4Img }
])

const onRecord = (item: any) => {
  if (item.id === 3) {
    showToast('请下载APP')
  } else if (item.id === 2) {
    if (userStore.token === '-1') {
      showConfirmDialog({
        title: '提示',
        message: '账号权限不足，是否立即注册登录？'
      })
        .then(() => {
          router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
      return
    }
    toPage('/coinDetail')
  } else {
    if (userStore.token === '-1') {
      showConfirmDialog({
        title: '提示',
        message: '账号权限不足，是否立即注册登录？'
      })
        .then(() => {
          router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
      return
    }
    router.push({
      path: '/more',
      query: {
        title: item.title,
        urlType: item.tag
      }
    })
  }
}
const toPage = (item: string) => {
  router.push(item)
}
onMounted(() => {
  if (userStore.token != '-1') {
    userStore.getUser()
  }
})
</script>

<style lang="less">
.my-index-box {
  padding-top: 46px;
  padding-bottom: 65px;

  background: #fff;
  header {
    padding: 10px;
    .settings-box {
      padding-bottom: 15px;
      height: 60px;
      .icon-setting-o {
        // position: absolute;
        color: #fff;
        // right: 20px;
      }
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
        h5 {
          color: #a55b1a;
        }
        span {
          color: #d38546;
        }
      }
    }
  }
  .vip-info {
    background: linear-gradient(90deg, #dd9118, #e58b0a);
    opacity: 0.3;
    border-radius: 3px;
    height: 90px;
    margin: 0 10px;
    padding: 15px;
    box-sizing: border-box;
  }
  main {
    .money-info-box {
      padding: 10px 5px;
      border-bottom: 10px solid #eee;
      border-top: 10px solid #eee;
      display: flex;
      & > div {
        flex: 1;
        height: 76px;
        color: #fff;
        margin: 0 5px;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        font-weight: 600;
        & > * {
          height: 28px;
          line-height: 28px;
        }
      }
      .money-item {
        background: #fc671e;
      }
      .video-item {
        background: #fa057f;
      }
      h4 {
        font-size: 15px;
      }
      span {
        font-size: 14px;
      }
    }
    .activity-info-box {
      border-bottom: 10px solid #eee;
      padding: 10px;
      height: 120px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    ul {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
      text-align: center;
      padding: 10px 0;
      border-bottom: 10px solid #eee;
      li {
        text-align: center;
        div {
          display: flex;
          justify-content: center;
        }
      }

      img {
        width: 40px;
        height: 40px;
        margin-bottom: 10px;
        border-radius: 40px;
      }
    }
    label {
      color: #333;
      font-size: 14px;
      font-weight: 500;
    }
  }
  footer {
    padding: 10px;

    .van-tabs__line {
      background: @color1;
    }
    display: flex;
    & > div {
      flex: 1;
      text-align: center;
    }
  }
  .font-60 {
    font-size: 30px;
  }
}
</style>
