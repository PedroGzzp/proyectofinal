<template>

  <section class="carrito-page">
    <h1>Carrito</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-8" v-if="listaCarrito.length">
          <div class="item-carrito" v-for="(carrito, index) in listaCarrito" :key="index">
            <div><img :src="carrito.imagen" :alt="carrito.nombre"></div>
            <div class="text-start">
              Artículo: 
              <h5>{{carrito.nombre}}</h5>
              <p>{{carrito.tipo_cerveza}}</p>
            </div>
            <div>
            Pecio unitario: <h5>{{carrito.precio}}</h5>
            Cantidad: <h5>{{carrito.cantidad}}</h5>
            </div>
            <div>Importe: <h5>$ {{importe(carrito)}}</h5></div>
            <div class="quitar_carrito">
            <button type="button" class="btn btn-danger" @click="eliminarDelCarrito(carrito)">Eliminar del carrito</button></div>
          </div>
          <div class="precio-total">
            <div class="texto-total"><p><b>Total:</b></p></div>
            <div class="total"><h3>$ {{total}}</h3></div>
          </div>
        </div>
        <div class="col-sm-12 col-md-8 col-lg-8" v-else><h2>Carrito vacío :(</h2></div>
      </div>
    </div>

  </section>

</template>

<script>
  import axios from 'axios'
  export default  {
    name: 'cart-page',
    props: [],
    async mounted () {
      this.nombreUsuario = this.$store.state.logged.nombre
      if(!this.$store.state.logged.id){
        this.$router.push("login")
      }
      try{
          const respuestaCarrito = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/carrito`);
          this.listaCarrito = respuestaCarrito.data
        }
        catch (error) {
            console.log(error);
        }
    },
    data () {
      return {
        listaCarrito:[],
        precioTotal: 0,
      }
    },
    methods: {
      importe(payload){
        return payload.precio * payload.cantidad
      },
      async eliminarDelCarrito(payload){
        let text = "¿Estas seguro de eliminar este articulo del carrito?";
        if (confirm(text) == true) {
          try{
          await axios.delete(`https://62df4289976ae7460be99a23.mockapi.io/carrito/${payload.id}`);
          this.actualizarDatos()
        }catch (error) {
          console.log(error);
        }
        }
      },
      async actualizarDatos(){
        try{
            const respuestaCarrito = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/carrito`);
            this.listaCarrito = respuestaCarrito.data
          }
          catch (error) {
              console.log(error);
          }
      }
    },
    computed: {
      total(){
        return this.listaCarrito.reduce((acc, carrito) => {
          return acc + (carrito.precio * carrito.cantidad)
        }, 0)
      }
    }
}


</script>

<style scoped>
.item-carrito{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    padding-bottom: 5px;
    margin-bottom: 15px;
    border-bottom: solid 1px #cccccc;
}
.item-carrito img{
  max-width: 100px;
}

.precio-total{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, 1fr);
}
.texto-total{
  grid-column: 3;
  text-align: right;
}
.total{
  grid-column: 4;
}
.quitar_carrito{
  grid-column: 1 / span 4;
  text-align: right;
}
</style>
