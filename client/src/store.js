import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn : false
  },
  mutations : {
    toggleLoggedIn (state) {
      state.loggedIn = !state.loggedIn;
    },
    initLogggedIn (state) {
      if (localStorage.getItem("jwt_token")) {
        // console.log(localStorage.getItem("jwt_token"));
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    }
  },
  actions : {
    toggle ({commit}) {
      commit("toggleLoggedIn");
    },
    init ({commit}) {
      commit("initLogggedIn");
    }
  },
  getters : {
    isLoggedIn (state) {
      return state.loggedIn;
    }
  }
});
