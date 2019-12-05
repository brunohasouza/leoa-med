import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postosDeSaude: [],
    remediosDeUmPosto: [],
    remedios: [],
    usuario: null
  },
  getters: {
    getPostos: state => state.postosDeSaude,
    getRemediosPosto: state => state.remediosDeUmPosto,
    getRemedios: state => state.remedios,
    getUsuario: state => state.usuerio,
    logado: state => !!state.usuario
  },
  mutations: {
    SET_POSTOS: (state, postos) => {
      state.postosDeSaude = postos
    },
    SET_REMEDIOS_POSTO: (state, remedios) => {
      state.remediosDeUmPosto = remedios
    },
    RESET_REMEDIOS_POSTO: (state) => {
      state.remediosDeUmPosto = []
    },
    SET_REMEDIOS: (state, remedios) => {
      state.remedios = remedios
    },
    SET_USUARIO: (state, usuario) => {
      state.usuario = usuario
    }
  },
  actions: {
    // action que retorna todos os postos de saúde de recife
    actionListarPostos: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit('SET_POSTOS', [])
        resolve()
      })
    },

    // action que recebe o id do posto e lista os seus remédios
    actionListarRemediosPosto: ({ commit }, payload) => {
      commit('SET_REMEDIOS_POSTO', [])
    },

    // action que recebe o id do posto e id do remédio e os remove do banco
    // chama actionListarRemediosPosto para atualizar a lista de remédios no front
    actionRemoverRemedioPosto: ({ dispatch }, payload) => {
      dispatch('actionListarRemediosPosto', { postoId: payload.postoId })
    },
    
    // action que recebe email e senha para fazer login no sistema
    // retorna usuário e armazena ele no localStorage
    actionLogin: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        commit('SET_USUARIO', null)
        resolve()
      })
    },

    // action que recebe email, nome e senha do usuário e adiciona-o ao banco
    actionCadastro: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        resolve()
      })
    },

    // action que limpa o localStorage, faz logout e manda usuário pra tela de login
    actionLogout: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit('SET_USUARIO', null)
        resolve()
      })
    },

    // action que recebe o id de um posto e um array de remedios, 
    // adiciona a lista de remédios ao posto e
    // chama actionListarRemediosPosto para atualizar a lista de remédios no front
    actionAdicionarRemedio: ({ dispatch }, payload) => {
      return new Promise((resolve, reject) => {
        dispatch('actionListarRemediosPosto', { postoId: payload.postoId })
        resolve()
      })
    },

    // action que lista todos os remédios registrados no sistema
    actionListarTodosRemedios: ({ commit }) => {
      commit('SET_REMEDIOS', [])
    }
  },
})
