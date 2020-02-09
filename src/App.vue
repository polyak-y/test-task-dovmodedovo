<template>
  <v-app>
    <v-content>
      <transition appear mode="out-in">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.dispatch('fetchAbonentList');
    }  
  };
</script>

<style lang="scss" scoped>
  .v-enter-active, .v-leave-active {
    transition: opacity .5s;
  }

  .v-enter, .v-leave-to {
    opacity: 0;
  }
</style>
