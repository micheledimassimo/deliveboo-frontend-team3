<script>
/* 
  Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
  1) Importazione del componente
  2) Dichiarazione del componente
  3) Utilizzo del componente
*/
// 1) Importazione del componente
import HomeMain from './components/Homepage/HomeMain.vue';
import HomeFooter from './pages/HomeFooter.vue';

export default {
  data() {
    return { 
      cart: [],
    }
  },
  // 2) Dichiarazione del componente
  components: {
    HomeMain,
    HomeFooter
  },
  methods: {

  }
}
</script>

<template>

  <div>
    <!-- 3) Utilizzo del componente -->
    <HomeMain />
    <HomeFooter />
  </div>

</template>

<style lang="scss">
  @use 'assets/scss/main' as *;
  // Import all of Bootstrap's CSS
  @import "bootstrap/scss/bootstrap";
</style>
