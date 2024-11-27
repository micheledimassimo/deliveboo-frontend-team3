<script>
    // axios
    import axios from 'axios';

    import HomeHeader from './HomeHeader.vue';

    export default {
      data() {
        return { 
                restaurants:[],
                typologies:[],
                selectedTypology:'',
                prevPage: null,
                nextPage: null,
                clickedButton: false,
                src: 'https://img.freepik.com/foto-gratuito/casseruola-deliziosa-su-un-supporto-di-legno_140725-949.jpg?t=st=1732115219~exp=1732118819~hmac=a770c4e44b39756dc35b8e695723d986b23128123c95a768703d5215ea5b9dfe&w=1380'
            }
        },
        components: {
            HomeHeader,
        },
        mounted(){
            this.getTypologies();
            this.getRestaurants();
        },
        methods: {
            getTypologies(){
                axios.get('http://127.0.0.1:8000/api/typologies')
                    .then(res => {
                        this.typologies = res.data.data.typologies;
                    });
            },
            getRestaurants(){
                axios
                    .get('http://127.0.0.1:8000/api/restaurants',{

                        params:{

                            typology_name:this.selectedTypology

                        }
                    })
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
            filterByTypology() {
                this.getRestaurants(this.selectedTypology);
            },
            ToPrevPage(){
                this.clickedButton = true;
                axios
                    .get(this.prevPage,{

                        params:{

                            typology_name:this.selectedTypology

                        }

                    })
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
                    .get(this.nextPage,{
                        params:{

                            typology_name:this.selectedTypology

                        }
                    })
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

    <HomeHeader />
  
  <main id="main">

    <div class="container-sm mt-5">
        <div class="text-start my-4 mx-2">
            <h3>
                Dai un'occhiata <span class="text-warning">ad alcuni ristoranti</span>
            </h3>
        </div>

        <div class="ms-2 mb-3">
                
                
        <div class="form-floating w-100">
                    
                    
            <select  id="typologyFilter" v-model="selectedTypology" class="form-select w-25 h-10 " @change="filterByTypology" aria-label="Floating label select example">
                
                <option value="">Tutte le tipologie</option>
                
                <option v-for="(typology,i) in typologies" :key="i" :value="typology.typology_name">
                    
                    {{ typology.typology_name }}
                
                </option>
                        
            </select>

            <label for="select">Seleziona tipologia</label>

        </div>


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
                    <button @click="ToPrevPage()"
                        :disabled="prevPage == null || clickedButton"
                        class="btn btn-outline-warning rounded-circle mx-2"
                        type="button">
                        <i class="fa-solid fa-chevron-left"></i>
                    </button>
                </div>
                <div>
                    <button @click="ToNextPage()"
                        :disabled="nextPage == null || clickedButton"
                        class="btn btn-outline-warning rounded-circle mx-2"
                        type="button">
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
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

</style>