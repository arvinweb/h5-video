<template>
  <div class="dynamic-img-box">
    <div v-for="(item, index) in 3" :key="item">
      <van-image
        :src="'http://101.43.70.172:8000/uploads/2023/06/16/168688498124486.gif'"
        :width="baseSetRem(210, '')"
        :height="baseSetRem(210, '')"
        fit="cover"
        @click="checkImg(index)"
      >
        <template #loading>
          <div class="icon-bg-img-box">
            <img :src="iconBgImg" alt="" />
          </div>
        </template>
      </van-image>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showImagePreview } from 'vant'
import { baseSetRem } from '@/utils/base'
import iconBgImg from '@/assets/images/dynamic/icon-bg.png'
const props = defineProps({
  imgList: {
    type: Array || Object,
    default: () => []
  }
})

const checkImg = (startPosition: number | undefined) => {
  const arr = props.imgList as any
  const ImagePreviewOptions = {
    images: arr,
    startPosition: startPosition,
    showIndex: false
  }

  showImagePreview(ImagePreviewOptions)
}

const imgLists = computed(() => {
  const arr: any[] = []
  props.imgList.forEach((item, index) => {
    const obj = {
      src: item,
      id: index
    }
    arr.push(obj)
  })
  return arr
})
</script>

<style scoped lang="less">
.dynamic-img-box {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px 10px;
  img {
    width: 100%;
    height: 100%;
  }
  & > div {
    width: 105px;
    height: 105px;
  }
  .icon-bg-img-box {
    padding: 13px;
    width: 105px;
    height: 105px;
    box-sizing: border-box;
    background-color: #131c28;
    img {
      width: 78px;
      height: 78px;
    }
  }
}
</style>
