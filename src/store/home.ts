import { bannerFace, webSiteFace } from '@/interface/responseApi'
import { videoItemFace } from '@/interface/videoItem'
let isSllowPlayFlag = -1 as any // 处理节流
export const useHomeStore = defineStore(
  'homeStore',
  () => {
    // 轮播数据
    const swiperCom = ref<any>()

    // 系统公告
    const messageList = ref<any>()

    // 系统配置
    const homeConfig = ref<any>()

    // 评论弹窗是否显示
    const showCommentBottom = ref<boolean>(false)

    // 底部tabbar显示
    const showTabbar = ref<boolean>(true)

    // 首页视频显示
    const homeVideoItem = ref<videoItemFace>({
      isShow: false, // 是否显示播放器
      height: document.body.offsetHeight - 100, // 播放器高度
      src: '', // 播放器地址
      poster: '', // 播放器封面
      activeIndex: 0, // 当前视频索引
      isFirstClick: true, // 是否需要手动点击才能持续自动播放（主要和ios浏览器做分开）
      videoPaly: null, // 播放器播放和暂停状态
      isSllowPlay: null // 是否是点击空白处播放暂停
    })

    // 改变视频透明度
    const setHomeVideoItemIsShow = (res: boolean): void => {
      homeVideoItem.value.height = document.body.offsetHeight - 100
      homeVideoItem.value.isShow = res
      homeVideoItem.value.videoPaly = res
    }

    // 改变视频播放和暂停
    const setVideoPaly = (res: boolean): void => {
      homeVideoItem.value.videoPaly = res
    }

    // 修改当前视频数据
    const setHomeVideoItem = (res: videoItemFace): void => {
      res.height = document.body.offsetHeight - 100
      homeVideoItem.value = res
    }

    // 修改当是否点击空白处状态
    const setIsSllowPlay = (res: boolean): void => {
      homeVideoItem.value.isSllowPlay = res
      isSllowPlayFlag = null
      isSllowPlayFlag = setTimeout(() => {
        homeVideoItem.value.isSllowPlay = false
      }, 500)
    }

    // 设置轮播数据
    const setSwiperCom = (res: Array<bannerFace>): void => {
      swiperCom.value = res
    }

    // 添加系统配置数据
    const setHomeConfig = (res: webSiteFace): void => {
      homeConfig.value = res
    }

    // 添加系统公告数据
    const setMessageList = (res: any): void => {
      messageList.value = res
    }
    // 修改评论弹窗显示
    const setShowCommentBottom = (res: boolean): void => {
      showCommentBottom.value = res
    }
    // 修改评论弹窗显示
    const setShoTabbar = (res: boolean): void => {
      showTabbar.value = res
    }

    return {
      swiperCom,
      homeConfig,
      messageList,
      homeVideoItem,
      showCommentBottom,
      showTabbar,
      setShoTabbar,
      setShowCommentBottom,
      setVideoPaly,
      setIsSllowPlay,
      setHomeVideoItemIsShow,
      setHomeVideoItem,
      setMessageList,
      setHomeConfig,
      setSwiperCom
    }
  },
  {
    persist: {
      enabled: true,
      strategies: [{ storage: sessionStorage, paths: ['homeConfig'] }]
    }
  }
)
