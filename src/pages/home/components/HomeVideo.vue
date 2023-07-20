<template>
  <div class="home-video-box" @click.stop="onPayl">
    <video-player
      ref="videoRef"
      :width="(options.width as any)"
      :height="homeStore.homeVideoItem.height"
      :playsinline="true"
      :src="options.src"
      :poster="options.poster"
      :isFullscreen="isFullscreen"
      controls
      @play="onPlay"
      @onPause="onPause"
      @timeupdate="onTimeupdate"
      @fullscreenchange="onPlayerFullScreenchange($event)"
    />
  </div>
</template>
<script setup lang="ts">
// import Hls from 'hls.js'
// import DPlayer from 'dplayer'

import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import { useHomeStore } from '~@/store/home'
const props = defineProps({
  currItem: {
    type: Object,
    default: 0
  },
  isHavePurchased: {
    type: Boolean,
    default: false
  }
})
const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()

const emits = defineEmits(['isPossibleToPlay'])
const isFullscreen = ref<boolean>(false)
// 视频dom
const videoRef = ref<any>(null)
const duration = ref<number>()
const surplusTime = ref<number>(10)
const videoTime = ref<any>(null)

const options = reactive({
  width: '750px', //播放器宽度
  height: '100%', //播放器高度
  src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', //视频源
  // src: "http://103.43.71.90/" + props.currItem.url, //视频源
  // src: props.currItem.url, //视频源
  type: 'm3u8', //视频类型
  muted: true, //静音
  logo: '',
  poster: 'http://101.43.70.172:8000/uploads/2023/06/15/1686806179476555.gif'
})
console.log(props.currItem)

const routerBack = () => {
  router.back()
}
const onPlay = () => {
  console.log('开始播放')
}
const onPause = () => {
  console.log('onPause')
}
const onTimeupdate = (e: any) => {
  videoTime.value = Math.floor(e.target?.children[0]?.currentTime)
  if (homeStore.homeConfig?.isPure || props.currItem.type === 0) {
    return
  }
  if (userStore.token && userStore.token !== '-1') {
    const resultObj = props.currItem as any
    // 是会员但是购买VIP
    if (resultObj?.type == 1 && resultObj?.isVip) {
      return
    }
    // 是会员但是购买付费视频
    if (resultObj?.type === 2 && props.isHavePurchased) {
      return
    }
  }

  if (videoTime.value >= homeStore.homeConfig?.vipTime) {
    exitFullscreen(e)
  }
}

const onPlayerFullScreenchange = (item: any) => {
  isFullscreen.value = !isFullscreen.value
}
const exitFullscreen = (videoRef: any) => {
  if (videoRef.target.children[0].exitFullscreen) {
    videoRef.target.children[0].exitFullscreen()
  } else if (videoRef.target.children[0].msExitFullscreen) {
    videoRef.target.children[0].msExitFullscreen()
  } else if (videoRef.target.children[0].mozCancelFullScreen) {
    videoRef.target.children[0].mozCancelFullScreen()
  } else if (videoRef.target.children[0].oRequestFullscreen) {
    videoRef.target.children[0].oCancelFullScreen()
  } else if (videoRef.target.children[0].webkitExitFullscreen) {
    videoRef.target.children[0]?.webkitExitFullscreen()
  }
  nextTick(() => {
    const wind = window.document.querySelector('video') as any
    const resultObj = props.currItem as any
    console.log(resultObj.type)
    if (resultObj?.type == 0 || homeStore.homeConfig?.isPure === 1) {
      return
    }
    // 未登录
    if (!userStore.token || userStore.token == '-1') {
      wind.pause()
      videoRef.target.children[0].currentTime = 0
      emits('isPossibleToPlay', 1)
      return
    }
    // 是会员但是没有购买VIP
    if (resultObj?.type == 1) {
      if (!resultObj?.isVip) {
        wind.pause()
        videoRef.target.children[0].currentTime = 0
        emits('isPossibleToPlay', 2)
      }
    }
    // 是会员但是没有购买付费视频
    if (resultObj?.type === 2) {
      console.log(props.isHavePurchased)
      if (!props.isHavePurchased) {
        wind.pause()
        videoRef.target.children[0].currentTime = 0
        emits('isPossibleToPlay', 3)
      }
    }
    // showConfirmDialog({
    //   title: "观看提示",
    //   message: "请购买VIP观看完整视频",
    // })
    //   .then(() => {
    //     router.push("/buyVip");
    //   })
    //   .catch(() => {
    //     videoRef.target.children[0].currentTime = 0;
    //     // on cancel
    //   });
  })
}

const orderScroll = (e: any) => {
  console.log(e)
}

const onPayl = () => {
  console.log(333)
}

const init = () => {}

// 监听公共数据控制播放和暂停
watch(
  () => homeStore.homeVideoItem.videoPaly,
  newValue => {
    const wind = window.document.querySelector('video') as any
    console.log(newValue)
    if (!newValue) {
      wind.pause()
    } else {
      wind.play()
    }
  },
  { deep: true }
)

onMounted(() => {
  init()
})
</script>
<style lang="less">
.home-video-box {
  width: 100%;
  height: 100%;
  position: relative;
  .vjs-control-bar {
    display: none;
  }
}
video {
  width: 100% !important;
  height: 100% !important;
}
.vjs-big-play-button {
  z-index: 1;
}
</style>
