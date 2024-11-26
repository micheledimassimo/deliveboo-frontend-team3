<script>

import HomeNavbar from './HomeNavbar.vue';

export default {
  data() {
    return { 
      title: 'Quanto è buono DeliveBoo!',
      message: 'Vivi la ricchezza della vita attraverso ogni delizioso boccone, assapora il gusto che rende ogni momento davvero memorabile.',
      button: 'Fai un ordine',
    }
  },
  components: {
    HomeNavbar,
  },
}
</script>

<template>

  <HomeNavbar />

  <div class="container my-5">

    <div class="row gx-3">

      <div class="col-6">
        <h2 class="mb-4">
          {{ title }}
        </h2>

        <p class="mb-4">
          {{ message }}
        </p>

        <button class="btn btn-outline-warning" type="submit">
            <a class="nav-link" href="#main">
                {{ button }}
            </a>
        </button>

      </div>

      <div id="carouselExample" class="carousel slide col">
          <div class="carousel-inner rounded-4">
            <div class="carousel-item active">
              <img src="https://media-assets.lacucinaitaliana.it/photos/61fae7f75f740bfb879f54e8/3:2/w_1500,h_1000,c_limit/iStock-636305290.jpg" class="d-block w-100" alt="hamburger">
            </div>
            <div class="carousel-item">
              <img src="https://latteriasorrentina.com/wp-content/uploads/2019/06/come-fare-la-vera-pizza-1764x882.jpg" class="d-block w-100" alt="pizza">
            </div>
            <div class="carousel-item">
              <img src="https://offloadmedia.feverup.com/milanosegreta.co/wp-content/uploads/2020/10/13123100/Sushi-1-1024x683.jpg" class="d-block w-100" alt="sushi">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

    </div>
        
  </div> 

</template>

<style lang="scss" scoped>
    @use '../../assets/scss/main.scss' as *;
</style>