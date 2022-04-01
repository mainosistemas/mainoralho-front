<template>
  <div class="login">
    <div class="box-form shadow">
      <header>
        <span>Nova senha</span>
      </header>
      <div v-if="message" class="alert" :class="message.class">
        <span v-html="message.text"></span>
      </div>
      <form class="form" @onsubmit="passwordReset">
        <div class="form-group">
          <input type="text" v-model="user.password" class="form-control" placeholder="Senha" required>
        </div>
        <div class="btn-login">
          <button type="buttom" @click.prevent="passwordReset" class="btn btn-block btn-mainor" >
            <div v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <template v-else> Resetar senha </template>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "resetPassword",
  data() {
    return {
      user: {
        password:null,
      },
      loading: false,
      message: null,  
    }
  },

  methods: {
    async passwordReset() {
      this.message = null
      this.loading = true

      try {
        let response = await $api().post('/reset', this.user)
        console.log(response)
      } catch (error) {
        console.log(error)
        this.message = {
          text: "Ocorreu uma erro ao realizar a operação",
          class: "alert-danger",
        }
      }
      this.loading = false
    },
  }
}
</script>

<style lang="scss">
</style>
