import axios from 'axios'
import { User } from './datauser'

function interceptors(){

  const config=(c)=>{
    return c
  }
  const erro=(err)=>{

    const message='Token inválido ou expirado';
    if(err.response && err.response.data.data.errors && message.match(err.response.data.data.errors.join())){
      window.localStorage.removeItem('~token')
      window.postMessage('login-expirado', err.response.data.data)
    }
    return Promise.reject(err.response)
  }

  return {config, erro}
}

const {config, erro} = interceptors()

export const api = () => {
  const _User = User()

  let instance_axios = axios.create({
    baseURL: url_api,
    //baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ... _User ? {"Authorization": `Bearer ${_User?.auth_token}`}:'',
    },
  })
  instance_axios.interceptors.response.use(config, erro);

  return instance_axios
}
