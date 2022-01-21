<template>
  <div class="login">
    <div class="box-form shadow">
      <header>
        <span>maino</span>
        <span>ralho</span>
      </header>

      <div v-if="msg" class="alert" :class="msg.class">
        <span v-html="msg.text"></span>
      </div>
      <form class="form" @onsubmit="Salvar" autocomplete="off">
        <div class="form-group">
          <input type="email" v-model="user.email" v-on:focus="msg=null" class="form-control" :class="{'is-invalid':msg && msg.class=='alert-danger' && !user.email}" placeholder="Email" autocomplete="false" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="user.name" v-on:focus="msg=null" class="form-control" :class="{'is-invalid':msg && msg.class=='alert-danger' && !user.name}" placeholder="Nome" autocomplete="false" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="user.password" v-on:focus="msg=null" class="form-control" :class="{'is-invalid':msg && msg.class=='alert-danger' && !user.password}" placeholder="Senha" autocomplete="false" required>
        </div>
        <div class="btn-login">
          <button type="buttom" @click.prevent="Salvar" class="btn btn-block btn-mainor" >
            <div v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <template v-else>Registrar</template>
          </button>
        </div>
      </form>
      <footer>
        <p class="text-center">
          <router-link :to="{name:'login'}">Voltar para o Login</router-link>
        </p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data(){
    return{
      user:{
        email:null,
        password:null,
        name:null
      },
      loading:false,
      msg:null
    }
  },
  methods:{
    async Salvar(){

      if(!this.user.email || !this.user.password || !this.user.name){
        this.msg ={
          text:'Preencha os campos corretamente',
          class:'alert-danger'
        }
        return false;
      }

      this.loading = true
      let registration=this.user

      try {
        let response = await this.$api().post('registrations',{registration})

        this.msg ={
          text:'Operação realizada com sucesso',
          class:'alert-success'
        }

      } catch (error) {

        let err_data = error.response?.data?.data || null
        let text = err_data?.errors ? err_data.errors.join('<br />') :'Ocorreu uma erro ao realizar com operação'

        this.msg ={
          text,
          class:'alert-danger'
        }
      }
      this.loading = false
    }
  }
}
</script>
<style lang="scss">
@import '../assets/sass/variables';
  .login{
    height:100vh;
    display:flex;
    align-items:center;
    justify-content:center;
    background:#f7f7f7;
    .box-form{
      width:320px;
      background:#fff;
      padding:15px;
      border-radius:5px;
      >header{
        display:flex;
        align-items:center;
        justify-content:center;
        padding-bottom:15px;
        >span{
          display:inline-flex;
          font-size:2rem;
          text-transform:uppercase;
          &:nth-child(1){
            color:$maino_blue;
            font-weight:bold
          }
          &:nth-child(2){
            color:$maino_green;
            font-size:2rem;
            font-weight:300
          }
        }
      }
      >footer{
        padding: 15px 0 0;
        p{
          font-size: 14px;
        }
      }
      .btn-mainor{
        background:$maino_blue;
        color:#fff
      }
    }
  }
</style>
