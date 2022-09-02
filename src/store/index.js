import {createStore} from 'vuex'

import axios from 'axios'
export default new createStore({
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
        async agregarAlCarrito(context, payload){   
            
            let cantidadCarrito = this.state.carrito.find(i=> i.productoId === payload.id)

            if(cantidadCarrito){
              let cantidadActual = cantidadCarrito.cantidad + 1
              try {
                const agregarArticulo = {
                  cantidad: cantidadActual
                };
                await axios.put(`https://62df4289976ae7460be99a23.mockapi.io/carrito/${cantidadCarrito.id}`, agregarArticulo);
              }
              catch (error) {
                console.log(error);
              }
            }else{
              try {
                const agregarArticulo = {
                  productoId: payload.id,
                  cantidad: 1,
                  tipo_cerveza : payload.tipo_cerveza,
                  imagen: payload.imagen,
                  precio: payload.precio,
                  nombre: payload.nombre,
    
                };
                await axios.post(`https://62df4289976ae7460be99a23.mockapi.io/carrito`, agregarArticulo);
              }
              catch (error) {
                console.log(error);
              }
            }
            context.dispatch('getCarrito');
          },
          async eliminarDelCarrito(context, payload){
              try{
              await axios.delete(`https://62df4289976ae7460be99a23.mockapi.io/carrito/${payload.id}`);
                }catch (error) {
              console.log(error);
                }
                context.dispatch('getCarrito');
          },
        async logOut(context){
            context.commit("logOutUser")
        }
    },
    getters:{
      loggeado: state => state.logged,
      carrito: state => state.carrito,
      detalleProducto : state => state.detalleProducto
    }
})