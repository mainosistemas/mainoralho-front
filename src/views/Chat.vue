<template>
  <div>
    <h3>Teste</h3>
    <button type="button" @click="Send">Enviar</button>
    <button type="button" @click="Votar">Votar</button>
    <ul>
      <li v-for="u in users">{{u.name}}</li>
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
      },
      disconnected() {},
    },
  },
  mounted(){
    let { id } = this.$route.query || 23
    const user = JSON.parse(window.localStorage.getItem('~token'))
    this.$cable.subscribe({
      channel:'VoteChannel',
      room:id,
      user: { email:user?.email}
    })

    //this.criarTask()
    // console.log(user)
    // const config={
    //   room:id,
    //   channel: 'VoteChannel',
    //   user: {'name': user?.name, email:user?.email }
    // }

    // socket.onopen = (event)=> {
    //   const msg = {
    //     command: 'subscribe',
    //     identifier: typeof config === 'object' ? JSON.stringify(config): {},
    //   };

    //   //this.sendMessage(msg)
    //   socket.send(JSON.stringify(msg))
    // };

    // socket.onclose = function(event) {

    // };

    // socket.onmessage = (event) => {
    //   const response = event.data;
    //   const msg = JSON.parse(response);

    //   if ( ["ping"].includes(msg.type) ) {
    //     return;
    //   }
    //   // if(msg.identifier){
    //   //   let dataMsg = JSON.parse(msg.identifier)
    //   //   console.log(dataMsg, msg.type)
    //   // }
    //    console.log(msg.type)
    //    if(msg.identifier && msg.type === "confirm_subscription"){
    //     let dataMsg = JSON.parse(msg.identifier)
    //     console.log(dataMsg)
    //     const msg2 = {
    //         command: 'message',
    //         identifier: JSON.stringify({channel: 'VoteChannel'}),
    //         data: JSON.stringify({message:"msg php", action:"votar"}),
    //       }

    //       socket.send(JSON.stringify(msg2));

    //   }


    // };

    // socket.onerror = function(error) {
    //   console.log('WebSocket Error: ' + error);
    // };

    // socket.initSocket({
    //   room:id,
    //   channel: 'VoteChannel'
    // });


    // socket.onmessage = function(event) {
    //   console.log(event)
    // };

  }
}
</script>

<style>

</style>
