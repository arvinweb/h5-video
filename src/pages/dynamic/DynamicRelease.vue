<template>
  <div class="dynamic-release-box">
    <HeadNavigation :left-icon="'arrow-left'" :title="'动态发布'"></HeadNavigation>

    <main>
      <div class="textarea-box">
        <van-field v-model="message" type="textarea" maxlength="1000" autosize placeholder="分享你的想法" />
      </div>
      <p class="message-num">{{ message?.length }}/1000</p>
      <div class="uploader-box">
        <van-uploader
          v-model="fileList"
          :preview-size="baseSetRem(214, '')"
          :max-count="maxCount"
          :accept="acceptVal"
          :multiple="true"
          image-fit="cover"
          :after-read="afterFn"
          :result-type="resultType"
          @delete="uploaderDelete"
        >
          <template v-if="acceptVal === 'video/*' || acceptVal === 'audio/*'" #preview-cover="{}">
            <div class="preview-cover van-ellipsis">
              <img class="live-bg-img" :src="liveBgImg" alt="" />
            </div>
          </template>
          <div class="add-img">
            <img :src="addImg" alt="" />
          </div>
        </van-uploader>
      </div>

      <div class="form-box">
        <div class="switch-location">
          <van-icon size="14" color="#d9d9d9" name="location" />
          <span>来自火星</span>
          <van-switch v-model="checked" :size="baseSetRem(44, 'px')" active-color="#f94f92" inactive-color="#29313c" />
        </div>
        <div class="" @click="showRight = !showRight">
          <span>标签分类</span>
          <van-icon class="icon-arrow" size="14" color="#d9d9d9" name="arrow" />
        </div>
        <ul>
          <li v-for="item in tabsList" :key="item.id" class="select-tab">
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="btn-div">
        <van-button
          color="linear-gradient(to bottom, #ff5296 0%, #ff3283 44%, #ff096a 100%)"
          type="primary"
          :disabled="disabled"
          block
          @click="onBtn"
        >
          确认发布
        </van-button>
      </div>
    </main>
    <van-overlay :show="scheduleShow">
      <div class="schedule-box" @click.stop>
        <van-circle
          v-model:current-rate="currentRate"
          :rate="0"
          :speed="100"
          :color="gradientColor"
          size="100"
          layer-color="#5b5b5b"
          start-position="bottom"
          :text="scheduleText"
        />
      </div>
    </van-overlay>
    <van-popup v-model:show="showRight" position="right" :style="{ width: '100%', height: '100%' }">
      <SelectTab @set-active-list="setActiveList" @set-show-right="setShowRight"></SelectTab>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { setDynamicMessageApi } from '@/api/dynamic'
import { dynamicTag } from '@/interface/dynamic'
import axios from 'axios'
import { AppConfig } from '@/utils/config'
import { baseSetRem } from '@/utils/base'
import SelectTab from '@/pages/dynamic/components/SelectTab.vue'

import addImg from '@/assets/images/dynamic/add.png'
import liveBgImg from '@/assets/images/dynamic/live-bg.png'

const userStore = useUserStore()
const homeStore = useHomeStore()
const router = useRouter()

const scheduleText = computed(() => {
  return currentRate.value.toFixed(0) + '%'
})
const acceptVal = computed(() => {
  return router.currentRoute.value.query.type?.toString() || 'image/*'
})

const maxCount = computed(() => {
  const type = acceptVal.value
  if (type === 'image/*') {
    return 9
  }
  return 1
})

const disabled = computed(() => {
  return !(message.value.length > 0 && tabsList.value.length > 0)
})

const message = ref('')
const checked = ref(false)
const fileList = ref([])
const isUploading = ref(false)
const fileStatus = ref(false as any)
const resultType = ref<any>('dataUrl')
const show = ref(false)
// const disabled = ref(true)
const url = ref('')
const urlType = ref('')
const tabsList = ref<any>([])

const scheduleShow = ref<boolean>(false)
const showRight = ref<boolean>(false)
const fileResult = ref([] as any)
const currentRate = ref<any>(0)
const gradientColor = {
  '0%': '#ff47c1',
  '100%': '#ff3967'
}

const init = () => {
  message.value = ''
  checked.value = false
  isUploading.value = false
  fileStatus.value = false
  show.value = false
  fileList.value = []
  url.value = ''
  urlType.value = ''
  fileResult.value = []
  if (router.currentRoute.value.query.type?.toString() === 'video/*') {
    resultType.value = 'file'
  } else {
    resultType.value = 'dataUrl'
  }
  // router.currentRoute.value.query.type?.toString() || 'image/*'
}

