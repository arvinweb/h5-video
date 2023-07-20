<template>
  <div class="video-box">
    <van-icon @click="routerBack" size="18" class="icon-arrow-left" name="arrow-left" />
    <!-- <div id="dplayer"></div> -->

    <div class="video-logo">
      <img :src="baseAddRequestPrefix(homeStore?.homeConfig?.logoUrl)" alt="" />
    </div>
    <div class="container">
      <!-- <videoPlay
        ref="videoRef"
        width="100%"
        height="210px"
        color="#f58d27"
        title="冰河世纪"
        :src="options.src"
        :type="options.type"
        :auto-play="false"
        :muted="options.muted"
        :poster="options.poster"
        @play="onPlay"
        @onPause="onPause"
        @timeupdate="onTimeupdate"
      /> -->
      <video-player
        ref="videoRef"
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
  </div>
</template>
<script setup lang="ts">
import { baseAddRequestPrefix } from '@/utils/base'
import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import { AppConfig } from '@/utils/config'

import Hls from 'hls.js'
import DPlayer from 'dplayer'
import { useHomeStore } from '~@/store/home'

const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()
const emits = defineEmits(['isPossibleToPlay'])
const isFullscreen = ref<boolean>(false)

// 视频时长

const videoRef = ref<any>(null)
const duration = ref<number>()
const surplusTime = ref<number>(10)
const videoTime = ref<any>(null)
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

let videoUrl = props.currItem.isExternalLink === 1 ? props.currItem.url : AppConfig.videoUrl + '/' + props.currItem.url
// let videoUrl = "http://admin.wgykmq.icu/" + "uploads/video/1687143154957299.m3u8";

const options = reactive({
  width: '100%', //播放器宽度
  height: '210px', //播放器高度
  src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8', //视频源
  // src: "http://103.43.71.90/" + props.currItem.url, //视频源
  // src: videoUrl, //视频源
  type: 'm3u8', //视频类型
  muted: true, //静音
  logo: '',
  poster: baseAddRequestPrefix(props.currItem.primaryUrl)
})

// const dp = ref<any>();
// const initPlayer = () => {
//   dp.value = new DPlayer({
//     container: document.getElementById("dplayer"),
//     autoplay: false,
//     theme: "#0093ff",
//     loop: true,
//     lang: "zh-cn",
//     screenshot: true,
//     hotkey: true,
//     preload: "auto",
//     volume: 0.2,
//     mutex: true,
//     logo: homeStore?.homeConfig?.logoUrl,
//     video: {
//       url: "http://103.43.71.90/" + props.currItem.url,
//       // url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
//       // pic: props.currItem.primaryUrl,
//       type: "customHls",
//       customType: {
//         customHls: (video: any, player: any) => {
//           console.log("查看传递的参数", video, player);
//           const hls = new Hls();
//           hls.loadSource(video.src);
//           hls.attachMedia(video);
//         },
//       },
//     },
//   });
// };

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

const init = () => {}

onMounted(() => {
  init()
  // initPlayer();
})
</script>
<style lang="less">
.video-box {
  max-width: 14rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  .container > div {
    width: 100%;
    height: 210px;
  }
  .vjs-current-time {
    display: block;
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
  .video-logo {
    position: absolute;
    left: 50px;
    top: 13px;
    width: 30px;
    height: 30px;
    z-index: 2147483647;
  }
  #dplayer {
    height: 210px;
  }
}
</style>
