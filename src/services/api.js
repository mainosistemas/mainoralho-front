import axios from 'axios'

import { User } from './datauser'

export const api = () => {

  return axios.create({
    //baseURL: "https://mainoralho.herokuapp.com/",
    baseURL: "http://localhost:3000/",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ... User ? {"Authorization": `Bearer ${User?.auth_token}`}:'',
    },
  })
}
