<template>
  <div class="dynamic-details">
    <HeadNavigation left-icon="arrow-left" :title="'帖子详情'"></HeadNavigation>
    <template>
      <DynamicMain :curr-item="{}"></DynamicMain>
      <main>
        <div class="title">全部评论 <span>（60）</span></div>
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="getComments"
        >
          <Comment
            v-for="(item, index) in 10"
            :key="item"
            :curr-item="{}"
            :index="index"
            :is-video="false"
            @closePopup="onClosePopup"
          ></Comment>
        </van-list>
      </main>
      <div v-if="userStore?.userInfo && userStore?.userInfo.token" class="set-message">
        <van-row>
          <van-col span="1"> </van-col>
          <van-col span="20">
            <van-cell-group inset>
              <van-field v-model="message" rows="1" autosize type="textarea" placeholder="新增评论..." />
            </van-cell-group>
          </van-col>
          <van-col span="3">
            <div class="div-right" @click="onSetComment">发布</div>
          </van-col>
        </van-row>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import DynamicMain from '@/pages/dynamic/components/DynamicMain.vue'
import Comment from '@/pages/dynamic/components/Comment.vue'

const dynamicStore = useDynamicStore()
const userStore = useUserStore()
const homeStore = useHomeStore()
const route = useRouter()
const router = useRouter()
// 动态详情
const dynamicItem = computed(() => {
  return ''
})
const isMessage = computed(() => {
  return userStore.userInfo.vip.is_message === '0' || userStore.userInfo.vip.is_message === 0
})
const loading = ref(false)
const message = ref('')
const finished = ref(false)
// 请求页码
const pageIndex = ref<number>(2)
const getDynamicItem = () => {
  const params = {
    service: 'Dynamic.getComments',
    dynamicid: route.currentRoute.value.query.id
  }
}
const getComments = () => {
  const params = {
    service: 'Dynamic.getComments',
    dynamicid: route.currentRoute.value.query.id,
    p: pageIndex.value
  }
}
const onSetComment = () => {
  if (isMessage.value) {
    return
  }
  if (!message.value) {
    showToast('请输入评论信息')
    return
  }
  const params = {
    service: 'Dynamic.setComment',
    uid: userStore.userInfo.id,
    token: userStore.userInfo.token,
    dynamicid: route.currentRoute.value.query.id,
    content: message.value,
    type: 0,
    length: '',
    voice: ''
  }
}

const onClosePopup = (index: number) => {
  // dynamicItem.value.commentlist.splice(index, 1)
}

const goTop = () => {
  document.body.scrollTop = document.documentElement.scrollTop = 0
}
const init = () => {
  pageIndex.value = 2
  // communityStore.updateDynamicDetails(null)
  getDynamicItem()
}
const changeDialog = () => {}
const onConfirm = () => {
  router.push('/buyVIPs')
}
onMounted(() => {
  init()
})
</script>

<style lang="less">
.dynamic-details {
  background-color: #0e1621;
  padding-bottom: 60px;
  main {
    padding: 10px 20px;
    text-align: left;
    border-top: 4px solid #161f2c;
    // background-color: rgba(31, 30, 34, 0.7);
    margin-top: 10px;
    .title {
      font-size: 16px;
      color: #e1e1e1;
      font-weight: 600;
      margin-bottom: 20px;
      span {
        color: #6f7a89;
        font-size: 12px;
      }
    }
  }
  .set-message {
    background-color: #000b19;
    position: fixed;
    bottom: 0px;
    width: 100%;
    padding: 20px 0;
    left: 0;

    // & > div {
    //   display: inline-block;
    //   width: 70%;
    // }
    .div-left,
    .div-right {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      background-color: #000b19 !important;
      span {
        margin-left: 5px;
      }
    }
    .van-cell,
    .van-cell__value,
    .van-field__body {
      padding: 0 !important;
      background-color: #000b19 !important;
      border-radius: 60px;
      overflow: hidden;
    }
    textarea {
      background-color: #000b19;
      max-height: 70px;
      padding: 5px 10px;
      color: rgba(255, 255, 255, 0.7);
      border-radius: 60px;
      border: solid 0.5px rgba(255, 255, 255, 0.21);
      overflow: hidden;
      font-size: 12;
    }
    textarea::-webkit-scrollbar {
      display: none;
    }
    .van-cell-group--inset {
      margin: 0 !important;
      background-color: #000b19 !important;
    }
    .div-right {
      color: #fff;
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
