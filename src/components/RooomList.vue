<template>
    <div class="wrapper-dashboard">
       <div class="container">
           <section class="info d-flex justify-content-between mt-5">
               <span>
                   <h3>Últimas salas</h3>
               </span>
               <span>
                   <button class="btn btn-primary" @click="open_modal = true">Criar Nova Sala</button>
               </span>
           </section>
           <section class="list-rooms mt-4">
               <div class="card">
                   <div class="card-body">
                        <div v-if="loading" class="spinner-border text-light spinner-border-sm" role="status">
                            <span class="sr-only">Loading...</span>
                        </div> 
                        <div v-if="!loading && room_list.length>0" class="table-responsive-md">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="border-0">Títilo</th>
                                        <th class="border-0">Votos</th>
                                        <th class="border-0">Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(room, k) in room_list" :key="k">
                                        <td>
                                            <router-link :to="{name:'room', params:{id:room.id}}" v-html="room.title">
                                                
                                            </router-link>
                                        </td>
                                        <td>{{room.vote}}</td>
                                        <td v-html="room.description"></td>
                                    </tr>
                                </tbody>
                            </table>    
                        </div>
                       <p class="mt-3" v-if="room_list.length<1 && !loading">Nenhum sala encontrada</p>
                   </div>
               </div>
           </section>
       </div>
       <Modal :isOpen="open_modal" v-on:close="open_modal=false"/>
    </div>
</template>
<script>


import Modal from './ModalCreateRoom.vue'

export default{
    name:"RoonList",
    data:()=>({
        room_list:[],
        open_modal:false,
        loding:false
    }),
    components:{
        Modal
    },
    methods:{
        async getRooms(){
            this.loading=true
            let res = await fetch('https://techcrunch.com/wp-json/wp/v2/posts?per_page=5&_fields[]=id&_fields=title, id');
            let json = await res.json();
            if(json){
                json?.map(item=>{
                    item.description = item.title.rendered
                    item.title = item.title.rendered.substr(0,14)
                    item.vote = Math.round(Math.random() * (8 - 1 ) +1)
                })
            }
            this.room_list = json
            this.loading=false
        }
    },
    created(){
        this.getRooms()
    }
}
</script>