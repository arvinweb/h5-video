<template>
  <div class="video-item-box" @click="toPage">
    <div class="img-box">
      <template v-if="!homeStore.homeConfig?.isPure">
        <div v-if="videoItem.type === 0" class="tag tag-1">免费</div>
        <div v-if="videoItem.type === 1" class="tag tag-2">VIP</div>
        <div v-if="videoItem.type === 2" class="tag tag-3">{{ Number.parseInt(videoItem.goldCoin) }}</div>
      </template>
      <van-image :src="baseAddRequestPrefix(primaryUrl)" fit="cover">
        <template #loading>
          <div class="default-bg-img-box">加载中...</div>
        </template>
      </van-image>
      <p>
        <van-icon size="18" name="play-circle-o" /> <span> {{ videoItem.browseCount || 0 }}</span>
        <span class="reght">{{ videoTimeInit(videoItem) }}</span>
      </p>
    </div>
    <p class="bottom-title">{{ videoItem.name || '标题' }}</p>
  </div>
</template>

<script setup lang="ts">
// import { setBuyVideo, geWhetherToBuy } from "@/api/manager";
import dayjs from 'dayjs'
import { useHomeStore } from '~@/store/home'
import { baseAddRequestPrefix, baseFormatSeconds } from '@/utils/base'
const homeStore = useHomeStore()
const userStore = useUserStore()
const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  videoItem: {
    type: Object,
    default: 0
  }
})
const primaryUrl = computed(() => {
  return baseAddRequestPrefix(props.videoItem.primaryUrl)
})
const router = useRouter()
const active = ref(0)
const setBuyVideoApi = (id: any) => {}
const videoTimeInit = (item: any) => {
  if (item.isExternalLink === 0) {
    return baseFormatSeconds(item.videoTime)
  } else {
    return item.videoTime
  }
}

const toPage = () => {
  router.push({
    path: '/videoDetails',
    query: {
      id: props.videoItem.id
    }
  })
}
</script>
<style lang="less">
.video-item-box {
  border-radius: 5px;
  overflow: hidden;

  width: 100%;

  .tag {
    // background: @color2;
    width: 30px;
    height: 16px;
    position: absolute;
    text-align: center;
    line-height: 16px;
    top: 0;
    right: 0;
    font-weight: 300;
    font-size: 10px;
    color: #fff;
    z-index: 1;
    border-radius: 0 0 0 5px;
  }
  .tag-1 {
    background: #30c696;
  }
  .tag-2 {
    background: #e5c393;
    color: #845e36;
    font-weight: 600;
  }
  .img-box {
    position: relative;
    height: 98px;

    p {
      position: absolute;
      bottom: 5px;
      font-size: 12px;
      color: #fff;
      padding: 0 10px;
      height: 24px;
      width: 100%;
      text-align: left;
      display: flex;
      justify-content: left;
      align-items: center;
    }
    span {
      margin-left: 3px;
    }
    .reght {
      position: absolute;
      right: 10px;
    }
    .van-image {
      height: 100%;
      width: 100%;
    }
    i {
      position: relative;
      top: -1px;
    }
  }
  .bottom-title {
    font-size: 14px;
    font-weight: 500;
    // color: @color3;
    // line-height: 16px;
    margin: 5px 0;
    padding: 0 5px;
    overflow: hidden;
    // min-height: 32px;
    text-overflow: ellipsis;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 2;
  }
}
</style>
