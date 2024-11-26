<script>
    // axios
    import axios from 'axios';

    export default {
      data() {
        return { 
            restaurants:[],
            prevPage: null,
            next: null,
            clickedButton: false,
            src: 'https://img.freepik.com/foto-gratuito/casseruola-deliziosa-su-un-supporto-di-legno_140725-949.jpg?t=st=1732115219~exp=1732118819~hmac=a770c4e44b39756dc35b8e695723d986b23128123c95a768703d5215ea5b9dfe&w=1380'
        }
        },
        mounted(){
            this.getRestaurants();
        },
        methods: {
            getRestaurants(){
                axios
                    .get('http://127.0.0.1:8000/api/restaurants')
                    .then(res => {
                        this.restaurants = res.data.data.restaurants.data;
                        
                        this.restaurants.forEach(restaurant => {
                            if (restaurant.img) {
                                restaurant.img = `http://127.0.0.1:8000/storage/${restaurant.img}`;
                            } else {
                                restaurant.img = this.src;
                            }
                        });
                        
                        this.prevPage = res.data.data.restaurants.prev_page_url;
                        this.nextPage = res.data.data.restaurants.next_page_url;
                    });
            },
            ToPrevPage(){
                this.clickedButton = true;
                axios
                    .get(this.prevPage)
                    .then((res)=>{
                        this.restaurants = res.data.data.restaurants.data;

                        this.restaurants.forEach(restaurant => {
                            if (restaurant.img) {
                                restaurant.img = `http://127.0.0.1:8000/storage/${restaurant.img}`;
                            } else {
                                restaurant.img = this.src;
                            }
                        });
                        
                        this.prevPage = res.data.data.restaurants.prev_page_url;
                        this.nextPage = res.data.data.restaurants.next_page_url;

                        this.clickedButton = false;
                    })
            },
            ToNextPage(){
                this.clickedButton = true;
                axios
                    .get(this.nextPage)
                    .then((res)=>{
                        this.restaurants = res.data.data.restaurants.data;

                        this.restaurants.forEach(restaurant => {
                            if (restaurant.img) {
                                restaurant.img = `http://127.0.0.1:8000/storage/${restaurant.img}`;
                            } else {
                                restaurant.img = this.src;
                            }
                        });
                        
                        this.prevPage = res.data.data.restaurants.prev_page_url;
                        this.nextPage = res.data.data.restaurants.next_page_url;

                        this.clickedButton = false;
                    })
            },
        }
    }
</script>


<template>
  
  <main id="main">

  <!-- <button>
      <a class="nav-link" :href="getRestaurantSlug()">
          <i class="fa-solid fa-house text-warning me-2"></i>
          vai alla tua dashboard
      </a>
  </button> -->

  <div class="container-sm mt-5">
      <div class="text-start my-4 mx-2">
          <h3>
              Dai un'occhiata <span class="text-warning">ad alcuni ristoranti</span>
          </h3>
      </div>
      
      <div class="row" id="restaurants">

          <div class="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex" v-for="restaurant in restaurants" :key="restaurant.id">

              <!-- shadow-sm -->
              <div class="card rounded-top-5 p-2 align-self-stretch flex-grow-1">
                  <img class="card-img-top rounded rounded-top-5" :src="restaurant.img" :alt="restaurant.restaurant_name">

                  <div class="card-body text-center">
                      <h6 class="card-title mb-3 fw-bold">{{ restaurant.restaurant_name }}</h6>

                      <div>
                          <span v-for="typology in restaurant.typologies" :key="typology.id" class="badge rounded-pill text-bg-warning mb-2 mx-1">
                              {{ typology.typology_name }}
                          </span>
                      </div>
                  </div>

                  <div>
                    <router-link class="btn btn-outline-warning text-black rounded-pill mb-3" :to="{ name: 'restaurant-show', params: { slug: restaurant.slug }}">
                        Menu
                    </router-link>
                  </div>

              </div>

          </div>

      </div>

      <!-- bottoni pagine precedenti e successive -->
      <div class="d-flex justify-content-center">
          <div>
              <a @click="ToPrevPage()" href="#restaurants" class="btn btn-outline-warning rounded-circle mx-2">
                  <i class="fa-solid fa-chevron-left"></i>
              </a>
          </div>
          <div>
              <a @click="ToNextPage()" href="#restaurants" class="btn btn-outline-warning rounded-circle mx-2">
                  <i class="fa-solid fa-chevron-right"></i>
              </a>
          </div>
      </div>

  </div>

</main>
  

</template>

<style lang="scss">
//  @use '../../assets/scss/main.scss' as *;
  @use '../assets/scss/main.scss' as *;
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