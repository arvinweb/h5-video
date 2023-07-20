<template>
  <div class="dynamic-comment-box">
    <van-row>
      <van-col span="4">
        <van-image :src="noticeImg" round width="40" height="40"></van-image>
      </van-col>
      <van-col span="18">
        <div class="user-nicename">
          {{ '名字' }}
          <van-icon name="location" />
          <span>{{ '城市' }}</span>
          <span>{{ '发布时间' }}</span>
        </div>
        <p class="">55</p>
        <div v-if="deleteFlag" class="delete-box" @click="deleteItem(currItem)">删除</div>
        <div class="report-icon" @click="onEllipsis">
          <span>举报</span>
        </div>
      </van-col>
      <van-col span="2">
        <div class="like-box" @click="onLike()">
          <van-icon v-if="islike" class="icon-like" name="like" />
          <van-icon v-else class="icon-box" name="like-o" />

          <div class="color-white">5</div>
        </div>
      </van-col>
    </van-row>
    <van-popup v-model:show="showBottom" position="bottom" :style="{ height: '90%' }">
      <Report :curr-item="currItem" :is-type="isType" @close-popup="onClosePopup"></Report>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { baseFilterLikes } from '@/utils/base'
import noticeImg from '@/assets/images/home/notice.png'
const userStore = useUserStore()
const homeStore = useHomeStore()
const userinfo = useUserStore()
const router = useRouter()

const showBottom = ref(false)
const props = defineProps({
  currItem: {
    type: Object,
    required: true,
    default: () => {}
  },
  isVideo: {
    type: Boolean,
    required: true,
    default: false
  },
  index: {
    type: Number,
    required: true,
    default: 0
  }
})

const isType = computed(() => {
  // 评论，如果是视频那就是视频评论，如果是动态就是动态评论
  return props.isVideo ? '4' : '2'
})

const deleteFlag = computed(() => {
  let result = false
  if (userStore.userInfo && 'id' in userStore.userInfo) {
    if (userStore.userInfo.id === props.currItem.userinfo.id) {
      result = true
    }
  }
  return result
})

const islike = ref<boolean>(false)

// 点击点赞
const onLike = () => {}

const deleteItem = (item: any) => {}
const onEllipsis = () => {}
const onClosePopup = () => {
  showBottom.value = !showBottom.value
}

const filterLikes = (item: any) => {}
</script>

<style scoped lang="less">
.dynamic-comment-box {
  padding: 10px 0;
  font-size: 12px;
  .user-nicename {
    font-size: 10px;
    font-weight: 600;
    color: #46566b;
  }
  p {
    font-size: 12px;
    font-weight: 400;
    color: #fff;
    word-break: break-all;
    line-height: 14px;
  }
  .delete-box {
    color: #fff;
    display: inline-block;
    margin-right: 7px;
  }
  .report-icon {
    color: #f94f76;
    display: flex;
    span {
      font-size: 10px;
      transform: scale(0.83333);
      transform-origin: 0 0;
      white-space: nowrap;
    }
  }
  .like-box {
    text-align: right;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: right;
    * {
      display: inline-block;
    }
  }
  .icon-box {
    color: #6f7a89;
    font-size: 14px;
  }
  .icon-like {
    color: #ff297e;
    font-size: 14px;
  }
  .color-white {
    margin-left: 4px;
    color: #6f7a89;
    font-size: 12px;
    font-weight: 300;
  }
  .ellipsis-box {
    display: flex;
    justify-content: right;
    .ellipsis {
      font-size: 14px;
      color: #fff;
      // margin-left: 4px;
      position: relative;
      top: 4px;
      left: 4px;
      transform: rotate(90deg);
    }
  }
}
</style>
