<script>
    // axios
    import axios from 'axios';

    import SingleRestaurantNavbar from './SingleRestaurantNavbar.vue';

    export default {
        data() {
            return { 
                    defaultUrl: 'http://127.0.0.1:8000/api/restaurants',
                    restaurant: null,
                    src: 'https://img.freepik.com/foto-gratuito/casseruola-deliziosa-su-un-supporto-di-legno_140725-949.jpg?t=st=1732115219~exp=1732118819~hmac=a770c4e44b39756dc35b8e695723d986b23128123c95a768703d5215ea5b9dfe&w=1380',
                    is_visible: true,
                    cart: []
                }
        },
        components: {
            SingleRestaurantNavbar,
        },
        mounted(){
            this.getSingleRestaurant();
        },
        methods: {
            getSingleRestaurant(){
                axios
                    .get(this.defaultUrl + '/' + this.$route.params.slug)
                    .then(res => {

                        this.restaurant = res.data.data.restaurant;

                        this.restaurant.menu_items.forEach(menu_item => {
                            if (menu_item.image) {
                                menu_item.image = `http://127.0.0.1:8000/storage/${menu_item.image}`;
                            } else {
                                menu_item.image = this.src;
                            }
                    });
                });
            },
            addToCart(menu_item) {
            // Cerca il piatto nel carrello
            const cartItem = this.cart.find(item => item.id === menu_item.id);

            if (cartItem) {
                // Incrementa la quantità se il piatto è già presente
                cartItem.quantity += 1;
            } else {
                // Aggiungi il piatto al carrello con quantità iniziale 1
                this.cart.push({ ...menu_item, quantity: 1 });
            }
          }     
        }
    }
</script>


<template>

    <SingleRestaurantNavbar />

    <div class="container mt-5" v-if="restaurant != null">
        <h1>
            {{ restaurant.restaurant_name }}
        </h1>

        <!-- offcanvas carrello -->
        <div class="offcanvas offcanvas-end" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            
            <div class="offcanvas-header">
              <h4 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Carrello</h4>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                <p>Ecco i dettagli del tuo ordine</p>

                <div v-if="cart.length === 0">
                    <p>Il carrello è vuoto.</p>
                </div>

                <div v-else>
                    <div class="card mb-4">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in cart" :key="index">
                                <div>
                                    <strong>{{ item.item_name }}</strong> - {{ item.price }} €
                                </div>
                                <div>
                                    x{{ item.quantity }} 
                                    <span class="badge bg-secondary ms-2">{{ (item.price * item.quantity).toFixed(2) }} €</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <button type="button" class="btn btn-warning" data-bs-dismiss="offcanvas" aria-label="Close">
                        Concludi l'ordine
                    </button>
                </div>
            </div>
        </div>

        <!-- card piatti -->
        <div class="row">

            <div class="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex" v-for="menu_item in restaurant.menu_items.filter(item => item.is_visible)" :key="menu_item.id">

                <!-- shadow-sm -->
                <div id="menuitem" class="card rounded-top-5 p-2 align-self-stretch flex-grow-1">

                    <img :src="menu_item.image" class="rounded-circle border border-dark-subtle border-1 shadow-sm" :alt="menu_item.item_name">

                    <!-- <img class="card-img-top rounded rounded-top-5" :src="menu_item.image" :alt="menu_item.item_name"> -->

                    <div class="card-body text-center">
                        <h6 class="card-title mb-2 fw-bold">{{ menu_item.item_name }}</h6>
                        <p class="mb-2">{{ menu_item.description }}</p>
                    </div>
                    <div class="d-flex align-items-center justify-content-evenly mb-2">
                        <div class="badge rounded-pill text-bg-warning">
                            {{ menu_item.price }} € 
                        </div>

                        <button class="btn btn-outline-warning text-black rounded-pill" @click="addToCart(menu_item)">
                            Aggiungi al carrello
                        </button>
                    </div>

                </div>

            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
//  @use '../../assets/scss/main.scss' as *;
@use '../assets/scss/main.scss' as *;
  // Import all of Bootstrap's CSS
  @import "bootstrap/scss/bootstrap";

  h1{
    margin-bottom: 100px;
  }

  .col-md-6{
    .card{
        margin-bottom: 80px;
    }
  }

  .card{
    box-shadow: 0 0 5px rgba(14, 14, 14, 0.2); 
    transition: box-shadow .3s;
    position: relative;

    & img{
        width: 150px;
        height: 150px;
        object-fit: cover;
        position: absolute;
        text-align: center;
        top: -60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
    }

    & .card-body{
        margin-top: 80px;
    }

  }
   #menuitem:hover{
    border: 1px solid rgb(255, 206, 30);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.503); 
  }
 
</style>