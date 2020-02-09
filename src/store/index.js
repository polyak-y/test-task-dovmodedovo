import Vue  from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    abonentList: [],
    loading: false,
  },
  getters: {
    abonentList(state) {
      return (search, selectValue) => {
        return state.abonentList.filter(element => {         
          const fio = `${element.name.first} ${element.name.last}`.toLowerCase();
          const birthdate = new Date(element.dob.date).toLocaleDateString('ru-RU');                 
          if(!search) return true;
          if((selectValue === 'name' ? fio : birthdate).includes(search.trim().toLowerCase())) return true;
        })
      }      
    },
    currentAbonent(state) {
      return (id) => {        
         return state.abonentList.find(abonent => abonent.myId.toString() === id);
      }     
    },
    loading(state) {
      return state.loading
    }
  },
  mutations: {
    addAbonentList(state, payload) {
      state.abonentList = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    }
  },
  actions: {
    async fetchAbonentList({ commit }) {
      commit('setLoading', true)

      try{
        const res = await fetch('https://randomuser.me/api/?results=10');
        const data = await res.json();

        data.results.forEach(element => {
            element.myId = Math.floor(Math.random() * 100000)
        });

        commit('addAbonentList', data.results);
        commit('setLoading', false)
      } catch(err) {
        commit('setLoading', false)
        console.log(err)
      }         
    }
  },
});
