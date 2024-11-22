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

  <div class="container">

      <nav class="navbar navbar-expand-lg">

        <div class="collapse navbar-collapse d-flex justify-content-between">

          <a class="navbar-brand" href="#">
            <i class="fa-solid fa-burger text-warning"></i> 
            Delive<strong class="text-warning">Boo</strong>
          </a>

          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-dark border-dark-subtle" type="submit">Search</button>
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

</template>

<style lang="scss" scoped>
    @use '../../assets/scss/main.scss' as *;
</style>