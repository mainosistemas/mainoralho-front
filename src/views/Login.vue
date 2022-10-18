<template>
  <div class="login">
    <div class="box-form shadow">
      <header>
        <span>mainô</span>
        <span>ralho</span>
      </header>
      <div v-if="msg" class="alert" :class="msg.class">
        <span v-html="msg.text"></span>
      </div>
      <form class="form" @onsubmit="Logar">
        <div class="form-group">
          <input type="text" v-model="user.email" class="form-control" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="user.password" class="form-control" placeholder="Senha" required>
        </div>
        <div class="btn-login">
          <button type="buttom" @click.prevent="Logar" class="btn btn-block btn-mainor" >
            <div v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <template v-else>login</template>
          </button>
        </div>
      </form>
      <footer>
        <div class="text-center mb-4 mt-0">
          <router-link class="forgot-password" :to="{name:'forgotPassword'}">esqueceu sua senha?</router-link>
        </div>
        <p>Voce não tem conta?
          <router-link :to="{name:'register'}">crie uma conta</router-link>
        </p>
      </footer>
    </div>
  </div>
</template>
<script>
import { setUser } from '../services/datauser'
export default {
  name: "login",
  data(){
    return{
      user:{
        email:null,
        password:null
      },
      loading:false,
      msg:null
    }
  },
  methods:{
    async Logar(){
      this.loading = true
      this.msg=null
      try {
        let response = await this.$api().post('auth_user',this.user)
        let json = response.data
        json.data.user
        await setUser(json.data.user)
        this.$router.push({path:'/'})
      } catch (error) {
        console.log(error)
        let err_data = error?.data?.data || null
        let text = err_data?.errors ? err_data.errors.join('<br />') :'Ocorreu uma erro ao realizar com operação'
        this.msg={
          text,
          class:'alert-danger'
        }
      }
      this.loading = false
    }
  },
  mounted(){
    if(this.$state.msg.text){
      this.msg = {...this.$state.msg}
      this.$state.msg = {}
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
        .forgot-password{
          color: #999999;
          font-size: 0.9rem;
        }
      }
      .btn-mainor{
        background:$maino_blue;
        color:#fff
      }
    }
  }
</style>
