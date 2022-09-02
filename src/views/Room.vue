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
          <div v-for="(card, i) in cards" class="cards-poker" :key="i" @click=" Object.keys(task).length>0 ? EmitVote(card.key): '' ">
            <div class="inner-cards">
              <header v-html="card.label"></header>
              <main v-html="card.label"></main>
              <footer v-html="card.label"></footer>
            </div>
          </div>
        </div>
        <task-mr v-on:play="Play" />
      </div>
      <div class="col-md-4 mt-4">
        <div class="card list-users border-0 shadow">
          <header>
            <span>Jogadores</span>
          </header>
          <ul class="list-unstyled">
            <li v-for="(user, k) in users" class="lits-item" :key="k">
              <span class="d-flex justify-content-between content-user-sidebar">
                <avatar :image="user.avatar" :name="user.name" />
                <span class="info">
                  <small :class="'bullter status-' + user.online"></small>
                  <span class="name">{{ user.name }}</span>
                  <time>00:00:00</time>
                  <small class="check-vote">
                    <i
                      :class="`fas fa-${
                        user.vote == 1 ? 'check-circle' : 'times-circle'
                      }`"
                    ></i>
                  </small>
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import Avatar from "../components/Avatar.vue";
import TaskMr from '../components/Task.vue';
import ChannelMixin from './ChannelMixin'

export default {
  name: "Room",
  mixins:[ChannelMixin],
  data: () => ({
    cards: [
      {"key":1, "label": '1'},
      {"key":2, "label": '2'},
      {"key":3, "label": '3'},
      {"key":5, "label": '5'},
      {"key":8, "label": '8'},
      {"key":4, "label": '?'},
      {"key":6, "label": '<i class="fas fa-coffee"></i>'}
    ],
    sprint:null,
    room: {
      name: null,
      title: {
        rendered: null,
      },
    },
    task:{}
  }),
  components: {
    Avatar,
    TaskMr,
  },
  methods: {
    EmitVote(vote){
      this.$api().post('tasks/'+this.task.id+'/user_votes', {
        "vote": {
          "score": vote,
          "voted_moment_time":new Date().toJSON()
        }
      }).then(res=>{

        this.$cable.perform({
          channel: "VoteChannel",
          action: "votar",
          data: {
            user_id: res.data.owner_id,
          },
        });
      })
    },

    Play({task, state}){
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
    },
    async getSprint(){
      let {id} = this.$route.params

      if(id){
        try {
          let res = await this.$api().get(`sprints/${id}`)
          this.room = res.data
        } catch (err) {

        }
      }
    },
  },
  created() {
    this.getSprint();
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
    overflow: auto;
    max-height: 600px;
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
</style>
