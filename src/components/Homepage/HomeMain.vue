<script>
  //store
      import { store } from '../../store.js';

  /* 
    Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
    1) Importazione del componente
    2) Dichiarazione del componente
    3) Utilizzo del componente
  */
  // 1) Importazione del componente

  export default {
    data() {
      return { 
        store,
        src: 'https://img.freepik.com/foto-gratuito/casseruola-deliziosa-su-un-supporto-di-legno_140725-949.jpg?t=st=1732115219~exp=1732118819~hmac=a770c4e44b39756dc35b8e695723d986b23128123c95a768703d5215ea5b9dfe&w=1380'
      }
    },
    // 2) Dichiarazione del componente
    components: {

    },
    methods: {
      
    }
  }
</script>

<template>

  <div>
   
    <main id="main">

        <div class="container mt-5">

          <div class="row">

            <div class="col-3 mb-4" v-for="(article, i) in store.articlesInfo" :key="i">

              <!-- shadow-sm -->
              <div class="card rounded-top-5 p-2 ">
                <img class="card-img-top rounded rounded-top-5" :src="src" :alt="article.title">
                <!-- <img :src="article.photo" class="card-img-top" :alt="article.title"> -->

                <div class="card-body text-center">
                  <h6 class="card-title mb-3">{{ article.title }}</h6>
                  <a href="#" class="btn btn-outline-warning text-black rounded-pill">Menu</a>
                </div>

              </div>

            </div>

          </div>

        </div>

    </main>

  </div>

</template>

<style lang="scss">
  @use '../../assets/scss/main.scss' as *;
  // Import all of Bootstrap's CSS
  @import "bootstrap/scss/bootstrap";

  .card{
    box-shadow: 0 0 5px rgba(14, 14, 14, 0.2); 
    transition: box-shadow .3s;
    & img{
      height: 150px;
      object-fit: cover;
    }
  }
  .card:hover{
    border: 1px solid rgb(255, 206, 30);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.503); 
  }

  // .container {
  //   padding-top: 20px;
  //   .carousel {
  //     margin: 0 auto;
  //     .carousel-inner {
  //       .carousel-item {
  //         img {
  //           width: 70%;
  //           height: 300px;
  //           object-fit: cover;
  //           object-position: 0%;
  //         }
  //       }
  //     }
  //   }
  // }
</style>