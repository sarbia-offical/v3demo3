import { createStore, createLogger } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import state from './state';
let debug = process.env.NODE_ENV !== 'production';
export default createStore({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
