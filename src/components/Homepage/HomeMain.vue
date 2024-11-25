<script>
    //store
        import { store } from '../../store.js';

    // axios
    import axios from 'axios';

  export default {
    data() {
      return { 
        restaurants:[],
        store,
        src: 'https://img.freepik.com/foto-gratuito/casseruola-deliziosa-su-un-supporto-di-legno_140725-949.jpg?t=st=1732115219~exp=1732118819~hmac=a770c4e44b39756dc35b8e695723d986b23128123c95a768703d5215ea5b9dfe&w=1380'
      }
    },
    mounted(){
        this.getRestaurants();
        // this.getRestaurantSlug();
    },
    methods: {
    //   getRestaurantSlug(){
    //     axios
    //         .get('http://127.0.0.1:8000/api/restaurants' + '/' + this.slug)
    //         .then(res => {
    //             this.restaurants = res.data.data.restaurants.data;
    //             console.log(this.slug)
    //         });
    //   }, 
      getRestaurants(){
        axios
            .get('http://127.0.0.1:8000/api/restaurants')
            .then(res => {
                this.restaurants = res.data.data.restaurants.data;
                console.log(this.restaurants)
            });
      },
    }
  }
</script>

<template>

  <div>
   
    <main id="main">

        <!-- <button>
            <a class="nav-link" :href="getRestaurantSlug()">
                <i class="fa-solid fa-house text-warning me-2"></i>
                vai alla tua dashboard
            </a>
        </button> -->

        <div class="container mt-5">

          <div class="row">

            <div class="col-3 mb-4 d-flex" v-for="restaurant in restaurants" :key="restaurant.id">

              <!-- shadow-sm -->
              <div class="card rounded-top-5 p-2 align-self-stretch">
                <!-- <img class="card-img-top rounded rounded-top-5" :src="src" :alt="article.title"> -->
                <img class="card-img-top rounded rounded-top-5" :src="restaurant.img" :alt="restaurant.restaurant_name">

                <div class="card-body text-center">
                    <h6 class="card-title mb-3">{{ restaurant.restaurant_name }}</h6>

                    <div class="mb-3">
                        <span v-for="typology in restaurant.typologies" :key="typology.id" class="badge rounded-pill text-bg-warning mb-2 mx-2">
                            {{ typology.typology_name }}
                        </span>
                    </div>

                    <a href="#" class="btn btn-outline-warning text-black rounded-pill">
                        Menu
                    </a>
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