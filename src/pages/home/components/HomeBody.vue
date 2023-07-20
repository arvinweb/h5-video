<template>
  <div class="home-body-box" @click.stop="onStop">
    <div class="body-content v-felx" :style="bodyClass">
      <van-image class="body-bg-img" :src="currItem.poster" fit="cover">
        <template #loading>
          <div class="default-bg-img-box">加载中...</div>
        </template>
      </van-image>
    </div>
    <!-- 评论点赞等 -->
    <div class="right-module" @click.stop="onCaptureComment">
      <div>
        <div class="ellipse-6 avatar" @click="toOtherMine()">
          <img :src="noticeImg" alt="" />
          <!-- 添加关注 -->
          <img class="isAttention-img" :src="releaseImg" alt="" @click.stop="setAttent()" />
        </div>
        <div>&nbsp;</div>
      </div>
      <!-- 点赞 -->
      <div>
        <div class="ellipse-6" @click="onLike">
          <van-icon class="like-o-icon" :name="isLink ? likeTrueImg : likeFalseImg" size="24" />
        </div>
        <p>50</p>
      </div>
      <!-- 评论 -->
      <div>
        <div class="ellipse-6" @click="getComments">
          <van-icon class="like-o-icon" :name="commentImg" size="24" />
        </div>
        <p>15</p>
      </div>
      <!-- 收藏 -->
      <!-- <div>
        <div class="ellipse-6" @click="onCollect">
          <van-icon class="like-o-icon" :name="starTrueImg" size="24" />
        </div>
        <p>50</p>
      </div> -->
      <!-- 分享 -->
      <div>
        <div class="ellipse-6" @click="onShareVideo">
          <van-icon class="like-o-icon" :name="aircraftImg" size="24" />
        </div>
        <p>分享</p>
      </div>
    </div>

    <!-- 底部模块 -->
    <div class="bottom-content" @click.stop="onCaptureComment">
      <div class="centene-label-box">
        <div v-for="item in 3" :key="item">清纯</div>
      </div>
      <div class="name-box" @click.stop="toOtherMine()">
        名字吗ing在
        <div v-if="isAdvertise" class="name-box-btn">
          <span>广告详情</span>
        </div>
      </div>
      <div class="curr-hot-box">
        <van-icon :name="fireImg" size="16" class="icon-fire" />
        <span>{{ 'title' }}</span>
        <div>
          <van-icon class="icon-color-1" name="play" />
        </div>
        <div>
          <van-icon class="icon-color-2" name="play" />
        </div>
        <div>
          <van-icon class="icon-color-3" name="play" />
        </div>
      </div>
    </div>

    <div class="video-paly-box" v-show="!homeStore.homeVideoItem.videoPaly">
      <img :src="videoPalyImg" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import aircraftImg from '@/assets/images/home/icon/aircraft1.png'
import noticeImg from '@/assets/images/home/notice.png'
import commentImg from '@/assets/images/home/icon/comment1.png'
import releaseImg from '@/assets/images/home/icon/release.png'
import fireImg from '@/assets/images/home/fire.png'
import likeTrueImg from '@/assets/images/home/icon/likeTrue1.png'
import likeFalseImg from '@/assets/images/home/icon/likeFalse1.png'
import videoPalyImg from '@/assets/images/home/video-paly.png'
import starTrueImg from '@/assets/images/home/icon/starTrue1.png'
import starFalseImg from '@/assets/images/home/icon/starFalse1.png'
const homeStore = useHomeStore()
const userStore = useUserStore()
const router = useRouter()

const props = defineProps({
  currItem: {
    type: Object,
    required: true,
    default: () => {}
  },
  swipeIndex: {
    type: Number,
    required: true,
    default: () => 0
  },
  currIndex: {
    type: Number,
    required: true,
    default: () => 0
  }
})

// 点赞状态
const isLink = ref<boolean>(false)

// 评论内容
const commentMessage = ref<string>('')

// 广告状态
const isAdvertise = ref<boolean>(false)

// 评论弹窗是否显示
const showCommentBottom = computed(() => {
  return homeStore.showCommentBottom
})

