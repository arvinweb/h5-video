<template>
  <div v-if="currItem" class="dynamic-box">
    <Profile :curr-item="currItem" :delete-show="deleteShow"></Profile>
    <!-- <Profile :curr-item="currItem" :delete-show="deleteShow" @delete-dynamic="deleteDynamic"></Profile> -->
    <div class="content-text">
      <p :class="{ 'max-height': route.currentRoute.value.name === 'dynamic' }" @click="goPage">
        顺利打开附件的绿色开放接口连接打死；昆仑山搭街坊立刻大家来看
      </p>
      <!-- <span @click="goPage">查看全部</span> -->
    </div>

    <DynamicImg></DynamicImg>
    <!-- 标签 -->
    <div class="tab-list-box">
      <div v-for="item in currItem?.tags" :key="item.id" @click="goToPage(item)">
        {{ item?.name }}
      </div>
    </div>

    <van-row class="">
      <van-col span="4">
        <van-icon class="icon-box" name="chat-o" @click="goPage" />
        <span class="color-white">{{ baseFilterLikes(5) }}</span>
      </van-col>
      <van-col span="12">
        <van-icon
          class="icon-box"
          :class="{ 'icon-like': currItem.islike != 0 }"
          :name="currItem.islike == 0 ? 'like-o' : 'like'"
          @click="onLike()"
        />
        <span class="color-white star-right">{{ baseFilterLikes(5) }}</span>
        <van-icon
          class="icon-box"
          :class="{ 'icon-like': currItem.iscollect != 0 }"
          :name="currItem.iscollect == 0 ? 'star-o' : 'star'"
          @click="onCollect()"
        />
      </van-col>
      <van-col span="6"></van-col>
      <van-col span="2" @click="onEllipsis">
        <van-icon class="like-o-icon" name="ellipsis" />
      </van-col>
    </van-row>
  </div>
</template>

<script setup lang="ts">
import { baseFilterLikes } from '@/utils/base'
import Profile from '@/pages/dynamic/components/Profile.vue'
import DynamicImg from '@/pages/dynamic/components/DynamicImg.vue'

import palyImg from '@/assets/images/dynamic/set-live.png'
import liveBgImg from '@/assets/images/dynamic/live-bg.png'
const emits = defineEmits(['deleteDynamic'])
const userStore = useUserStore()
const dynamicStore = useDynamicStore()
const route = useRouter()
const props = defineProps({
  currItem: {
    type: Object,
    required: true,
    default: () => Object
  },
  deleteShow: {
    type: Boolean,
    default: () => false
  }
})
const isLiveImg = ref(false)
// 用来处理节流
const apiResult = ref(false)

const qrCodeUrl = ref<any>(null)
const router = useRouter()
const content = ref<HTMLElement>()
const moreShow = ref(false as any)
const onMore = ref(false as any)

const showBtnFn = () => {
  const clientHeight = content.value?.clientHeight as any
  moreShow.value = clientHeight > 30
  onMore.value = moreShow.value
}

const goPage = () => {
  router.push({
    name: 'dynamicDetails',
    query: {
      id: props.currItem.id
    }
  })
}
const getQrCode = () => {
  qrCodeUrl.value = ''
}

const onCollect = () => {
  if (!userStore.userInfo?.token) {
    showToast('请注册/登陆正式账户')
    return
  }
  if (!checkFn()) {
    return
  }
  apiResult.value = true
  const params = {
    service: 'Dynamic.AddCollection',
    dynamicid: props.currItem.id
  }
}

const onLike = () => {
  if (!userStore.userInfo?.token) {
    showToast('请注册/登陆正式账户')
    return
  }
  if (!checkFn()) {
    return
  }

  apiResult.value = true
  const dynamicid = props.currItem.id
  const params = {
    service: 'Dynamic.AddLike',
    dynamicid: dynamicid
  }
}

const recommendInit = (result: any, type: string) => {
  if (!result) {
    return
  }
  // const recommend = JSON.parse(JSON.stringify(dynamicStore.recommend))
  // recommend.forEach((item: { id: any; iscollect: any; islike: any; likes: any }) => {
  //   if (item.id === props.currItem.id) {
  //     if (type === 'iscollect') {
  //       item.iscollect = result.iscollect
  //     }
  //     if (type === 'islike') {
  //       item.islike = result.islike
  //       item.likes = result.likes
  //     }
  //   }
  // })
  // dynamicStore.updateRecommend(recommend)
  // if (route.currentRoute.value.name === 'dynamicDetails') {
  //   const dynamicDetails = JSON.parse(JSON.stringify(dynamicStore.dynamicDetails))
  //   if (type === 'iscollect') {
  //     dynamicDetails.userinfo.iscollect = result.iscollect
  //   }
  //   if (type === 'islike') {
  //     dynamicDetails.userinfo.islike = result.islike
  //     dynamicDetails.userinfo.likes = result.likes
  //   }
  //   communityStore.updateDynamicDetails(dynamicDetails)
  // }
}

