<template>
  <div class="focus-on-icon" :class="{ 'focus-on-icon-1': isFocus != 0 }">
    {{ isFocus != 0 ? text1 : text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  fatherObj: {
    type: Object,
    default: () => {}
  },
  currItem: {
    type: [String, Number],
    default: () => ''
  }
})
const isFocus = computed(() => {
  return props.currItem as any
})

const text = ref('关注')
const text1 = ref('关注中')
</script>

<style scoped lang="less">
.focus-on-icon {
  box-sizing: border-box;
  width: 61px;
  height: 25px;
  line-height: 25px;
  border-radius: 15px;
  background-color: #ff096a;
  color: #fff;
  position: absolute;
  text-align: center;
  top: 20px;
  right: 0px;
  font-size: 12px;
  letter-spacing: -0.24px;
}
.focus-on-icon-1 {
  background-color: #283241;
  border: 0;
}
</style>
