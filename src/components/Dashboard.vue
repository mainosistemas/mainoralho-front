<template>
  <div class="wrapper-dashboard">
    <div class="container">
      <section class="info d-flex justify-content-between mt-5">
        <span>
          <h3>Últimos projetos</h3>
        </span>
        <span>
          <button class="btn btn-primary" @click="open_modal = true">
            Criar Novo Projeto
          </button>
        </span>
      </section>
      <section class="list-rooms mt-4">
        <div class="card">
          <div class="card-body">
            <div
              v-if="loading"
              class="spinner-border text-light spinner-border-sm"
              role="status"
            >
              <span class="sr-only">Loading...</span>
            </div>
            <div
              v-if="!loading && room_list.length > 0"
              class="table-responsive-md"
            >
              <table class="table">
                <thead>
                  <tr>
                    <th class="border-0">Título</th>
                    <th class="border-0">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, k) in room_list" :key="k">
                    <td>

                      <router-link :to="{name:'project', params:{id:item.id}}">{{ item.name }}</router-link>
                    </td>
                    <td>
                      {{ item.data }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mt-3" v-if="room_list.length < 1 && !loading">
              Nenhum projeto encontrado
            </p>
          </div>
        </div>
      </section>
    </div>
    <Modal
      :isOpen.sync="open_modal"
      v-on:close="open_modal = false"
      v-on:complete-close="complete_close=true">
      <template slot="content">
        <div class="modal-header">
          <div class="text-center" style="width: 100%">
            <h5 class="modal-title">Criar nova projeto</h5>
          </div>
        </div>
        <div class="modal-body">
          <flash-message :msg="msg" />
          <div class="form-group">
            <label for="">Nome do projeto</label>
            <input type="text" class="form-control" v-model="project_name" />
          </div>
          <div class="action-modal d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-secondary"
              @click="open_modal = false"
            >
              Cancelar
            </button>
            <button type="button" class="btn btn-primary" @click="Salvar">
              Salvar
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";

export default {
  name: "Dashboard",
  data: () => ({
    room_list: [],
    open_modal: false,
    loding: false,
    project_name: null,
    msg:null,
    complete_close:false,
    saving:false
  }),
  components: {
    Modal
  },
  methods: {
    async getProjects() {
      this.loading = true;
      let res = await this.$api().post("projects/listar");
      let json = res.data
      if (res.data) {
        json.map((item) => {
          item.data = new Date(item.created_at).toLocaleString();
        });
        this.room_list = json;
      }
      this.loading = false;
    },
    async Salvar() {
      this.saving = true;
      try {
        let res = await this.$api().post("projects", {project: { name: this.project_name }});
        this.msg={
          text: "Projeto cadastrado com sucesso!",
          class:'alert-success'
        }

        const {data:project} = res.data
        res.data.data = new Date(res.data.created_at).toLocaleString();
        this.open_modal = false

        this.room_list=[...[res.data], ...this.room_list]
        this.$nextTick(()=>{
          if (project && !this.open_modal) {
            this.$router.push({'name':'project', params:{id: project.id}})
          }
        })
      } catch (error) {
        this.msg={
          text: this.$erros(error, 'Erro ao cadastrar projeto'),
          class:'alert-danger'
        }
      }
      this.saving = false;
    },
  },
  created() {
    this.getProjects();
  }
};
</script>
