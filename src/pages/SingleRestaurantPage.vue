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
    </div>

</template>

<style lang="scss">
 
</style>