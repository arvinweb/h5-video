<template>
  <div class="dynamic-skeleton">
    <van-row>
      <van-col span="3">
        <div class="header-left"></div>
      </van-col>
      <van-col span="21">
        <div class="header-right-1"></div>
        <div class="header-right-2"></div>
      </van-col>
    </van-row>
    <div class="skeleton-1"></div>
    <main>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less">
.dynamic-skeleton {
  // background-color: rgba(31, 30, 34, 0.7);
  padding: 20px;
  padding-bottom: 68px;
  .header-left {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #131c28;
  }
  .header-right-1 {
    width: 55px;
    height: 17px;
    flex-grow: 0;
    margin: 3px 7px 2px 8px;
    padding: 0 5px 0 0;
    background-color: #131c28;
  }
  .header-right-2 {
    width: 99px;
    height: 17px;
    flex-grow: 0;
    margin: 3px 7px 2px 8px;
    padding: 0 5px 0 0;
    background-color: #131c28;
  }
  .skeleton-1 {
    width: 308px;
    height: 17px;
    flex-grow: 0;
    margin: 20px 0px 10px 0px;
    background-color: #131c28;
  }
  .skeleton-2 {
    width: 39px;
    height: 17px;
    flex-grow: 0;
    margin: 3px 9px 0 0;
    background-color: #131c28;
  }
  main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px 10px;
    div {
      width: 105px;
      height: 105px;

      background-color: #131c28;
    }
  }
}
</style>
