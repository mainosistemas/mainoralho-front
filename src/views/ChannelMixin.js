export default {
  data(){
    return{
      users: [],
      user:[],
      trend:null
    }
  },
  channels:{
    VoteChannel: {
      connected(data) {
        console.log("Conectado", data)
      },
      rejected() {
        console.log("Reject")
      },
      received(data) {

        if(data && data.type !=='ping'){
          console.log(data.type)
        }

        if(data && data.type =='conectado'){
          const {message:user, users} = data

          if(users){
            this.users = users.filter(_user=>_user.id != user.id)
          }

          if(!this.users.some(u=>u.email === user.email)){
            this.users = [...this.users, ...[user]]
          }
        }
        if(data && data.type =='desconectado'){
          const {message:user} = data
          let users = this.users.filter(u=>u.email !== user.email)
          this.users = users
        }


        if(data && data.type == 'votacao_concluida'){
          const {message:task} = data
          let users = [...this.users]
          users.map(item=>{
            let score = task.votes.find( sc => sc.score && sc.owner_id == item.id)
            item.score = this.cards.find(c => c.score == score.score)

          })
          this.$refs['task_ref'].is_play = 0
          this.task = {}
          this.userVote = null
          this.trend = this.cards.find(c=>c.score == task.trend_voted)

        }

        if(data && data.type =='iniciar_votacao'){
          const {message:task} = data
          this.task=task
          this.trend = null
          this.updaUser()
        }

        if(data && data.type =='encerrar_votacao'){
          this.task={}
          this.userVote = null
          this.updaUser()
        }

        if( data && data.type == 'votar' ){
          let users = [...this.users]
          let indexUser = users.findIndex(u=>u.id == data.message)
          if(indexUser > -1){
            users[indexUser].vote = 1
            this.$nextTick(()=>{
              this.users = users
            })
          }
        }
      },
      disconnected(data) {
        console.log("Desconectou", data)
      },
    },
  },
  methods: {
    updaUser(){
      let users = [...this.users]
      users.map(item=>{
        item.vote = 0
      })
      this.$nextTick(()=>{
        this.users = users
        this.userVote = null
      })
    }
  },
  mounted(){
    let { id } = this.$route.params || 23
    const user = JSON.parse(window.localStorage.getItem('~token'))
    this.user = user
    this.$cable.subscribe({
      channel:'VoteChannel',
      room:id,
      user: { email:user?.email}
    })


    this.$cable.unsubscribe({
      channel:"VoteChannel",
      room:id,
      user:{ ...user }
    });
  }
}
