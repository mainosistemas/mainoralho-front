import {api} from '@/services/api'
import Vue from 'vue'

const Commons={
  install(Vue, options){
    Vue.prototype.$api = api

    Vue.prototype.$erros=(error, msg='Ocorreu uma erro ao realizar com operação')=>{
      let err_data = error.response?.data?.data || null
      let text = err_data?.errors ? err_data.errors.join('<br />') :msg
      return text
    }
  }
}

Vue.use(Commons)

