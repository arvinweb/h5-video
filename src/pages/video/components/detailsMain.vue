<template>
  <div class="details-main-box">
    <header>
      <p v-if="homeStore.homeConfig?.isPure === 1">
        <span><b>当前为免费视频</b></span>

        <span class="back-home"><a href="#/" class="">返回首页</a></span>
      </p>
      <p v-else-if="homeStore.homeConfig?.isPure === 0">
        <span v-if="currItem.type == 0"><b>当前为免费视频</b></span>
        <span v-else-if="!userStore?.userInfo?.token"><b>您还未登录，请登录后再观看</b></span>
        <span v-else-if="userStore?.userInfo?.token == '-1'"><b>您当前是游客登录，请登录后再观看</b></span>
        <span v-else-if="currItem.type == 1"><b>正在播放VIP视频</b></span>
        <span v-else-if="currItem.type == 2"><b>正在播放付费视频</b></span>

        <span class="back-home"><a href="#/" class="">返回首页</a></span>
      </p>
      <h2>{{ currItem?.name }}</h2>
      <div>
        <label>{{ currItem?.browseCount }}次播放</label>
        <!-- <span>{{ currItem?.favoriteCount }}人收藏</span> -->
      </div>
      <div class="icon-list">
        <!-- <div>
          <van-icon v-if="!currItem?.isStart" size="24" name="good-job-o" @click="onStart(currItem)" />
          <van-icon v-else size="24" name="good-job" color="#fa547a" @click="onStart(currItem)" />
          <b>{{ currItem?.startCount }}</b>
        </div> -->
        <div>
          <van-icon v-if="!currItem?.isLove" size="24" name="like-o" @click="onLive(currItem)" />
          <van-icon v-else size="24" name="like" color="#fa547a" @click="onLive(currItem)" />

          <b>{{ currItem?.loveCount }}</b>
        </div>
        <div>
          <van-icon v-if="!currItem?.isFavorite" size="24" name="star-o" @click="onFavorite(currItem)" />
          <van-icon v-else size="24" name="star" color="#fa547a" @click="onFavorite(currItem)" />
          <b>{{ currItem?.favoriteCount }}</b>
        </div>
      </div>
      <div class="user-info">
        <van-row>
          <van-col span="4">
            <van-image
              round
              width="45px"
              height="45px"
              @click="toPage('/others')"
              :src="baseAddRequestPrefix(currItem?.userInfo?.avatar)"
            />
          </van-col>
          <van-col class="content" span="14">
            <h4>{{ currItem?.userInfo?.name }}</h4>
            <p>{{ currItem?.userInfo?.total }} 部作品 | {{ currItem?.userInfo?.followCount }} 个粉丝</p>
          </van-col>
          <van-col class="content-3" span="6">
            <van-button
              v-if="currItem?.isAccountFollow"
              class="curr-button"
              type="success"
              size="mini"
              @click="onAccountFollow(currItem)"
            >
              关注中
            </van-button>
            <van-button v-else type="success" size="mini" @click="onAccountFollow(currItem)"> + 关注 </van-button>
          </van-col>
        </van-row>
      </div>
      <div class="tag-list">
        <div v-for="item in currItem?.videoTagList" @click="toTag(item)" :key="item.id">
          {{ item.name }}
        </div>
      </div>
    </header>

    <main>
      <VideoItem v-for="item in recommendList" :video-item="item"></VideoItem>
    </main>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~@/store/user'
import { baseAddRequestPrefix } from '@/utils/base'
// import { getVideoRecommend, setLove, setStart, setAccountFollow, setFavorite } from "@/api/manager";
import { getVideoRecommendApi } from '@/api/video'

const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()
const props = defineProps({
  currItem: {
    type: Object,
    default: 0
  }
})

const emits = defineEmits(['geVideoCountApi'])
const accountFollow = ref<any>(false)
const recommendList = ref<any>([])

