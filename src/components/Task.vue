<template>
  <div class="wrapper-create-task">
    <header>
      <span>Tarefas</span>
      <span class="action-task">
        <a href="#" @click.prevent="modal_open=true">Nova <i class="fas fa-plus"></i></a>
      </span>
    </header>
    <section class="list-tasks">
      <ul class="list-group list-items-task">
        <li v-for="task in tasks" :key="task.id" class="list-group-item justify-content-between">
          <span>{{task.name}}</span>
          <span class="btn-tasks">
            <time-mr v-if="is_play !=0 && is_play==task.id" :time.sync="time"></time-mr>
            <button
              @click="ActionPlay(task, is_play ==0 ? task.id : 0)"
              :disabled="is_play !=0 && is_play != task.id"
              >
              <i class="fas" :class="is_play !=0 && is_play==task.id ? 'fa-stop':'fa-play-circle' "></i>
              </button>
            <button :disabled="is_play !=0"> <i class="fas fa-trash-alt"></i></button>
            <button :disabled="is_play !=0" @click.prevent="EditTask(task)"> <i class="fas fa-pencil-alt"></i></button>
          </span>
        </li>
        <li v-if="tasks.length<1" class="list-group-item cursor-pointer" @click="modal_open=true">
          Crie as tarefas
        </li>
      </ul>

    </section>
    <modal
      :isOpen.sync="modal_open"
      v-on:close="modal_open=false"
      v-on:complete-close="onCloseModal"
      >
      <template slot="content">
        <div class="modal-header">
          <div class="text-center" style="width: 100%">
            <h5 class="modal-title">Criar nova Tarefa</h5>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="">Nome</label>
            <input type="text" class="form-control" v-model="task_name" />
          </div>
          <div class="form-group">
            <label for="">Descrição</label>
             <textarea v-model="descrition" class="form-control"></textarea>
          </div>
          <div class="action-modal d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              @click="modal_open = false"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="Salvar">
              {{this.saving ? 'Enviando...': 'Salvar'}}
            </button>
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from './Modal.vue'
import TimeMr from './TimeMr.vue'
export default {
  name:"Task",
  data(){
    return{
      modal_open:false,
      task_name:null,
      tasks:[],
      is_play:0,
      cron:null,
      descrition:null,
      id:null,
      saving:false,
      time:{
        millisecond:0,
        second:0,
        minute:0,
        hour:0
      }
    }
  },
  components:{
    Modal,
    TimeMr
  },
  methods:{
    onCloseModal(){
      this.task_name=null
      this.descrition=null
      this.id = null
    },

    PlayTime(state){

      this.StopTime()
      let {millisecond, second, minute, hour} = this.time
      if(state>0){

        if ((millisecond += 10) == 1000) {
          millisecond = 0;
          second++;
        }

        if (second == 60) {
          second = 0;
          minute++;
        }
        if (minute == 60) {
          minute = 0;
          hour++;
        }
        this.cron = setInterval(() => {
          this.PlayTime(state)
        }, 10);
      } else {
        second=0
        minute=0
        hour=0
        millisecond=0
        this.StopTime()
      }
      this.time={millisecond, second, minute, hour}
    },

    StopTime(){
      clearInterval(this.cron)
    },

    ActionPlay(task, state){

      this.is_play=state

      this.$emit('play', {
        task,
        state:state !=0
      })

      this.PlayTime(state)

    },

    EditTask(data){
      this.descrition = data.description
      this.task_name = data.name
      this.id=data.id
      this.modal_open = true;
    },

    Salvar(){

      let params = {
        "task": {
          "name": this.task_name,
          "description": this.descrition,
          "sprint_id": this.$route.params.id
        }
      }
      this.saving = true
      let request = this.id ? this.$api().put('tasks/'+this.id, params) : this.$api().post('tasks/', params)
      request.then(res=>{
        //this.tasks = [...[res.data], ...this.tasks]
        this.getTasks()
      }).finally(res=>{
        this.modal_open=false
        this.saving = false
      })
    },
    getTasks(){
      this.tasks = [];
      this.$api().get(`/sprints/${this.$route.params.id}/tasks/`).then(res=>{
        this.tasks = res.data
      }).finally(res=>{
        console.log("Aaa")
      })

    }
  },
  mounted(){
    this.getTasks()
  }
}

</script>

<style lang="scss">
@import "../assets/sass/variables";
  .wrapper-create-task{
    background: #fff;
    border-radius: 3px;
    >header{
      padding: 15px;
      background: $maino_blue;
      color: $maino_green;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      display: flex;
      justify-content: space-between;
      >span{
        &:nth-child(1){
          text-transform: uppercase;
          font-weight: 300;
        }
      }
      >.action-task{
        a{
          color: #fff;
          text-transform: uppercase;
          font-weight: 300;
          transition: .2s;
          &:hover{
            text-decoration: none;
            opacity: .7;
          }
        }
      }
    }
    .list-tasks{
      //padding: 15px;
      >.list-items-task{
        >li{
          display: flex;
          border-left:0;
          border-right:0;
          border-radius: 0;
          >.btn-tasks{
            >button{
             border: 0;
             background: transparent;
             &:hover{
               opacity: .5;
             }
            }
          }
        }
      }
    }
  }
</style>
