<template>
  <div ref="modalref" class="modal fade">
      <div class="modal-dialog">
        <div class="modal-content">
            <slot name="content"></slot>
        </div>
      </div>
  </div>
</template>

<script>

import Modal from 'bootstrap/js/dist/modal'

let instanceModal=null;

export default {
    name:"Modal",
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
            instanceModal = new Modal(this.$refs["modalref"], {
              backdrop: 'static',
              keyboard: false
            });
            instanceModal.show()
            // instanceModal._backdrop = 'static'

            /**
             * Evento para qnd o modal fechar
             */
            $(this.$refs["modalref"]).on('hidden.bs.modal', ()=>{
              this.$emit('complete-close', true)
            });
          }
        },
        CloseModal(){
            if(this.$refs["modalref"] && instanceModal){
                instanceModal.hide()
                this.$emit('close', true)
            }
        }
    },
    watch:{
      isOpen(){
        let bodyel= document.querySelector('body')
        if(this.isOpen && !bodyel.classList.contains('modal-open')){
            this.OpenModal();
        }
        if(!this.isOpen && bodyel.classList.contains('modal-open')){
            this.CloseModal();
        }
      }
    },
    mounted(){

    }
}
</script>

<style>

</style>
