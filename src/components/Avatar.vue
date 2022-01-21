<template>
  <span class="avatar">
      <img v-if="image && image !=''" :src="image" />
      <span v-else class="initial-name">{{name | iniciaisNome}}</span>
  </span>
</template>

<script>
export default {
    props:{
        data(){
            return{
                path_image:null
            }
        },
        name:{
            type:String,
            default:''
        },
        image:{
            type:String,
            default:null
        }
    },
    computed:{
        getImage(){
            /**
             * Melhorar isso
             */
            if(this.image){
                let image = new Image()
                image.onload=()=>{
                    this.path_image = this.image
                }
                image.onerror=()=>{
                    this.path_image =null
                }
                image.src = this.image
            }

            return this.path_image

        }
    },
    filters:{
        iniciaisNome(str){
  
            if(!str || (str && str.length<1)) return;
            let quebra_str = str.trimRight().split(' ');
            
            if(Array.isArray(quebra_str) && quebra_str.length>1 ){
                return quebra_str.shift().charAt(0)+quebra_str.pop().charAt(0)
            } else {
                return quebra_str[0].charAt(0)
            }
        }    
    }
}
</script>

<style lang="scss">
@import '../assets/sass/variables';
.avatar{
    width:50px;
    height:50px;
    overflow:hidden;
    border-radius:50%;
    padding:3px;
    border:1px solid #ddd;
    margin-right:5px;
    >img{
        width:100%;
        height:100%;
        object-fit:cover;
        transform:scale(1.2)
    }    
    >.initial-name{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        background: $maino_blue;
        border-radius: 50%;
        color: #fff;

    }
}
</style>