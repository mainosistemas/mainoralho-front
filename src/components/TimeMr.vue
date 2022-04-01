<template>
  <span class="wrapper-timer">
    <span class="mr-1">
      <i class="fas fa-clock"></i>
    </span>
    <span v-text="String(result.hour).padStart(2, '0')"></span>
    <span>:</span>
    <span v-text="String(result.minute).padStart(2, '0')"></span>
    <span>:</span>
    <span v-text="String(result.second).padStart(2, '0')"></span>
  </span>
</template>

<script>
export default {
  name:"Name",
  props:{
    time:{
      type:Object,
      default:{}
    }
  },
  computed:{
    result(){
      return this.time || {second:0, minute:0, hour:0}
    }
  }
}
</script>

<style>
.wrapper-timer{
  width: 95px;
  display: inline-flex;
  justify-content: center;
  color:#666
}
</style>
