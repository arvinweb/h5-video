<template>
  <div class="profile-box">
    <div>
      <van-image
        :src="'http://101.43.70.172:8000/uploads/2023/06/14/1686740823128165.jpeg'"
        round
        width="40"
        height="40"
        @click="onHeaderImg"
      >
        <template #loading>
          <img :src="deleteImg" alt="" />
        </template>
      </van-image>
    </div>
    <div class="content">
      <div class="content-1">
        <h5>user_nicename</h5>
        <img :src="boyImg" alt="" />
        <img :src="girlImg" alt="" />
      </div>

      <div>
        <span>datetime</span>
        <van-icon color="#d9d9d9" name="location" />
        <span>city</span>
      </div>
    </div>
    <div class="focus-on">
      <FocusOn :curr-item="0" @click="onFocus"></FocusOn>
    </div>
    <!-- <div class="delete-box" @click="onDelete(currItem)">
      <img :src="deleteImg" alt="" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import FocusOn from '@/pages/dynamic/components/FocusOn.vue'

import boyImg from '@/assets/images/dynamic/boy.png'
import girlImg from '@/assets/images/dynamic/girl.png'
import deleteImg from '@/assets/images/dynamic/delete.png'

const dynamicStore = useDynamicStore()
const homeStore = useHomeStore()
const userStore = useUserStore()

const emits = defineEmits(['deleteDynamic'])
const props = defineProps({
  currItem: {
    type: Object,
    required: true,
    default: () => {}
  },
  deleteShow: {
    type: Boolean,
    default: false
  }
})

const route = useRouter()
const router = useRouter()

const isFocusOnShow = computed(() => {
  const userInfo = userStore.userInfo as any
  let result = false
  if (userInfo && userInfo?.token) {
  } else {
    result = true
  }
  return result
})
const onFocus = () => {
  if (!userStore.userInfo?.token) {
    showToast('请注册/登陆正式账户')
    // homeStore.updateLoginPopup(true)
    return
  }

  const params = {
    service: 'User.SetAttent',
    uid: userStore.userInfo.id,
    touid: props.currItem.uid
  }
}

const goToPage = (url: string) => {
  if (props.currItem.uid === userStore.userInfo?.id) {
    router.push({
      path: '/mine'
    })
  } else {
    router.push({
      path: url,
      query: {
        title: props.currItem.userinfo.user_nicename,
        uid: props.currItem.uid
      }
    })
  }
}
const onDelete = (item: any) => {
  emits('deleteDynamic', item)
}
const onHeaderImg = () => {
  if (!userStore.userInfo?.token) {
    showToast('请注册/登陆正式账户')
    return
  }
  goToPage('/otherMine')
}
</script>

<style scoped lang="less">
.profile-box {
  padding: 20px 0;
  text-align: left;
  display: flex;
  align-items: center;
  position: relative;
  & > div {
    display: inline-block;
    height: 40px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 55%;
  }
  .content {
    margin-left: 8px;
  }
  .content-1 {
    display: flex;
    align-items: center;
    img {
      width: 17px;
      height: 17px;
      margin-left: 4px;
      border-radius: 0;
    }
  }
  h5 {
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    line-height: 20px;
  }
  span {
    color: rgba(255, 255, 255, 0.7);
    margin-right: 4px;
  }
  .focus-on {
    position: absolute;
    right: 0px;
  }
  .delete-box {
    position: absolute;
    right: 0px;
    top: 20px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
