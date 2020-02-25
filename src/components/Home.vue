<template>
  <div>
    <v-card
      max-width="1280"
      class="mx-auto"
      v-if="!loading"
    >
      <v-toolbar color="light-blue" dark>
        <v-toolbar-title class="mr-3">
          Телефонный справочник
        </v-toolbar-title>

        <v-text-field     
          class="myInputField" 
          light
          flat
          solo
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          :label="selectValue === 'name' ? 'Поиск по имени' : 'Поиск по дате рождения'"
          v-model="search"
        />

        <v-select
          :items="itemsSelect"
          hide-details
          label="Solo field"
          light
          flat
          solo
          class="mySelect ml-3"
          v-model="selectValue"
        ></v-select>

        <v-spacer></v-spacer>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn 
              icon 
              v-on="on" 
              :disabled="sorting === 'name'"
              @click="sorting = 'name'"
            >
              <v-icon>mdi-sort-alphabetical</v-icon>
            </v-btn>
          </template>
           <span>Сортировка по ФИО</span>
        </v-tooltip>

        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn 
              icon 
              v-on="on" 
              :disabled="sorting === 'date'"
              @click="sorting = 'date'"
            >
              <v-icon>mdi-sort-numeric</v-icon>
            </v-btn>
          </template>
          <span>Сортировка по дате рождения</span>
        </v-tooltip>

      </v-toolbar>

      <v-list two-line subheader v-if="abonentList.length" class="pb-0 mb-3">
        <template 
          v-for="abonent in abonentList"
        >
          <v-list-item       
            :key="abonent.myId"     
            :to="`/abonent/${abonent.myId}`"  
          >
            <v-list-item-avatar>
              <v-img :src="abonent.picture.medium"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ abonent | fullName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ abonent.dob.date | date }}
              </v-list-item-subtitle>
            </v-list-item-content>         
          </v-list-item>

          <v-divider :key="abonent.myId + 1" ></v-divider>
        </template>
      </v-list>

      <h2 class="text-center py-5" v-else>Абоненты не найдены!</h2>
    </v-card>

    <div class="myLoading" v-else>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>  
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'Home',
    data: () => ({
      search: '',
      sorting: 'name',
      itemsSelect: [
        {value: 'name', text: 'По имени'}, 
        {value: 'age', text: 'По дате рождения'}, 
      ],
      selectValue: 'name'      
    }),
    computed: {
      abonentList() {    
        let abonentList = this.$store.getters.abonentList(this.search, this.selectValue)
          .sort((prev, next) => {
            if ( prev.name.first < next.name.first ) return -1;
            if ( prev.name.first < next.name.first ) return 1;
          });

        if(this.sorting === 'date') {
          abonentList = this.$store.getters.abonentList(this.search, this.selectValue)
            .sort((prev, next) => {
              if ( prev.dob.date < next.dob.date ) return -1;
              if ( prev.dob.date < next.dob.date ) return 1;
            }); 
        }

        return abonentList;
      },
      loading() {
        return this.$store.getters.loading;
      } 
    },
    filters: {
      fullName(value) {
        return `${value.name.first} ${value.name.last}`;
      },
      date(value) {
        const myData = new Date(value);
        return myData.toLocaleDateString('ru-Ru') + ' г.р.';
      }
    }
  }
</script>

<style lang="scss" scoped>
  .myInputField {
    background: #fff;
  }

  .myLoading {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mySelect {
    max-width: 210px;
  }
</style>