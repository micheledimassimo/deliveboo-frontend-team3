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

      <nav class="navbar navbar-expand-lg mt-2">

        <div class="collapse navbar-collapse d-flex justify-content-between">

          <a class="navbar-brand" href="#">
            <i class="fa-solid fa-burger text-warning"></i> 
            Delive<strong class="text-warning">Boo</strong>
          </a>

          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Cerca" aria-label="Search">
            <button class="btn btn-outline-dark border-dark-subtle" type="submit">Cerca</button>
          </form>

          <button class="btn btn-outline-dark border-dark-subtle" type="submit">
            <a class="nav-link" href="http://127.0.0.1:8000/login">
                <i class="fa-solid fa-house text-warning me-2"></i>
                Registrati o accedi
            </a>
          </button>

        </div>

      </nav>

  </div>


  <!-- Navbar breakpoint dispositivi mobile -->
  <div class="container-sm d-block d-md-none">

    <nav class="navbar navbar-expand-lg">
      <div class="collapse navbar-collapse d-flex justify-content-between">

        <a class="navbar-brand w-75 fs-1" href="#">
          <i class="fa-solid fa-burger text-warning"></i> 
          Delive<strong class="text-warning">Boo</strong>
        </a>

        <button class="btn " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
          <i class="fa-solid fa-bars fa-2x text-warning"></i>
        </button>

        <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">
              Deliveboo
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <a class="nav-link" href="http://127.0.0.1:8000/register">
                <i class="fa-solid fa-house text-warning me-2"></i>
                  Registrati 
            </a>
            <a class="nav-link mt-3" href="http://127.0.0.1:8000/login">
                <i class="fa-solid fa-house text-warning me-2"></i>
                  Accedi 
            </a>
            <div>
              <hr class="text-warning">
            </div>
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

      <form class="d-flex my-2 w-100" role="search">
          <input class="form-control me-2" type="search" placeholder="Cerca ristoratnte per nome o tipologia" aria-label="Search">
          <button class="btn btn-outline-dark border-dark-subtle" type="submit">Cerca</button>
        </form>

    </nav>

</div>

</template>

<style lang="scss" scoped>
    @use '../../assets/scss/main.scss' as *;
</style>