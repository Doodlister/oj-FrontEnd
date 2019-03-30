<template>
  <div class="loginAndRegister">
    <Modal v-model="isShow"
           @on-ok="ok"
           @on-cancel="cancel">
      <p slot="header"
         style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>Delete confirmation</span>
      </p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'LoginAndRegister',
  props: {
    isShow: 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
