<template>
  <div ref="modalref" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <div class="text-center" style="width:100%">
                    <h5 class="modal-title ">Criar nova sala</h5>
                </div>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="">Nome da sala</label>
                    <input type="text" class="form-control" v-model="room_name">
                </div>
                <div class="action-modal d-flex justify-content-between">
                    <button type="button" class="btn btn-secondary" @click="CloseModal">Cancelar</button>
                    <button type="button" class="btn btn-primary" @click="Salvar">Salvar</button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>

import Modal from 'bootstrap/js/dist/modal'

let instanceModal=null;

export default {
    name:"ModalCreateRoom",
    data(){
        return{
            room_name:null
        }
    },
    props:{
        isOpen:{
            type:Boolean,
            default:false
        }
    },

    methods:{
        OpenModal(){
            if(this.$refs["modalref"]){
                instanceModal = new Modal(this.$refs["modalref"]);
                instanceModal.show()
                /**
                 * Evento para qnd o modal fechar
                 */
                this.$refs["modalref"].addEventListener('hidden.bs.modal', ()=>{
                    
                });
            }
        },
        CloseModal(){
            if(this.$refs["modalref"] && instanceModal){
                instanceModal.hide()
                this.$emit('close', true)
            }
        },
        Salvar(){
            
        }
    },
    watch:{
        isOpen(){
            let bodyel= document.querySelector('body')
            if(this.isOpen && !bodyel.classList.contains('modal-open')){
                this.OpenModal();
            }
        }
    },
    mounted(){
        
    }
}
</script>

<style>

</style>