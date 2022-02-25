<template>
  <footer class="footer-background mt-5 pt-3 ">
    <div class="d-flex justify-content-around">
      <section class="footer-section">
        <h3 class="text-center section-title">Logo</h3>
        <div class="section-content d-flex flex-column justify-content-center">
          <p>Mainoralho é um projeto criado para o planejamento das sprints, tendo função semelhante a de um planning poker</p>
          <div>redes sociais</div>
        </div>
      </section>
      
      <section class="footer-section">
        <h3 class="text-center section-title">Contato</h3>
        <div class="section-content d-flex justify-content-center align-items-center">
          <div>
            <div>
              <span class="mr-1">Telefone: </span>
              <span>(21) 94002-8922</span>
            </div>

            <div>
              <span class="mr-1">Email: </span>
              <span>maino.contato@maino.com.br</span>
            </div>
          </div>
        </div>
      </section>

      <section class="footer-section">
        <h3 class="text-center section-title">Onde nos encontrar</h3>
        <p></p>
      </section>
    </div>
    <p class="text-center pt-3 mb-0 pb-2"> &copy; Copyright Mainoralho - 2022 </p>
  </footer>
</template>

<script>
export default {
  name: "FooterMr"
}
</script>

<style lang="scss">
  @import '../assets/sass/variables';

  .footer-background {
    background: $maino_blue;
    color: #f5f5f5;
  }

  .footer-section {
    width: 30%;
  }

  .section-title {
    height: 15%;
    padding-bottom: 2rem;
  }

  .section-content {
    height: 80%;
  }


</style>