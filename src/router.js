import { createRouter, createWebHistory } from 'vue-router';
    // createWebHistory = simula una cronologia di navigazione.
import RestaurantsPage from './pages/RestaurantsPage.vue';
import NotFoundPage from './pages/NotFoundpage.vue'
import SingleRestaurantPage from './pages/SingleRestaurantPage.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'restaurants',
            component: RestaurantsPage
        },
        {
            path: '/:slug',
            name: 'restaurant-show',
            component: SingleRestaurantPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
});

export { router };