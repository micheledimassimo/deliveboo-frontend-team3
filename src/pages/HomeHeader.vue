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

  <div id="carousel-container">

    <!-- testi -->
    <div id="text" class="container-sm py-5">

      <div class="row align-items-center mt-5 text-white">

        <div class="col-md-6 col-sm-12 pb-3">

          <h2 class="mb-0 fst-italic fw-lighter">
            Quanto è buono
          </h2>

          <h1 class="mb-4 mt-0">
            Delive<span class="text-warning">Boo</span>
          </h1>

          <h4 class="mb-5 fw-lighter">
            {{ message }}
          </h4>

          <button class="btn btn-outline-warning rounded-pill px-4" type="submit">
              <a class="nav-link" href="#main">
                  {{ button }}
              </a>
          </button>
          
        </div>

      </div>
        
    </div> 

    <!-- deliveboo -->
    <div id="deliveboo">
      <img src="/deliveboo_bg.png" alt="deliveboo">
    </div>

    <!-- carosello -->
    <div id="carouselExample" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">

      <div class="carousel-inner">

        <div class="carousel-item active">
          <img src="https://media-assets.lacucinaitaliana.it/photos/61fae7f75f740bfb879f54e8/master/pass/iStock-636305290.jpg"
          class="d-block w-100"
          alt="hamburger">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/tempo-di-pizza-gustosa-pizza-tradizionale-fatta-in-casa-ricetta-italiana_144627-42528.jpg?t=st=1733316536~exp=1733320136~hmac=0338fa9f0836bccfa46d2ce8f1dde2595751f443d5bdf52dcee5c065e5e6a222&w=2000"
            class="d-block w-100 rotate-y"
            alt="pizza">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/tacos-messicani-con-carne-di-manzo-in-salsa-di-pomodoro-e-salsa_2829-14180.jpg?t=st=1733333617~exp=1733337217~hmac=70120fdc69da74204ae87fa3a25d6df940907b9263d65d6f6c667d681a3ac5f1&w=2000"
            class="d-block w-100"
            alt="tacos">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/vista-dall-alto-gustoso-pesce-cotto-con-verdure-fresche-e-condimenti-sul-tavolo-scuro_140725-143764.jpg?t=st=1733332855~exp=1733336455~hmac=825b27ed78dfe96ad42d18a72bcbb99127a7db2a193e1b84d93f82bbb3cb3005&w=2000"
            class="d-block w-100 rotate-y"
            alt="fish">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/borscht-russo-ucraino-tradizionale-o-minestra-rossa-sulla-ciotola-vista-dall-alto_2829-11970.jpg?t=st=1733332947~exp=1733336547~hmac=2062d4b340ccc20b9af4791d30a0bb44eebe614a5bae056338bb1bc2ac9d41a9&w=2000"
            class="d-block w-100 rotate-y"
            alt="borscht">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/vista-dall-alto-rotolo-di-cannella-e-copia-spazio_23-2148904737.jpg?t=st=1733333187~exp=1733336787~hmac=96752f236b178c9fea8be5103d21af7b6d6df0160dfa8812b1395baee9082f35&w=2000"
            class="d-block w-100"
            alt="breakfast">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/bruschetta-di-salmone-affumicata-con-avocado-e-crema-di-formaggio-servita-con-insalata_140725-1619.jpg?t=st=1733310731~exp=1733314331~hmac=fda1fae013f10bb2654f17f88839c0b90c3a7f1780eee8bde737fcb339660221&w=2000"
            class="d-block w-100"
            alt="bruschetta">
        </div>
        <div class="carousel-item">
          <img src="https://img.freepik.com/foto-gratuito/disposizione-piana-dei-sushi-di-disposizione-con-lo-spazio-della-copia_23-2148224572.jpg?t=st=1733334022~exp=1733337622~hmac=4f182d0018cc95c9d8be20dd8965f0fb8fd57044ea9fb24b4ef97e0fd9ebf7f5&w=2000"
          class="d-block w-100"
          alt="sushi">
        </div>

      </div>

    </div>

  </div>

</template>

<style lang="scss" scoped>
    @use '../assets/scss/main.scss' as *;

    h1{
      font-size: 7rem;
      font-family: "Knewave", system-ui;
    }

    #carousel-container{
      max-width: 100%;
      position: relative;
      height: calc(100vh - 76px);
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(250,250,251,0) 55%);
        z-index: -1;
      }

      #text{
        position: absolute;
        left: 10%
      }

      & #deliveboo{
          position: absolute;
          position: relative;
          z-index: -2;
          height: 100%;
          top: 0;
          left:0;

          img{
            position: absolute;
            width: 100%;
            object-fit: cover;
            object-position: center;
            bottom: 0;
            left:0;
          }
        }

      & #carouselExample{
        position: absolute;
        z-index: -3;
        top: 0;
        left:0;
        height: 100;
        width: 100%;

          .carousel-inner {
            height: 100%;
            display: flex;
            align-items: center;

            .carousel-item{
              height: 100%;

              img{
                height: 100vh;
                // max-height: 100%;
                width: 100%;
                object-fit: cover;
                object-position: center;
              }
        }
        .rotate-y{
            transform: rotateY(180deg)
        }
      }
    }
  }
</style>