<template>
  <div class="bord-cards">
    <div class="row">
      <div class="col-md-12 mt-5">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-white">
            <li class="breadcrumb-item">
              <router-link :to="{ name: 'home' }">Início</router-link>
            </li>
            <li class="breadcrumb-item" v-html="room.name"></li>
          </ol>
        </nav>
      </div>
      <div class="col-md-8 mt-4">
        <section class="info-room mb-2 ">
          <p class="mb-0 text-center">{{task.name}}</p>
        </section>
        <div class="row wrapper-cards">
          <div v-for="(card, i) in cards" :class="{active: userVote && userVote.score == card.score}" class="cards-poker" :key="i" @click="Object.keys(task).length>0 && !userVote ? EmitVote(card.key): '' ">
            <div class="inner-cards">
              <header v-html="card.label"></header>
              <main v-html="card.label"></main>
              <footer v-html="card.label"></footer>
            </div>
          </div>
        </div>
        <task-mr v-on:play="Play" ref="task_ref" v-on:user-votes="handleVotes"/>
      </div>
      <div class="col-md-4 mt-4">
        <div class="card list-users border-0 shadow">
          <header>
            <span>Jogadores</span>
          </header>
          <ul class="list-unstyled">
            <li v-for="(player, k) in users" class="lits-item" :key="k">
              <span class="d-flex justify-content-between content-user-sidebar">
                <div class="box-image" :class="'dropdown-'+player.id">
                  <avatar :image="player.avatar" :name="player.name" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"/>
                  <div v-if="$refs['task_ref'].permision_action" class="dropdown-menu">
                    <a class="dropdown-item" href="#" @click.prevent="Tipo(player.id, 'player')">Player</a>
                    <a class="dropdown-item" href="#" @click.prevent="Tipo(player.id, 'espectador')">Espectador</a>
                  </div>
                </div>
                <span class="info">
                  <small :class="`bullter status-${player.tipo ? tipo[player.tipo]:'0'}`"></small>
                  <span class="name">{{ player.name }}</span>
                  <time>00:00:00</time>
                  <small class="check-vote">
                    <i :class="`fas fa-${ player.vote == 1 ? 'check-circle' : 'times-circle'}`"></i>
                  </small>
                  <small v-if="player.score" v-html="player.score.label"></small>
                </span>
              </span>
            </li>
          </ul>
          <div v-if="trend" class="result-pont">
            <h2 class="text-center">Resultado</h2>
            <h1 class="text-center">{{trend ? trend.label: ''}}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Avatar from "../components/Avatar.vue";
