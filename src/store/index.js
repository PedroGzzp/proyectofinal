import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)
import axios from 'axios'
export default new Vuex.Store({
    state:{
        carrito: [],
        listaUsuarios: [],
        listaProductos: [],
        detalleProducto: [],
        logged: []
    },
    mutations:{
        traerUsuarios: (state, payload) => {
            state.listaUsuarios = payload
        },
        traerProductos: (state, payload) => {
            state.listaProductos = payload
        },
        traerCarrito: (state, payload) => {
            state.carrito = payload
        },
        detalleProducto: (state, payload) => {
            state.detalleProducto = payload
        },
        usuarioLoggeado: (state, payload) => {
            state.logged = payload
        },
        logOutUser: (state) => {
            state.carrito = [],
            state.listaProductos = [],
            state.logged = []
        }
    },
    actions: {
        async getUsuarios({ commit }) {
            try{
                const respuestaUsuarios = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/usuarios`);
                commit('traerUsuarios', respuestaUsuarios.data);
            }
            catch (error) {
                console.log(error);
            }
        },
        async getProductos({ commit }) {
            try{
                const respuestaProductos = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/inventario`);
                commit('traerProductos', respuestaProductos.data);
            }
            catch (error) {
                console.log(error);
            }
        },
        async getCarrito({ commit }) {
            try{
                const respuestaCarrito = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/carrito`);
                commit('traerCarrito', respuestaCarrito.data);
            }
            catch (error) {
                console.log(error);
            }
        },
        async getDetalleProducto(context, payload) {
            try{
                const respuestaDetalleProducto = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/inventario/${payload}`);
                context.commit('detalleProducto', respuestaDetalleProducto.data);
            }
            catch (error) {
                console.log(error);
            }
        },
        async setUsuario(context, payload){
            try {
                await axios.post(`https://62df4289976ae7460be99a23.mockapi.io/usuarios`, payload);
                context.dispatch('getUsuarios');
              }
              catch (error) {
                console.log(error);
              }
        },
        async setArticulo(context, payload){
            try {
                await axios.post(`https://62df4289976ae7460be99a23.mockapi.io/inventario`, payload);
                context.dispatch('getProductos');
              }
              catch (error) {
                console.log(error);
              }
        },
        async deleteUsuario(context, payload){
            try {
                await axios.post(`https://62df4289976ae7460be99a23.mockapi.io/usuarios/${payload}`);
                context.dispatch('getUsuarios');
              }
              catch (error) {
                console.log(error);
              }
        },
        logOut(context){
            context.commit("logOutUser")
        }
    }
})