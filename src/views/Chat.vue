<template>
  <div>
  <h3>Teste</h3>
  <button type="button" @click="Send">Enviar</button>
  </div>

</template>

<script>
const socket = new WebSocket('ws://localhost:9000/cable');
export default {


  methods:{
    Send(){

      let params= new URLSearchParams({
        data_message: JSON.stringify({
          type:'vote',
          name: 'Alisson',
          id: 2,
        })
      })

      fetch('http://localhost:9000/chat?'+params)
    }
  },


  mounted(){

    let id= 23

    console.log(socket)

    socket.onopen = function(event) {
      console.log('WebSocket is connected.', event);
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          room:id,
          channel: 'ChatChannel',
          usuario: "Fulado"
        }),
      };
      socket.send(JSON.stringify(msg));
    };
    socket.onclose = function(event) {
      console.log('WebSocket is closed.');
    };

    socket.onmessage = function(event) {
      const response = event.data;
      const msg = JSON.parse(response);



      // Ignores pings.
      if (msg.type === "ping") {
          return;
      }

      console.log("FROM RAILS: ", msg, response);



    };

    // When an error occurs through the websocket connection, this code is run printing the error message.
    socket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };
  }
}
</script>

<style>

</style>
