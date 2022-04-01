<template>
  <div class="login">
    <div class="box-form shadow">
      <header>
        <span>Recuperar senha</span>
      </header>
      <div v-if="message" class="alert" :class="message.class">
        <span v-html="message.text"></span>
      </div>
      <section>
        <p>
          Insira o email cadastrado para disponibilizarmos um link de alteração de senha, caso ainda não tenha cadastro tente 
          <router-link :to="{name: 'register'}">Cadastrar-se</router-link>
        </p>
      </section>
      <form class="form" @onsubmit="passwordRecovery">
        <div class="form-group">
          <input type="text" v-model="user.email" class="form-control" placeholder="Email" required>
        </div>
        <div class="btn-login">
          <button type="buttom" @click.prevent="passwordRecovery" class="btn btn-block btn-mainor" >
            <div v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <template v-else> Enviar </template>
          </button>
        </div>
      </form>
      <footer>
        <div>
          <router-link :to="{name: 'login'}"> Voltar </router-link>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>

export default {
  name: "forgotPassword",
  data() {
    return {
      user: {
        email:null,
      },
      loading: false,
      message: null,  
    }
  },

  methods: {
    async passwordRecovery() {
      this.message = null
      this.loading = true

      try {
        let response = await $api().post('/forgot', this.user)
        console.log(response)
      } catch (error) {
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
  @import '../assets/sass/variables';
</style>
