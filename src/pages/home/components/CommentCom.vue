<template>
  <div class="home-comment-box">
    <van-popup
      v-model:show="showCommentBottom"
      round
      :lock-scroll="false"
      position="bottom"
      :style="{
        position: 'absolute',
        backgroundColor: '#1a1a1a',
        height: '80vh'
      }"
    >
      <div class="popup-box">
        <div class="box-black v-felx">
          <van-icon class="box-black-icon" name="arrow-left" size="24" @click="onBlack" />
          <span class="box-black-text">全部评论（100）</span>
          <span></span>
        </div>
        <div class="box-list">
          <CommentBody v-for="item in 10" :key="item" :curr-item="{}" :is-video="true"></CommentBody>
        </div>

        <div class="set-message">
          <van-row>
            <van-col span="1"> </van-col>
            <van-col span="20">
              <van-cell-group inset>
                <van-field v-model="commentMessage" rows="1" autosize type="textarea" placeholder="新增评论..." />
              </van-cell-group>
            </van-col>
            <van-col span="3">
              <div class="div-right" @click="onSetComment">发布</div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- <Report v-show="homeStore.isReport" is-type="4" @close-popup="onClosePopup"></Report> -->
    </van-popup>
  </div>
</template>

<script setup lang="ts">
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

// 评论弹窗是否显示
const showCommentBottom = computed(() => {
  return homeStore.showCommentBottom
})

// 点击评论返回
const onBlack = () => {
  homeStore.setVideoPaly(true)
  homeStore.setShowCommentBottom(false)
  homeStore.setShoTabbar(true)
}

// 点击发布评论
const onSetComment = () => {}

onMounted(() => {})
</script>

<style lang="less">
.home-comment-box {
  .popup-box {
    color: #fff;
    height: 80vh;
    overflow-y: auto;
    background: #0e1621;
    .box-black {
      width: 100%;
      height: 54px;
      padding: 0 20px;
      font-size: 14px;
      position: absolute;
      top: 0;
      z-index: 1;
      background: #0e1621;
      justify-content: space-between;
    }
    .box-list {
      padding: 0 20px;
      padding-bottom: 75px;
      padding-top: 54px;
    }

    .set-message {
      background-color: #000b19;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 20px;
      left: 0;

      .div-left,
      .div-right {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        background-color: #000b19 !important;

        span {
          margin-left: 5px;
        }
      }

      .van-cell,
      .van-cell__value,
      .van-field__body {
        padding: 0 !important;
        background-color: #000b19 !important;
        border-radius: 60px;
        overflow: hidden;
      }

      textarea {
        background-color: #000b19;
        max-height: 70px;
        padding: 5px 10px;
        color: rgba(255, 255, 255, 0.7);
        border-radius: 60px;
        border: solid 1px rgba(255, 255, 255, 0.21);
        overflow: hidden;
        font-size: 12;
      }

      textarea::-webkit-scrollbar {
        display: none;
      }

      .van-cell-group--inset {
        margin: 0 !important;
        background-color: #1a1a1a !important;
      }

      .div-right {
        color: #fff;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
}
</style>
