<template>
    <div class="bord-cards">
        <div class="row">
            <div class="col-md-12 mt-5">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-white">
                        <li class="breadcrumb-item">
                            <router-link :to="{name:'home'}">Início</router-link>
                        </li>
                        <li class="breadcrumb-item" v-html="room.name"></li>
                    </ol>
                </nav>
            </div>
            <div class="col-md-8 mt-4">
                <section v-if="room" class="info-room mt-2 p-2">
                    <h4 v-html="room.name"></h4>
                    <p v-html="room.title.rendered"></p>
                </section>
                <div class="row wrapper-cards">
                    <div v-for="(card, i) in cards" class="cards-poker" :key="i">
                        <div class="inner-cards">
                            <header v-html="card"></header>
                            <main v-html="card"></main>
                            <footer v-html="card"></footer>
                        </div>
                    </div>
                </div>
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
                                    <small :class="'bullter status-'+user.online"></small>
                                    <span class="name">{{user.name}}</span>
                                    <time>00:00:00</time> 
                                    <small class="check-vote">
                                        <i  :class="`fas fa-${user.vote==1 ? 'check-circle':'times-circle'}`"></i>
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

import Avatar from '../components/Avatar.vue'    

export default{
    name:"Room",
    data:()=>({
        cards:[1,2,3,5,8,13,'?', '<i class="fas fa-coffee"></i>'],
        users:[],
        room:{
            name:null,
            title:{
                rendered:null
            }
        }
    }),
    components:{
        Avatar
    },
    methods:{
        async getUser(){
            const res = await fetch("https://reqres.in/api/users/")
            const json = await res.json()
            
            if(json){
                json?.data.map((item, i)=>{
                    item.avatar = i==Math.round(Math.random() * (json?.data.length - 1 ) +1) ? null : item.avatar
                    item.online = Math.round(Math.random() * (2 - 1 ) +1)
                    item.vote = Math.round(Math.random() * (2 - 1 ) +1)
                    item.name = item.first_name + ' '+item.last_name
                })
            }
            this.users = json?.data || []
        },
        async getRoom(){
            let {id} = this.$route.params
            if(id){
                let res = await fetch('https://techcrunch.com/wp-json/wp/v2/posts/'+id)
                let response = await res.json()
                this.room = response
                if(response){
                    this.room.name = response.title.rendered.substr(0,14) 
                }
            }
        }
    },
    created(){
        this.getRoom()
        this.getUser()
    }
}
</script>

<style lang="scss">
    @import '../assets/sass/variables';
    .wrapper-cards{
        justify-content:center;
        .cards-poker{
            width:170px;
            padding:10px;
            .inner-cards{
                cursor: pointer;
                background:#fff;
                border-radius:8px;
                display:flex;
                flex-direction:column;
                margin-bottom:18px;
                justify-content:space-between;
                color:#666;
                box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
                
                transition:.1s;
                &:hover{
                    box-shadow:none
                }
                header, footer{
                    padding:0 5px;
                }
                footer{
                    transform:rotate(-180deg)
                }
                main{
                    border:1px solid #ddd;
                    width:80%;
                    margin:0 auto;
                    border-radius:5px;
                    height:120px;
                    font-size:3rem;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-weight: 300;
                }
            }
        }
    }
    .list-users{
        header{
            background:$maino_blue;
            text-align:center;
            color:#fff;
            padding:10px 0px;
            border-top-left-radius:.25rem;
            border-top-right-radius:.25rem;
            text-transform:uppercase
        }
        .content-user-sidebar{
            margin-top:15px;
            padding: 0 10px ;
            
            .info{
                position: relative;
                flex:1;
                >.bullter{
                    position:absolute;
                    left:-15px;
                    bottom:4px;
                    width:10px;
                    height:10px;
                    border-radius:50%;
                    display:block;
                    box-shadow: 0 1.5px 2px rgba(0, 0, 0, 0.60);
                    &.status-1{
                        background:var(--teal);
                    }
                    &.status-2{
                        background:var(--red);
                    }
                }
                >.name{
                    display:block;
                }
                >.check-vote{
                    padding:3px;
                    display:inline-flex;
                    border-radius:50%;
                    >i{
                        &.fa-check-circle{
                            color:var(--primary);
                        }
                        &.fa-times-circle{
                            color:var(--danger)
                        }
                    }
                }
            }
        }
    }
</style>
