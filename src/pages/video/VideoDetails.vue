<template>
  <div class="video-details-box">
    <div class="video-bg" v-if="isPossibleToPlayShow">
      <div class="btn-login">
        <van-icon @click="routerBack" size="18" class="icon-arrow-left" name="arrow-left" />
        <van-button v-if="isPossibleToPlayShow === 1" type="danger" @click.stop="toPage('/login')"> 立即登录</van-button>
        <van-button v-else-if="isPossibleToPlayShow === 2" type="danger" @click.stop="toPage('/buyVip')"> 立即升级</van-button>
        <van-button v-else-if="isPossibleToPlayShow === 3" type="danger" @click.stop="onHavePurchased"> 立即购买</van-button>
      </div>
    </div>
    <VideoCom
      v-if="resultObj"
      class="video-com"
      :curr-item="resultObj"
      :isHavePurchased="isHavePurchased"
      @isPossibleToPlay="isPossibleToPlay"
    ></VideoCom>

    <detailsMain :curr-item="resultObj" @geVideoCountApi="geVideoCountApi"></detailsMain>
  </div>
</template>
<script setup lang="ts">
// import { getVideoDetails, setBrowse, geVideoCount, geWhetherToBuy, setBuyVideo, getAccountFollow } from '@/api/manager'
import { getVideoDetailsApi, setBrowseApi, geVideoCountApi } from '@/api/video'
import VideoCom from '@/pages/video/components/Video.vue'
import detailsMain from '@/pages/video/components/detailsMain.vue'
const router = useRouter()
const userStore = useUserStore()
const homeStore = useHomeStore()

const isPossibleToPlayShow = ref<any>(null)

const isHavePurchased = ref<boolean>(false)

const resultObj = ref<any>(false)
const toPage = (item: string) => {
  router.push(item)
}
const isPossibleToPlay = (item: number) => {
  isPossibleToPlayShow.value = item
}
const setBrowse = (item: { id: string; userInfo: { id: string } }) => {
  if (item.id) {
    console.log(userStore?.userInfo?.id)
    const userId = userStore?.userInfo?.id && userStore?.userInfo?.id != '-1' ? userStore?.userInfo?.id : 0
    setBrowseApi(userId as any, item.id).then((res: any) => {})
  }
}

const routerBack = () => {
  router.back()
}

const geVideoCount = (item: any) => {
  if (resultObj.value.id) {
    if (item === 'accountFollow') {
      getAccountFollowApi(resultObj.value?.userInfo?.id)
      return
    }
    geVideoCountApi(resultObj.value.id, userStore.userInfo?.id).then((res: any) => {
      resultObj.value.browseCount = res.browseCount
      resultObj.value.favoriteCount = res.favoriteCount
      resultObj.value.loveCount = res.loveCount
      resultObj.value.startCount = res.startCount
      resultObj.value.isFavorite = res.isFavorite
      resultObj.value.isStart = res.isStart
      resultObj.value.isLove = res.isLove
    })
  }
}
const onHavePurchased = () => {
  setBuyVideoApi(resultObj.value.id)
  init()
  // geWhetherToBuyApi(resultObj.value?);
}
const setBuyVideoApi = (id: any) => {
  // setBuyVideo(id).then((res: any) => {
  //   if (res) {
  //     isHavePurchased.value = false
  //     showToast('购买成功')
  //   }
  // })
}
const geWhetherToBuyApi = (res: any) => {
  if (!userStore.token || userStore.token === '-1') {
    return
  }
  // geWhetherToBuy(res.id, userStore?.userInfo?.id).then((res: any) => {
  //   console.log(res)
  //   if (res) {
  //     isHavePurchased.value = res === 1 ? true : false
  //   }
  // })
}
const getAccountFollowApi = (id: any) => {
  if (!id) {
    return
  }
  if (!userStore.userInfo?.token || userStore.userInfo?.token === '-1') {
    return
  }

  // getAccountFollow(id).then((res: any) => {
  //   resultObj.value.isAccountFollow = res
  // })
}

const init = () => {
  resultObj.value = false
  isHavePurchased.value = false
  isPossibleToPlayShow.value = null
  document.documentElement.scrollTop = 0
  const id = router.currentRoute.value.query.id as any
  getVideoDetailsApi(id).then((res: any) => {
    resultObj.value = res
    // setBrowse(res)
    geVideoCount('videoCount')
  })
}

watch(
  () => router.currentRoute.value.query.id,
  (newValue, oldVlu) => {
    if (router.currentRoute.value.name === 'video') {
      init()
    }
  },
  { deep: true }
)

onMounted(() => {
  init()
})
</script>
<style lang="less">
.video-details-box {
  padding-top: 210px;
  .video-com {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
  }
  .video-bg {
    width: 100%;
    height: 210px;
    position: fixed;
    z-index: 9;
    top: 0;
    img {
      max-width: 14rem !important;
      max-height: 6rem !important;
    }
    .btn-login {
      width: 100%;
      height: 100%;
      max-width: 14rem !important;
      max-height: 6rem !important;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgb(#000, 1);
      overflow: hidden;

      button {
        width: 90px;
        height: 45px;
        font-size: 14px;
        font-weight: 600;
        background: linear-gradient(90deg, #f889b5, #e8397f 99.26%);
      }
    }
    .icon-arrow-left {
      position: absolute;
      left: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      z-index: 3;
      color: #fff;
      background: rgba(0, 0, 0, 0.612);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-right: 2px;
    }
  }
}
</style>
