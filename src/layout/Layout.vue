<template>
    <div class="wrapper-panel">
        
        <nav class="navbar navbar-expand-lg navbar-light bar-ralho">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <router-link :to="{name:'home'}" class="navbar-brand logo" >
                    <span>maino</span>
                    <span>ralho</span>
                </router-link>
                <ul class="navbar-nav ml-md-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">User <span class="sr-only">(current)</span></a>
                    </li>
                </ul>
            </div>
        </nav> 
        <div class="container-fluid">
            <!--na route mane home, render dashboard-->    
            <dashboard v-if="$route.name==='home'" />
            <!--/-->
            <!--nas demais rotas filhas-->
            <router-view v-else></router-view>
            <!--/-->
        </div>    
    </div>
</template>
<script>

import Dashboard from '../components/Dashboard'

export default{
    name:"Layout",
    data:()=>({
        
    }),
    components:{
        Dashboard
    },
    methods:{
    },
    created(){
    }
}
</script>

<style lang="scss">
@import '../assets/sass/variables';
    .logo{
    >span{
        display:inline-flex;
        font-size:1.5rem;
        text-transform:uppercase;
        &:nth-child(1){
            color:$maino_blue;
            font-weight:bold
        }
        &:nth-child(2){
            color:$maino_green;
            font-weight:300
        }
        }
    }
</style>