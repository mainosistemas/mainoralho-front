import Vue from 'vue'
export default class webSocketService {

  constructor(){
    this.config = {}
    this.socket = new WebSocket('ws://localhost:3000/cable');
  }

  initSocket(config){
    this.config = config
    this.socket.onopen = (event)=> {
      const msg = {
        command: 'subscribe',
        identifier: typeof config === 'object' ? JSON.stringify(config): {},
      };
      this.sendMessage(msg)
    };

    this.socket.onclose = function(event) {

    };

    this.socket.onmessage = (event) => {
      const response = event.data;
      const msg = JSON.parse(response);

      if ( ["ping"].includes(msg.type) ) {
        return;
      }
      console.log(msg)
      let elem = new Event("hello", {bubbles: true}); // (2)
      console.log(elem)
      elem.dispatchEvent(event);
      this.onmessage = msg

    };

    this.socket.onerror = function(error) {
      console.log('WebSocket Error: ' + error);
    };
  }

  sendMessage(msg){

    if( typeof msg === 'object' ){
      let option = {
        command:"message",
        data: JSON.stringify(msg),
        identifier:this.config
      }
      this.socket.send(JSON.stringify(option))
    }
  }

}

// const socket = new WebSocket("ws://localhost:3000/cable")
//         const containerMessage = document.getElementById("messages")
//         socket.onopen = function(event) {
//             console.log("websocket está conectado")
//             socket.send(JSON.stringify({
//                 command: "subscribe",
//                 identifier: JSON.stringify({"channel":"ChatChannel", "room": "sprint02"})
//             }))
//             //setTimeout(sendMsg, 1000)
//         }

//         function sendMsg() {
//             socket.send(JSON.stringify({
//                 command: "message",
//                 data: JSON.stringify({message:"msg php", action:"votar"}),
//                 identifier: JSON.stringify({"channel":"ChatChannel", "room": "sprint02"})
//             }))
//         }

//         socket.onmessage = function(event) {
//             const resposta = event.data
//             const data = JSON.parse(resposta)
//             console.log(data)
//             if (data.message && data.message.type == "vote") {
//                 console.log(data)
//                 containerMessage.append(data.message.message)
//             }
//         }
