<template>
    <div class="wrapper-panel">
        

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <a class="navbar-brand" href="#">Hidden brand</a>
                <ul class="navbar-nav ml-md-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
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