// 控制背景图显示和隐藏
const bodyClass = computed(() => {
  let reslut = 'opacity: 1'
  if (props.swipeIndex === props.swipeIndex && homeStore.homeVideoItem.isShow) {
    reslut = 'opacity: 0'
  }
  return reslut
})
// 点击头像
const toOtherMine = () => {}

// 点击喜欢
const onLike = () => {
  isLink.value = !isLink.value
  console.log('点击喜欢')
}

// 点击评论返回
const onBlack = () => {
  homeStore.setShowCommentBottom(false)
  homeStore.setShoTabbar(true)
}

// 点击评论
const getComments = () => {
  homeStore.setVideoPaly(false)
  homeStore.setShowCommentBottom(true)
  homeStore.setShoTabbar(false)
}

// 点击收藏
const onCollect = () => {}

// 点击分享
const onShareVideo = () => {}

// 点击添加关注
const setAttent = () => {}

// 点击发布评论
const onSetComment = () => {}

// 捕获点击评论模块
const onCaptureComment = () => {
  console.log(homeStore.homeVideoItem.isSllowPlay)
  if (homeStore.homeVideoItem.isSllowPlay) {
    return
  }
  homeStore.setIsSllowPlay(true)
}

const onStop = () => {
  console.log('点击stop')
  homeStore.setVideoPaly(!homeStore.homeVideoItem.videoPaly)
}

onMounted(() => {})
</script>

<style scoped lang="less">
.home-body-box {
  height: 100%;
  width: 100%;
  position: relative;

  .body-content {
    height: 100%;
    width: 100%;
    .body-bg-img {
      width: 100%;
    }
  }

  .right-module {
    position: absolute;
    bottom: 100px;
    right: 20px;
    line-height: 14px;
    color: #fff;
    & > div {
      margin-top: 10px;
    }
    .ellipse-6 {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar {
      width: 38px;
      height: 38px;
      position: relative;
    }
    .isAttention-img {
      position: absolute;
      width: 16px;
      height: 16px;
      bottom: -8px;
      border: none;
    }
    .like-o-icon {
      width: 30px;
      height: 30px;
    }
    p {
      font-size: 12px;
    }
  }

  .bottom-content {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 70px;
    text-align: left;

    .centene-label-box {
      padding: 0 20px;
      & > div {
        display: inline-block;
        padding: 0.3px 10px;
        border-radius: 30px;
        border: solid 0.4px #ff086a;
        background-color: rgba(255, 8, 106, 0.2);
        font-size: 12px;
        margin-right: 8px;
        color: #ff086a;
      }
    }

    .name-box {
      width: 100%;
      height: 22px;
      line-height: 22px;
      font-family: PingFangSC;
      font-size: 16px;
      font-weight: 900;
      color: #fff;
      margin: 10px 0;
      padding-left: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .name-box-btn {
        width: 60px;
        height: 16px;
        font-size: 10px;
        background-image: linear-gradient(178deg, #ff086a -49%, #de67e8 110%);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2px 10px;
        border-radius: 15px;
        margin-left: 5px;
        span {
          margin-top: 4px;
          margin-left: 9px;
          font-size: 10px;
          transform: scale(0.83333);
          transform-origin: 0 0;
          white-space: nowrap;
        }
      }
    }

    .curr-hot-box {
      width: calc(100%-40px);
      height: 25px;
      line-height: 25px;
      margin-top: 8px;
      -webkit-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      background-color: rgba(0, 0, 0, 0.6);
      padding: 4px 8px;
      margin: 0 20px;
      border-radius: 50px;
      display: flex;
      align-items: center;

      span {
        font-family: PingFangSC;
        font-size: 12px;
        font-weight: normal;
        color: #ff6291;
        display: inline-block;
        max-width: 277px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      div {
        display: inline-block;
        width: 6.7px;
        height: 10px;
        margin-right: 3px;
        font-size: 6px;
        display: flex;
        align-items: center;
      }

      .icon-fire {
        color: #ff6291;
        margin-right: 3px;
        height: 100%;
      }

      .icon-color-1 {
        color: #ff6291;
      }

      .icon-color-2 {
        color: rgba(255, 98, 145, 0.7);
      }

      .icon-color-3 {
        color: rgba(255, 98, 145, 0.5);
      }
    }
  }

  .video-paly-box {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
  }
}
</style>
