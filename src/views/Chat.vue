<template>
  <div>
    <h3>Teste</h3>
    <button type="button" @click="Send">Enviar</button>
    <button type="button" @click="Votar">Votar</button>
    <button type="button" @click="Desconectar">Sair</button>
    <ul>
      <li v-for="user in users" :key="user.ud">{{user.name}}</li>
    </ul>
  </div>

</template>

<script>
//import webSocketService from '../services/webSocketService'
//const socket = new webSocketService();
//const socket = new WebSocket('ws://localhost:3000/cable');
export default {
  data(){
    return{
      user:null,
      users:[]
    }
  },

  methods:{

    criarTask(){
      this.$api().post('tasks/', {
        "task": {
          "name": "Fazer deploy",
          "description": "teste do teste do teste",
          "sprint_id": 1,
          "status_votation": "finished"
        }
      })
    },

    Desconectar(){
      let { id } = this.$route.query || 23
      console.log(this.$cable)
      this.$cable.unsubscribe({
        channel:"VoteChannel",
        room:id,
        user:{ ...this.user }
      });
      // this.$cable.perform({
      //   channel:'VoteChannel',
      //   action: "unsubscribe",
      //   room:id,
      //   user: { email:this.user?.email}
      // })
    },

    Votar(){
      this.$api().post('tasks/1/user_votes', {
        "vote": {
          "score": 3,
          "voted_moment_time": "2022-02-23T18:25:43.511Z"
        }
      })
    },

    Send(){
      console.log("Enviar")
      this.$cable.perform({
        channel: "VoteChannel",
        action: "votar",
        data: {
          content: "Olá mundo cruel",
        },
      });

    }
  },

  channels:{
    VoteChannel: {
      connected(data) {
        console.log("Conectado", data)
      },
      rejected() {
        console.log("Reject")
      },
      received(data) {
        console.log(data)
        if(data && data.type =='conectado'){
          const {message:user} = data
          if(!this.users.some(u=>u.email === user.email)){

            this.users = [...this.users, ...[user]]
          }
        }
        if(data && data.type =='desconectado'){
          console.log(data.type)
          const {message:user} = data
          let users = this.users.filter(u=>u.email !== user.email)
          this.users = users
        }
      },
      disconnected(data) {
        console.log("Desconectou", data)
      },
    },
  },
  mounted(){
    let { id } = this.$route.query || 23
    const user = JSON.parse(window.localStorage.getItem('~token'))
    this.user = user
    this.$cable.subscribe({
      channel:'VoteChannel',
      room:id,
      user: { email:user?.email}
    })


    this.$cable.unsubscribe({
      channel:"VoteChannel",
      room:id,
      user:{ ...this.user }
    });
  }
}
</script>
