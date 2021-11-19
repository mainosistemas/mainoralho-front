<template>
    <div class="bord-cards">
        <div class="row">
            <div class="col-md-8">
                <div class="row wrapper-cards">
                    <div v-for="card in cards" class="cards-poker">
                        <div class="inner-cards">
                            <header v-html="card"></header>
                            <main v-html="card"></main>
                            <footer v-html="card"></footer>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mt-2">
                <div class="card list-users border-0 shadow">
                    <header>
                        <span>Jogadores</span>
                    </header>    
                    <ul class="list-unstyled">
                        <li v-for="user in 6" class="lits-item">
                            <span class="d-flex justify-content-between content-user-sidebar">
                                <span class="avatar">
                                    <img src="https://randomuser.me/api/portraits/men/92.jpg" alt="">
                                </span>
                                <span class="info">
                                    <small :class="'bullter status-'+Math.round(Math.random() * (2 - 1 ) +1)"></small>
                                    <span class="name">Brad Gibson</span>
                                    <time>00:00:00</time>
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
export default{
    name:"Room",
    data:()=>({
        cards:[1,2,3,5,8,13,'?', '<i class="fas fa-coffee"></i>']
    }),
    methods:{
    },
    created(){
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
            }
            .info{
                position: relative;
                flex:1;
                >.bullter{
                    position:absolute;
                    left:-15px;
                    bottom:0;
                    width:8px;
                    height:8px;
                    border-radius:50%;
                    display:block;
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
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
            }
        }
    }
</style>
