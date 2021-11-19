<template>
  <div class="login">
    <div class="box-form shadow">
      <header>
        <span>maino</span>
        <span>ralho</span>
      </header>
      <form class="form" @onsubmit="Logar">
        <div class="form-group">
          <input type="text" v-model="user.email" class="form-control" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="password" v-model="user.password" class="form-control" placeholder="Senha" required>
        </div>
        <div class="btn-login">
          <button type="buttom" @click.prevent="Logar" class="btn btn-block btn-mainor" >login</button>
        </div>
      </form>
      <p>Voce nao tem conta? <a href="#">crie uma conta</a></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data(){
    return{
      user:{
        email:null,
        password:null
      },
      msg:null
    }
  },
  methods:{
    Logar(){
      setTimeout(()=>{
        window.localStorage.setItem('~token', '12345645979');
        this.$router.push({
          path:'/'
        })
      }, 1000)
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
              font-weight:100
            }
          }
        }
        .btn-mainor{
          background:$maino_blue;
          color:#fff
        }
      }
    }
</style>