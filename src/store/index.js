import { createStore } from 'vuex'
export default createStore({
  state: {
    invoiceModal: null,
    modal: null
  },
  mutations: {
    TOGGLE_INVOICE(state){
      state.invoiceModal =!state.invoiceModal
    },
    TOGGLE_MODAL(state){
      state.modal =!state.modal
    },

  },
  actions: {
  },
  modules: {
  }
})