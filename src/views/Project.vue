<template>
  <div class="wrapper-dashboard">
    <div class="container">
      <section class="info d-flex justify-content-between mt-5">
        <span>
          <h3>Sprints</h3>
        </span>
        <span>
          <button class="btn btn-primary">
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
                  <th>Nome</th>
                  <th>Criador</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </section>
    </div>

    <Modal>

    </Modal>
  </div>

</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
	name: 'project',
	data:() => ({

	}),
	components: {
		Modal,
	},
}
</script>



