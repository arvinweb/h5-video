<template>
  <div class="head-navigation-box">
    <van-sticky>
      <van-nav-bar
        :title="title"
        :right-text="rightText"
        @click-right="onClickRight"
      >
        <template v-if="leftIcon" #left>
          <van-icon :name="leftIcon" @click="onBack" />
        </template>
        <template v-if="rightImg" #right>
          <img :src="rightImg" alt="" />
          <span>缺人</span>
        </template>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script setup lang="ts">
const pores = defineProps({
  title: {
    type: String,
    required: true,
    default: () => ''
  },
  rightImg: {
    type: String,
    default: () => ''
  },
  leftIcon: {
    type: String,
    default: () => ''
  },
  rightText: {
    type: String,
    default: () => ''
  }
})
const emits = defineEmits(['fatherClickRight'])
const router = useRouter()
const onBack = () => {
  if (pores.leftIcon === 'arrow-left') {
    router.back()
  }
}
const onClickRight = () => {
  emits('fatherClickRight')
}
</script>

<style lang="less"></style>
