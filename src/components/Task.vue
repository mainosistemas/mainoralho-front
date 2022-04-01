<template>
  <div class="wrapper-create-task">
    <header>
      <span>Tarefas</span>
      <span class="action-task">
        <a href="#" @click.prevent="modal_open=true">Nova <i class="fas fa-pencil-alt"></i></a>
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
      v-on:complete-close="task_name=null"
      >
      <template slot="content">
        <div class="modal-header">
          <div class="text-center" style="width: 100%">
            <h5 class="modal-title">Criar nova Tarefa</h5>
          </div>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="">Descrição</label>
            <input type="text" class="form-control" v-model="task_name" />
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
              Salvar
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

    Salvar(){
      let task={name: this.task_name, sprint_id: this.$route.params.id}
      if(this.tasks.length<1){
        task.id = 1
        this.tasks = [task]
      } else {
        task.id = this.tasks[this.tasks.length-1].id + 1
        this.tasks = [...[task], ...this.tasks]
      }
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
      this.modal_open=false
    },
    getTasks(){
      let tasks = localStorage.getItem('tasks')
      try {
        this.tasks = JSON.parse(tasks).filter(t=>t.sprint_id==this.$route.params.id)
      } catch (error) {

      }
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
