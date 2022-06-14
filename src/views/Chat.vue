<template>
  <div>
    <h3>Teste</h3>
    <button type="button" @click="Send">Enviar</button>
  </div>

</template>

<script>
import webSocketService from '../services/webSocketService'
const socket = new webSocketService();
export default {


  methods:{
    Send(){

      let data_message = JSON.stringify({
        command:"mensage",
        data:JSON.stringify({message:'Alisson', action:'speak'}),
        identifier: JSON.stringify({
          room:23,
          channel: 'VoteChannel',
        }),
      })


    }
  },


  mounted(){
    let id = 23
    socket.initSocket({
      room:id,
      channel: 'VoteChannel'
    });


    socket.onmessage = function(event) {
      console.log(event)
    };

  }
}
</script>

<style>

</style>
