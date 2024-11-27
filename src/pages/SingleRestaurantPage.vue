<script>
    // axios
    import axios from 'axios';

    import SingleRestaurantNavbar from './SingleRestaurantNavbar.vue';

    export default {
        data() {
        return { 
                defaultUrl: 'http://127.0.0.1:8000/api/restaurants',
                restaurant: null
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
                });
            },
        
        }
    }
</script>


<template>

    <SingleRestaurantNavbar />

    <div class="container" v-if="restaurant != null">
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

                <div class="card mb-4">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">An item</li>
                        <li class="list-group-item">A second item</li>
                        <li class="list-group-item">A third item</li>
                    </ul>
                </div>

                <button type="button" class="btn btn-warning" data-bs-dismiss="offcanvas" aria-label="Close">
                    Concludi l'ordine
                </button>
            </div>
        </div>

        <!-- card piatti -->
        <div class="row">

            <div class="col-sm-12 col-md-6 col-lg-3 mb-4 d-flex" v-for="menu_item in restaurant.menu_items" :key="menu_item.id">

                <!-- shadow-sm -->
                <div class="card rounded-top-5 p-2 align-self-stretch flex-grow-1">
                    <img class="card-img-top rounded rounded-top-5" :src="menu_item.image" :alt="menu_item.item_name">

                    <div class="card-body text-center">
                        <h6 class="card-title mb-3 fw-bold">{{ menu_item.item_name }}</h6>
                    </div>

                    <div>
                        <button class="btn btn-outline-warning text-black rounded-pill mb-3">
                            Aggiungi al carrello
                        </button>
                    </div>

                </div>

            </div>
        </div>
    </div>

</template>

<style lang="scss">
 
</style>