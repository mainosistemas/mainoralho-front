<template>
  <footer class="footer-background mt-5 pt-3">
    <div class="footer-border d-flex justify-content-around pl-3">
      <section class="footer-section">
        <img class="logo" src="../assets/logo_maino_branco.png" alt="Logo da empresa maino">
        <div class="pt-3 d-flex align-items-center">
          <p>Mainoralho é um projeto criado para o planejamento das sprints, tendo baseado na tecnica de planejamento planning poker</p>
        </div>
      </section>
      
      <section class="footer-section">
        <h3 class="section-title">Contato</h3>
        <div class="pt-3 d-flex align-items-center">
          <div>
            <div>
              <span class="mr-1">Telefone: </span>
              <span>(21) 94002-8922</span>
            </div>

            <div>
              <span class="mr-1">Email: </span>
              <span>maino.contato@maino.com.br</span>
            </div>

            <div class="d-flex pt-3">
              <a href="https://www.instagram.com/mainosistemas/"><i class="fab fa-instagram mr-3"></i></a>
              <a href="https://www.facebook.com/mainosistemas/"><i class="fab fa-facebook-square mr-3"></i></a>
              <a href="https://www.linkedin.com/company/mainosistemas"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </section>

      <section class="footer-section">
        <h3 class="section-title">Onde nos encontrar</h3>
        <div class="pt-3 d-flex flex-column justify-content-center">
          <p class="m-0">Av. Pastor Martin Luther King Júnior, 126</p>
          <p class="m-0">Del Castilho, Rio de Janeiro - RJ</p>
          <p class="m-0">CEP: 20760-005</p>
          <p class="m-0">Nova America Offices 3000, sala 812</p>
        </div>
      </section>
    </div>
    <p class="copyright text-center pt-2 mb-0 pb-2"> &copy; Copyright Mainoralho - 2022 </p>
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
    border-radius: 35px 35px 0 0;
    color: #f5f5f5;
  }

  .footer-section {
    width: 30%;
  }

  .section-title {
    color: $maino_green;
    height: 15%;
    padding-bottom: 2rem;
  }

  .logo {
    height: 80px;
    width: auto;
  }

  .copyright{
    background: $maino_blue_hover;
  }

  .fab {
    color: $maino_green;
  }.fab:hover {
    color: $maino_green_hover;
  }
</style>