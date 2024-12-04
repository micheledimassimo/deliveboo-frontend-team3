<script>

export default {
  data() {
    return { 
      message: '',
    }
  }
}
</script>

<template>
<!-- Navbar breakpoint dispositivi desktop -->

  <div class="container-sm d-none d-md-block">

      <nav class="navbar navbar-expand-lg my-1">

        <div class="collapse navbar-collapse d-flex justify-content-between">

          <a class="navbar-brand d-flex align-items-center" href="#">
            <img class="logo me-2" src="/public/DeliveBoo.png" alt="Deliveboo">
            <span class="fs-5"> Delive<strong class="text-warning">Boo</strong> </span>
          </a>

          <button class="btn btn-outline-dark border-dark-subtle rounded-pill text-warning px-4" type="submit">
            <a class="nav-link" href="http://127.0.0.1:8000/login">
                Dashboard o accedi
            </a>
          </button>

        </div>

      </nav>

  </div>

  <!-- Navbar breakpoint dispositivi mobile -->
  <div class="container-sm d-block d-md-none">

    <nav class="navbar navbar-expand-lg">
      <div class="collapse navbar-collapse d-flex justify-content-between">

        <a class="navbar-brand d-flex align-items-center" href="#">
            <img class="logo me-2" src="/public/DeliveBoo.png" alt="Deliveboo">
            <span class="fs-5"> Delive<strong class="text-warning">Boo</strong> </span>
        </a>

        <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <i class="fa-solid fa-bars fa-2x text-warning"></i>
        </button>

        <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">

          <div class="offcanvas-header pt-4">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">
              <span class="fs-5"> Delive<strong class="text-warning">Boo</strong> </span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div class="offcanvas-body">
            <a class="nav-link" href="http://127.0.0.1:8000/login">
                  Dashoboard o accedi 
            </a>
            <div>
              <hr class="text-warning">
            </div>

            <div class="text-warning">
                <a class="nav-link mt-3" href="#">
                Chi Siamo
              </a>
              <a class="nav-link mt-3" href="#">
                Contatti
              </a>
              <a class="nav-link mt-3" href="#">
                Informativa sulla privacy
              </a>
              <a class="nav-link mt-3" href="#">
                Partner
              </a>
              <a class="nav-link mt-3" href="#">
                FAQ
              </a>
            </div>

          </div>

        </div>

      </div>

    </nav>

  </div>

</template>

<style lang="scss" scoped>
    @use '../assets/scss/main.scss' as *;

    // .logo{
    //   max-width: 50px;
    // }
</style>