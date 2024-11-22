<script>
/* 
  Per importare ed utilizzare un componente dentro un altro devo SEMPRE seguire questi 3 passi:
  1) Importazione del componente
  2) Dichiarazione del componente
  3) Utilizzo del componente
*/
// 1) Importazione del componente
import HomeHeader from './components/Homepage/HomeHeader.vue';

export default {
  data() {
    return { 
      count: 0
    }
  },
  // 2) Dichiarazione del componente
  components: {
    HomeHeader,
  },
  methods: {
    incrementCount() {
      this.count++;
    }
  }
}
</script>

<template>

  <div>
    <!-- 3) Utilizzo del componente -->
    <HomeHeader />
  </div>

</template>

<style lang="scss">
  @use 'assets/scss/main' as *;
  // Import all of Bootstrap's CSS
  @import "bootstrap/scss/bootstrap";
</style>
