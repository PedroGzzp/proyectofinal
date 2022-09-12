<template>

  <section class="carrito-page">
    <h1>Carrito</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-8" v-if="VuexCarrito.length">
          <div class="item-carrito" v-for="(carrito, index) in VuexCarrito" :key="index">
            <div><img :src="carrito.imagen" :alt="carrito.nombre"></div>
            <div class="text-start">
              Artículo: 
              <h5>{{carrito.nombre}}</h5>
              <p>{{carrito.tipo_cerveza}}</p>
            </div>
            <div>
            Pecio unitario: <h5>${{carrito.precio}}</h5>
            Cantidad: <p>{{total}}</p>
            </div>
            <div>Importe: <h5>$ {{importe(carrito)}}</h5></div>
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
import {mapGetters} from 'vuex'
  export default  {
    name: 'cart-page',
    props: [],
    async mounted () {
      this.nombreUsuario = this.$store.state.logged.nombre
    },
    data () {
      return {
        precioTotal: 0,
      }
    },
    methods: {
      importe(payload){
        return payload.precio * payload.cantidad
      },
      eliminarDelCarrito(payload){
        let text = "¿Estas seguro de eliminar este articulo del carrito?";
        if (confirm(text) == true) {
          this.$store.dispatch("eliminarDelCarrito",payload)
          this.$store.dispatch("getCarrito")
        }
      },
      sumar(payload){
        if(payload.cantidad < 10)
        this.$store.dispatch("sumarCantidad",payload)
      },
      restar(payload){
        if(payload.cantidad > 1)
        this.$store.dispatch("restarrCantidad",payload)
      }
    },
    computed: {
      total(){
        return this.VuexCarrito.reduce((acc, carrito) => {
          return acc + (carrito.precio * carrito.cantidad)
        }, 0)
      },
      ...mapGetters({
        VuexCarrito : 'carrito'
      })
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
.btn{
    color: var(--bs-btn-hover-color);
    background-color: var(--bs-btn-hover-bg);
    border-color: var(--bs-btn-hover-border-color);
}
.cantidad{}
</style>