// 接口请求前校验
const checkFn = () => {
  if (!userStore.userInfo?.token) {
    return false
  }
  if (apiResult.value) {
    return false
  }
  return true
}

const onEllipsis = () => {
  getQrCode()
}

const goToPage = (item: any) => {
  if (router.currentRoute.value.name === 'dynamicType') {
    return
  }
  router.push({
    path: '/dynamicType',
    query: {
      name: item.name,
      id: item.id
    }
  })
}

const deleteDynamic = (item: any) => {
  emits('deleteDynamic', item)
}

const onLiveImg = (item: any) => {
  const par = {
    isLiveImg: true,
    showIndicators: false,
    showIndex: false,
    preload: true,
    href: props.currItem.href,
    thumb: props.currItem.thumb
  }
  // communityStore.updateVideoObj(par)
  isLiveImg.value = !isLiveImg.value
}

onMounted(() => {
  showBtnFn()
})
</script>
<style scoped lang="less">
.dynamic-box {
  margin-bottom: 10px;
  padding: 0 20px;
  height: 100%;
  text-align: left;
  position: relative;

  .content-text {
    margin-bottom: 10px;
    position: relative;
  }

  p {
    line-height: 19px;
    letter-spacing: 1px;
    font-size: 12px;
    font-weight: 300;
    text-align: left;
    color: #e1e1e1;
    white-space: pre-wrap;
  }
  .max-height {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;

    overflow: hidden;
  }
  span {
    font-size: 12px;
    font-weight: 600;
    color: #fff;
  }
  .more {
    display: inline-block;
    line-height: 20px;
    line-height: 20px;
  }
  .icon-box {
    color: #6f7a89;
    font-size: 20px;
  }
  .icon-like {
    color: #ff297e;
  }
  .star-right {
    margin-right: 15px;
  }
  .color-white {
    margin-left: 8px;
    color: #6f7a89;
  }
  .van-col {
    display: flex;
    align-items: center;
  }
  .van-row {
    padding: 10px 0px;
    & > div {
      display: flex;
      align-items: center;
    }
  }
  .like-o-icon {
    font-size: 20px;
    color: #6f7a89;
  }
  .content {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    z-index: -1;
  }
  .audio-box {
    position: relative;

    span {
      position: absolute;
      right: 5px;
    }
  }
  :deep(.van-overlay) {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 226px;
      height: 358px;
      background-color: #fff;
      color: red;
      // background: url('@/assets/images/home/videoShareBg5.png');
      background-size: cover;
      position: relative;
      .invitation-code {
        height: 20px;
        line-height: 20px;
        padding: 0 10px;
        position: absolute;
        top: 152px;
        right: 0;
        display: flex;
        text-align: right;
        font-family: PingFangSC;
        font-size: 12px;
        font-weight: 500;
        color: rgba(25, 25, 30, 0.7);
      }
      .qr-code {
        width: 100px;
        height: 100px;
        border-radius: 3px;
        background-color: #d9d9d9;
        position: absolute;
        right: 10px;
        bottom: 86px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .url-text {
        width: 100%;
        position: absolute;
        right: 0;
        bottom: 37px;
        padding: 0 10px;
        box-sizing: border-box;
        div {
          line-height: 10px;
          font-family: PingFangSC;
          font-size: 12px;
          font-weight: 500;
          color: rgba(25, 25, 30, 0.7);
          margin-bottom: 5px;
          text-align: right;
        }
        div:nth-child(3) {
          color: red !important;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .btn-list {
        width: 100%;
        display: flex;
        padding: 0 9px;
        box-sizing: border-box;
        position: absolute;
        right: 0px;
        bottom: 8px;
        .btn-item {
          width: 102px;
          height: 30px;
          font-size: 10px;
          font-family: PingFangSC;
          font-weight: 500;
          color: rgba(25, 25, 30, 0.7);
          border: none;
        }
        .btn-item:nth-child(1) {
          background-color: #f94f76;
          margin-right: 4px;
        }
        .btn-item:nth-child(2) {
          background-color: #bbb;
        }
      }
    }
  }
  .content-box {
    padding-bottom: 20px;
  }
  .label-box {
    height: 21px;
    line-height: 21px;
    padding: 0 10px;
    border-radius: 16px;
    border: solid 0.5px #fff;
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    text-align: center;
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .tab-list-box {
    margin-bottom: 10px;
    div {
      display: inline-block;
      margin-right: 10px;
      color: #ff086a;
      height: 21px;
      line-height: 21px;
      padding: 0 10px;
      border-radius: 15px;
      border: solid 1px #ff086a;
      background-color: rgba(255, 8, 106, 0.1);
    }
  }
  .paly-box {
    width: 335px;
    height: 220px;
    background-size: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-position: center center;
    img {
      width: 60px;
      height: 60px;
    }
  }
  video {
    width: 100%;
  }
}
</style>