const isGoodJob = ref<boolean>(false)
const isLike = ref<boolean>(false)
const isStar = ref<boolean>(false)

const toTag = (item: any) => {
  router.push({
    path: '/more',
    query: {
      title: item.name,
      urlType: 'tag',
      id: item.id,
      isRefresh: 1
    }
  })
}

const toPage = (url: string) => {
  router.push({
    path: url,
    query: {
      title: props.currItem.userInfo?.name,
      id: props.currItem.userInfo?.id,
      avatar: props.currItem.userInfo?.avatar,
      followCount: props.currItem.userInfo?.followCount
    }
  })
}
const init = () => {
  const id = router.currentRoute.value.query.id as any
  getVideoRecommend(id)
}
const getVideoRecommend = (id: number) => {
  if (!id) {
    return
  }
  getVideoRecommendApi(id).then((res: any) => {
    recommendList.value = res
  })
}

const verifyLogin = () => {
  if (!userStore?.userInfo?.token) {
    showConfirmDialog({
      title: '提示',
      message: '请先登录'
    })
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        // on cancel
      })
    return false
  }
  if (userStore?.userInfo?.token === '-1') {
    showConfirmDialog({
      title: '提示',
      message: '请先升级'
    })
      .then(() => {
        router.push('/login')
      })
      .catch(() => {
        // on cancel
      })
    return false
  }

  return true
}

const onLive = (item: any) => {
  if (verifyLogin()) {
    // setLove(item.id).then((res: any) => {
    //   emits("geVideoCountApi", "videoCount");
    // });
  }
}
const onStart = (item: any) => {
  if (verifyLogin()) {
    // setStart(item.id).then((res: any) => {
    //   emits("geVideoCountApi", "videoCount");
    // });
  }
}
const onFavorite = (item: any) => {
  if (verifyLogin()) {
    // setFavorite(item.id).then((res: any) => {
    //   emits('geVideoCountApi', 'videoCount')
    // })
  }
}
const onAccountFollow = (item: any) => {
  if (verifyLogin()) {
    // setAccountFollow(item.userInfo?.id).then((res: any) => {
    //   emits('geVideoCountApi', 'accountFollow')
    // })
  }
}

watch(
  () => router.currentRoute.value.query,
  newValue => {
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
<style scoped lang="less">
.details-main-box {
  header {
    padding: 10px;
    text-align: left;
    position: relative;
    & > div {
      margin-top: 5px;
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
      // color: @color5;
    }
    label {
      margin-right: 20px;
    }
    .icon-list {
      // margin-top: 24px;
      display: flex;
      & > div {
        // flex: 1;
        margin-right: 20px;
        line-height: 16px;
        // display: inline-block;
        text-align: center;
      }
      b {
        display: block;
        font-weight: 300;
        font-size: 12px;
      }
    }
    .tag-list {
      // display: grid;
      // grid-template-columns: repeat(4, 1fr);
      // grid-gap: 5px;
      div {
        margin-right: 10px;
        padding: 1px 10px;
        font-size: 10px;
        font-weight: 600;
        background-image: linear-gradient(to bottom, #f68c35 0%, #ffac2f 100%);
        border: none;
        border-radius: 10px;
        display: inline-block;
        color: #fff;
      }
    }
    .user-info {
      padding: 15px 0;
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
        display: flex;
        align-items: center;
        justify-content: right;
      }
      button {
        min-width: 61px;
        height: 28px;
        padding: 0 10px;
        line-height: 28px;
        text-align: center;
        background: #ffffff;
        border: 1px solid #fa8638;
        border-radius: 14px;
        color: #f68c35;
        font-size: 13px;
        font-weight: 600;
      }
      .curr-button {
        background: #fa8638;
        color: #fff;
      }
    }
    p {
      font-size: 14px;
    }
    .back-home {
      position: absolute;
      right: 10px;
      color: #e8397f;
      font-weight: 500;
    }
  }
  main {
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }
}
</style>