const afterFn = (file: any) => {
  if (fileStatus.value) {
    showToast('请稍后')
    return false
  }

  //添加上传状态，避免用户在上传未完成时点击提交按钮
  isUploading.value = true
}

const onBtn = () => {
  if (fileStatus.value) {
    showToast('请上传完成后在发布')
    return
  }

  const labelidList: any[] = []
  if (tabsList.value?.length > 0) {
    tabsList.value.forEach((labelidItem: { id: any }) => {
      labelidList.push(labelidItem.id)
    })
  }
  setDynamicMessage()
}

//
const setDynamicMessage = () => {
  console.log(tabsList.value)
  let tagId = [] as any
  tabsList.value.forEach((item: dynamicTag) => {
    tagId.push(item.id)
  })
  const par = {
    content: message.value,
    tagId: tagId,
    title: 'title',
    imgUrl: 'http://101.43.70.172:8000/uploads/2023/06/16/168688498124486.gif'
  }
  setDynamicMessageApi(par.content, par.tagId, par.title, par.imgUrl).then(res => {
    console.log(res)
    if (res) {
    }
  })
}

const uploaderDelete = (item: any, detail: any) => {
  fileResult.value = fileResult.value.filter((ite: { imgId: any }) => ite.imgId !== detail.index)
  fileResult.value.forEach((ite: { imgId: any }, index: any) => {
    ite.imgId = index
  })
}
const setShowRight = () => {
  showRight.value = false
}
const setActiveList = (item: any) => {
  tabsList.value = item
}

onMounted(() => {
  init()
})
</script>

<style lang="less">
.dynamic-release-box {
  background: #0e1621;
  height: 100%;
  main {
    text-align: left;
    padding: 15px 0;
  }

  .textarea-box {
    padding: 0 20px;
    position: relative;

    textarea {
      width: 100%;
      padding: 2px 5px;
      background: #0e1621;
      resize: none;
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
      font-weight: 300;
    }
    .van-cell,
    .van-cell__value,
    .van-field__body {
      padding: 0 !important;
      background: #0e1621 !important;
    }
    textarea::-webkit-scrollbar {
      display: none;
    }
  }
  .uploader-box {
    padding-left: 20px;
    .set-box {
      & > div {
        margin-right: 15px;
      }
      img {
        width: 30px;
      }
    }
    .add-img {
      width: 107px;
      height: 107px;
      border-radius: 6px;
      border: solid 1px #182230;
      background-color: rgba(217, 217, 217, 0.03);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .van-uploader__input-wrapper {
      img {
        width: 30px;
      }
    }
    .margin-right-10 {
      margin-right: 15px;
    }
  }
  .message-num {
    padding: 0 20px;
    text-align: right;
    margin-bottom: 15px;
  }

  .form-box {
    padding: 20px 20px 0 20px;
    .switch-location {
      padding: 20px 0;
      border-top: 1px solid #29313c;
    }
    .van-cell {
      background: #0e1621;
      padding: 20px 0;
      * {
        color: #fff;
      }
    }
    button {
      color: rgba(255, 255, 255, 0.7) !important;
    }
    .van-switch {
      position: absolute;
      right: 0px;
    }
    span {
      font-size: 14px;
      margin-left: 6px;
      color: #fff;
    }
    & > div {
      border-bottom: 1px solid #29313c;
      position: relative;
      padding: 20px 0;
    }
  }
  .btn-div {
    padding: 20px;
    margin-top: 60px;
  }
  .preview-cover-img {
    width: 100%;
    height: 100%;
  }
  .icon-arrow {
    position: absolute;
    right: 0;
    top: 26px;
  }
  .van-button {
    background: linear-gradient(rgb(247, 76, 123) 0%, rgb(220, 104, 236) 100%);
    border-radius: 30px !important;
  }
  .van-button--disabled {
    background: #21273e !important;
    color: #fff !important;
  }
  .select-tab {
    min-width: 76px;
    height: 27px;
    margin: 5px;
    border-radius: 16px;
    border: solid 0.5px #ff086a;
    background-color: rgba(255, 8, 106, 0.1);
    display: inline-block;
    text-align: center;
    line-height: 27px;
    color: #ff086a;
  }
  ul {
    padding: 20px 0;
  }
  .preview-cover {
    video {
      width: 107px;
      height: 107px;
    }
  }
  .schedule-box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .van-circle__text {
      color: #fff;
    }
  }
  .live-bg-img {
    width: 107px;
    height: 107px;
  }
}
</style>
