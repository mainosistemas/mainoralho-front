<template>
    <div>
        <router-link :to="{name:'room', params:{id:1}}">Sala 1</router-link>
    </div>
</template>
<script>
export default{
    name:"Dashboard",
    data:()=>({
        
    }),
    methods:{
    },
    created(){
    }
}
</script>