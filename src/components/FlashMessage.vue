<template>
  <div v-if="msg" class="alert" :class="msg.class">
    <span v-html="msg.text"></span>
  </div>
</template>

<script>
export default {
  name:'FlashMessage',
  props:{
    msg:{
      type:Object,
      default:null
    }
  }
}
</script>
