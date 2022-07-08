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
      let _event = new Event("hello", {bubbles: true}); // (2)
      elem.dispatchEvent(_event);
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
