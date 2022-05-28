<template>
  <div class="wrapper-dashboard">
    <div class="container">
      <section class="info d-flex justify-content-between mt-5">
        <span>
          <h3>Sprints</h3>
        </span>
        <span>
          <button class="btn btn-primary" @click="open_modal = true">
            Criar Nova Sprint
          </button>
        </span>
      </section>
      <section class="list-rooms mt-4">
        <div class="card">
          <div class="card-body">
            <p v-if="!loading && sprint_list.length<1" class="mb-0">
              Nenhuma sprint cadastrada para esse projeto
            </p>
            <table v-if="sprint_list.length>0" class="table table-hover">
              <thead>
                <tr>
                  <th class="border-0">Nome</th>
                  <th class="border-0">Votos</th>
                  <th class="border-0 text-right">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr class="row-sprints" v-for="sprint in sprint_list" :key="sprint.id" @click="goTo(sprint)">
                  <td>{{sprint.name}}</td>
                  <td>13 Votos</td>
                  <td class="text-right"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>

    <Modal :isOpen.sync="open_modal" v-on:close="open_modal = false">
      <template slot="content">
        <div class="modal-header">
          <div class="text-center" style="width: 100%">
            <h5 class="modal-title">Criar nova sprint</h5>
          </div>
        </div>

        <div class="modal-body">
          <flash-message :msg="msg" />

          <div class="form-group">
              <label for="">Nome da sprint</label>
              <input type="text" class="form-control" v-model="sprint_name" />
            </div>

          <div class="action-modal d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              @click="open_modal = false"
            >
              Cancelar
            </button>

            <button type="button" class="btn btn-primary" @click="salvar">
              Salvar
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>

</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
	name: 'project',
	data:() => ({
    open_modal: false,
    sprint_name: null,
    sprint_list: [],
    loading:false,
    msg: null
	}),

	components: {
		Modal,
	},

  methods: {
    goTo(item){
      this.$router.push({name:'room', params:{id:item.id}})
    },
    async lista_sprints(){
      let {id:project} = this.$route.params
      this.loading = true
      try {
        let res = await this.$api().get("sprints", {params:{project}});
        res.data.map((item) => {
          item.data = new Date(item.created_at).toLocaleString();
        });
        this.sprint_list = res.data;
      } catch (error) {
      }
      this.loading = false
    },

    async salvar() {
      this.saving = true;
      let {id:project_id} = this.$route.params

      if(project_id) {

        try{
          let res = await this.$api().post("sprints", {sprint: { name: this.sprint_name, project_id}});
          this.msg = {
            text: "Sprint cadastrada com sucesso!",
            class: "alert-success",
          }
          this.lista_sprints()
          //this.sprint_list = [...[res.data?.data?.sprint], ...this.sprint_list]
          setTimeout(()=>{
            this.open_modal=false
          }, 1000)
        } catch(error) {

          this.msg = {
            text: this.$erros(error),
            class: "alert-danger",
          }
        }
      }

      this.saving = false;
    }

  },

  created() {
    this.lista_sprints()
  }
}
</script>

<style scoped lang="scss">
  .row-sprints{
    td{
      cursor: pointer;
    }
  }
</style>



