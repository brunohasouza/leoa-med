import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    postosDeSaude: [],
    remediosDeUmPosto: [],
    remedios: [],
    usuario: window.localStorage.getItem('leoa-usuario')
  },
  getters: {
    getPostos: state => state.postosDeSaude,
    getRemediosPosto: state => state.remediosDeUmPosto,
    getRemedios: state => state.remedios,
    getUsuario: state => state.usuario,
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
        let json = [];
        //Monta o json
        db.collection("postos")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                json.push(doc.data())
            });
            commit('SET_POSTOS', json)
            resolve()
        })
      })
    },

    // action que recebe o id do posto e lista os seus remédios
    actionListarRemediosPosto: ({ commit }, payload) => {
      let json = []
      db.collection("postos")
        .doc(payload.postoId)
        .collection('remedios')
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              json.push(doc.data())
            });
            commit('SET_REMEDIOS_POSTO', json)
        })
      

      
    },

    // action que recebe o id do posto e id do remédio e os remove do banco
    // chama actionListarRemediosPosto para atualizar a lista de remédios no front
    actionRemoverRemedioPosto: ({ dispatch }, payload) => {
      db.collection("postos")
      .doc(payload.postoId)
      .collection('remedios')
      .doc(String(payload.remedioId))
      .delete()
      dispatch('actionListarRemediosPosto', { postoId: payload.postoId })
    },
    
    // action que recebe email e senha para fazer login no sistema
    // retorna usuário e armazena ele no localStorage
    actionLogin: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        db.collection("usuarios").where("email", "==", payload.email).where("senha", "==", payload.password)
        .get()
        .then(function(querySnapshot) {
            if(querySnapshot.empty == true){
              reject()
            } else {
              commit('SET_USUARIO', querySnapshot.docs[0].data().nome)
              window.localStorage.setItem('leoa-usuario', querySnapshot.docs[0].data().nome)
              resolve()
            }
        })
        
      })
    },

    // action que recebe email, nome e senha do usuário e adiciona-o ao banco
    actionCadastro: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        const ref = db.collection('usuarios').doc();
        const id = ref.id;
        db.collection("usuarios")
        .doc(id)
        .set({
            usuarioId: id,
            email: payload.email,
            nome : payload.nome,
            senha: payload.senha,
        })
        resolve()
      })
    },

    // action que limpa o localStorage, faz logout e manda usuário pra tela de login
    actionLogout: ({ commit }) => {
      return new Promise((resolve, reject) => {
        commit('SET_USUARIO', null)
        window.localStorage.removeItem('leoa-usuario')
        resolve()
      })
    },

    // action que recebe o id de um posto e um array de remedios, 
    // adiciona a lista de remédios ao posto e
    // chama actionListarRemediosPosto para atualizar a lista de remédios no front
    actionAdicionarRemedio: ({ dispatch , getters }, payload) => {
      return new Promise((resolve, reject) => {
        payload.remedios.forEach(function(doc) {
            let remedio = getters.getRemedios[doc]
            db.collection("postos")
            .doc(payload.postoId)
            .collection('remedios')
            .doc(String(doc))
            .set({
                REGISTRO: remedio.REGISTRO,
                PRODUTO : remedio.PRODUTO,
                SUBSTANCIA: remedio.SUBSTANCIA,
                LABORATORIO: remedio.FABRICANTE,
                TARJA: remedio.TARJA,
                objectId: String(doc)
            })
        });        
        dispatch('actionListarRemediosPosto', { postoId: payload.postoId })
        resolve()
      })
    },

    // action que lista todos os remédios registrados no sistema
    actionListarTodosRemedios: ({ commit }) => {
      let json = []
      db.collection("remedios")
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                json.push(doc.data())
            });
            commit('SET_REMEDIOS', json)
        })
      
    }
  },
})
