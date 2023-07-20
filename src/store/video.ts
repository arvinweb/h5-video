import { bannerFace } from '@/interface/video'
import { videoItemFace } from '@/interface/videoItem'
let isSllowPlayFlag = -1 as any // 处理节流
export const useVideoStore = defineStore(
  'videoStore',
  () => {
    // 轮播数据
    const swiperCom = ref<any>()

    // 设置轮播数据
    const setSwiperCom = (res: Array<bannerFace>): void => {
      swiperCom.value = res
    }

    return {
      swiperCom,
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
