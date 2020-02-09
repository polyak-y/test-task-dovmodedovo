<template>
  <v-container
    class="fill-height"
    fluid
    v-if="currentAbonent"
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <CoolLightBox 
          :items="[currentAbonent.picture.large]" 
          :index="index"
          @close="index = null">
        </CoolLightBox>

        <v-card
          class="mx-auto"
          max-width="400"
        >
          <v-img
            @click="index = 0"
            class="white--text align-end imageAbonent"
             height="300px"
            :src="currentAbonent.picture.large"
          >
          </v-img>
          <v-card-text class="text--primary">
            <p class="dataAbonent"><strong>Name:</strong> {{ currentAbonent.name.first }}</p>
            <p class="dataAbonent"><strong>Surname:</strong> {{ currentAbonent.name.last }}</p>
            <p class="dataAbonent"><strong>Pone:</strong> {{ currentAbonent.phone }}</p>
            <p class="dataAbonent"><strong>Email:</strong> {{ currentAbonent.email }}</p>      
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text outlined  class="myButton" to="/">
              Вернуться к списку
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CoolLightBox from 'vue-cool-lightbox';

  export default {
    props: ['id'],
    data: () => ({
      index: null
    }),
    components: {
      CoolLightBox,
    },
    computed: {
      currentAbonent() {       
        return this.$store.getters.currentAbonent(this.id);
      }
    },
    mounted() {
      if(!this.currentAbonent) {
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="scss">
  .dataAbonent {
    font-size: 15px;

    strong {
      font-size: 16px;
    }
  }
  .myButton {
    text-transform: none;
    letter-spacing: 0.5px;
  }

  .imageAbonent {
    cursor: zoom-in;
  }

  .cool-lightbox .cool-lightbox__slide img  {
    width: 30%;
    height: auto;
    max-height: none!important;
  }

  .cool-lightbox__navigation {
    display: none;
  }

  .cool-lightbox-toolbar button:not(:last-child) {
    display: none;
  }
</style>