import TaskMr from '../components/Task.vue';
import ChannelMixin from './ChannelMixin'
import 'popper.js'
import dropdown from 'bootstrap/js/dist/dropdown'
export default {
  name: "Room",
  mixins:[ChannelMixin],
  data: () => ({
    cards: [
      {"key":1, "label": '1', 'score':'one'},
      {"key":2, "label": '2', 'score':'two'},
      {"key":3, "label": '3', 'score':'three'},
      {"key":5, "label": '5', 'score':'five'},
      {"key":8, "label": '8', 'score':'eight'},
      {"key":4, "label": '?', 'score':'interrogation'},
      {"key":6, "label": '<i class="fas fa-coffee"></i>','score':'coffee'}
    ],
    sprint:null,
    room: {
      name: null
    },
    task:{},
    userVote:null,
    tipo:{
      'player':1,
      'espectador':2
    }
  }),
  components: {
    Avatar,
    TaskMr,
  },
  methods: {
    Tipo(id, tipo){
      console.log(id, tipo)
    },

    handleVotes(userVotes){
      let users = [...this.users]
      users.map(item=>{
        item.vote = userVotes.some( uv => uv.user_id == item.id && uv.ja_votou) ? 1 : 0
        item.verifica = userVotes.some( uv => uv.user_id == item.id && uv.ja_votou)
      })
      this.$nextTick(()=>{
        this.users = users
      })
    },

    EmitVote(vote){
      this.$api().post('tasks/'+this.task.id+'/user_votes', {
        "vote": {
          "score": vote,
          "voted_moment_time":new Date().toJSON()
        }
      }).then(res=>{
        this.userVote = res.data
        this.$cable.perform({
          channel: "VoteChannel",
          action: "votar",
          data: {
            user_id: res.data.owner_id,
          },
        });
      })
    },

    Play({task, state, emitPlay}){
      if(!emitPlay){
        this.task=task
      } else {
        let attr = state ? 'start_votation_time': 'finish_votation_time';
        let {id} = this.$route.params
        this.$api().put('tasks/'+task.id, {
            [attr]:new Date().toJSON(),
            status_votation:state ? 'started': 'finished'
          }
        ).then(res=>{
          let action = null
          if(state){
            this.task=task
            action = 'iniciar_votacao'
          } else {
            this.task = {}
            action = 'encerrar_votacao'
          }
          this.$cable.perform({
            channel: "VoteChannel",
            action: action,
            room:id,
            data:{task_id: task.id},
          });
        })
      }
    },
    async getSprint(){
      let {id} = this.$route.params

      if(id){
        try {
          let res = await this.$api().post(`sprints/show`, {id})
          this.room = res.data
          this.$refs['task_ref'].permision_action = this.user.id === res.data.owner_id
        } catch (err) {

        }
      }
    },
  },
  created() {
    this.getSprint();
  },
  mounted(){
    $('.dropdown-toggle').dropdown()
  }
};
</script>

<style lang="scss">
@import "../assets/sass/variables";

.wrapper-cards {
  justify-content: center;
  .cards-poker {
    width: 170px;
    padding: 10px;
    &.active{
      .inner-cards{
        box-shadow: none;
        background-color: #4cc3b8;
        color:#fff
      }
    }
    .inner-cards {
      cursor: pointer;
      background: #fff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      margin-bottom: 18px;
      justify-content: space-between;
      color: #666;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

      transition: 0.1s;
      &:hover {
        box-shadow: none;
      }
      header,
      footer {
        padding: 0 5px;
      }
      footer {
        transform: rotate(-180deg);
      }
      main {
        border: 1px solid #ddd;
        width: 80%;
        margin: 0 auto;
        border-radius: 5px;
        height: 120px;
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 300;
      }
    }
  }
}
.list-users {
  header {
    background: $maino_blue;
    text-align: center;
    color: #fff;
    padding: 10px 0px;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    text-transform: uppercase;
  }
  >ul{

    max-height: 600px;
    min-height: 200px;
  }
  .content-user-sidebar {
    margin-top: 15px;
    padding: 0 10px;

    .info {
      position: relative;
      flex: 1;
      > .bullter {
        position: absolute;
        left: -15px;
        bottom: 4px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        display: block;
        box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.6);
        &.status-1 {
          background: var(--teal);
        }
        &.status-2 {
          background: var(--red);
        }
      }
      > .name {
        display: block;
      }
      > .check-vote {
        padding: 3px;
        display: inline-flex;
        border-radius: 50%;
        > i {
          &.fa-check-circle {
            color: var(--primary);
          }
          &.fa-times-circle {
            color: var(--danger);
          }
        }
      }
    }
  }
}
.box-image{
  width: 55px;
  height: 55px;
  display: inline-flex;
  cursor: pointer;
  position: relative;
  >.dropdown-menu{
    top:5px !important;
    background: var(--azul);
    >a{
      color: #fff;
      padding: 0.25rem .75rem;
      &:hover{
        background: rgba(0, 0, 0, 0.15)
      }
    }
    &::after{
      position: absolute;
      content: "";
      top:-8px;
      left:16px;
      border-top:0 solid var(--azul);
      border-right:8px solid transparent;
      border-left:8px solid transparent;
      border-bottom:8px solid var(--azul);
    }
  }
}
</style>
