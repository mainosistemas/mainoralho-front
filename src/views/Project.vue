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

            <table class="table">
              <thead>
                <tr>
                  <th class="border-0">Nome</th>
                  <th class="border-0">Id do Criador</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="sprint in sprint_list" :key="sprint.id">
                  <td>{{sprint.name}}</td>
                  <td>{{sprint.owner_id}}</td>
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
    msg: null
	}),

	components: {
		Modal,
	},

  methods: {
    async lista_sprints(){
      try {
        let res = await this.$api().get("sprints");
        this.sprint_list = res.data;
        console.log(res)
      } catch (error) {
        console.log(error);
      }
    },

    async salvar() {
      this.saving = true;
      let {id:project_id} = this.$route.params
      console.log("começou")
      if(project_id) {
        console.log("if foi")
        try{
          let res = await this.$api().post("sprints", {sprint: { name: this.sprint_name, project_id}});
          this.msg = {
            text: "Sprint cadastrada com sucesso!",
            class: "alert-success",
          }
        } catch(error) {
          
          this.msg = {
            text: this.$erros(error),
            class: "alert-danger",
          }
        }
      }
      console.log("fechou")

      this.saving = false;
    }

  },

  created() {
    this.lista_sprints()
  }
}
</script>



