<template>

  <section class="carrito-page">
    <h1>Carrito</h1>
    <hr>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-8 col-lg-8 mb-60" v-if="VuexCarrito.length">
          <div class="item-carrito" v-for="(carrito, index) in VuexCarrito" :key="index">
            <div><img :src="carrito.imagen" :alt="carrito.nombre"></div>
            <div class="text-start">
              Artículo: 
              <h5>{{carrito.nombre}}</h5>
              <p>{{carrito.tipo_cerveza}}</p>
            </div>
            <div>
            Pecio unitario: <h5>${{carrito.precio}}</h5>
            Cantidad:
            <div class="center">
              <p>
                </p><div class="input-group">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default btn-number" data-type="minus" data-field="quant[1]" @click="restar(carrito)">
                            <span class="glyphicon glyphicon-minus">-</span>
                        </button>
                    </span>
                    <input type="text" name="quant[1]" class="form-control input-number cantidad" v-model="carrito.cantidad" min="1" max="10">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]" @click="sumar(carrito)">
                            <span class="glyphicon glyphicon-plus">+</span>
                        </button>
                    </span>
                </div>
              <p></p>
          </div>
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
        <div v-if="VuexCarrito.length">
        <hr>

        <h2>Dirección de entrega</h2>
        <div class="container">
          <form class="row justify-content-center">
          <div class="col-sm-12 col-md-8">
            <div class="row text-start">
              <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="nombre">
              </div>
              <div class="col-md-6">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="phone" class="form-control" id="telefono">
              </div>
              <br><br>
              <div class="col-12">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion" placeholder="1234 Calle Principal">
              </div>
              <br><br>
              <div class="col-md-6">
                <label for="tipoinmueble" class="form-label">Tipo inmueble</label>
                <input type="text" class="form-control" id="tipoinmueble" placeholder="Departamento, casa, oficina">
              </div>
              <div class="col-md-6">
                <label for="entrecalles" class="form-label">Entrecalles</label>
                <input type="text" class="form-control" id="entrecalles" placeholder="Calle Tercera y Calle Cuarta">
              </div>
              <br><br>
              <div class="col-md-6">
                <label for="ciudad" class="form-label">Ciudad</label>
                <input type="text" class="form-control" id="ciudad">
              </div>
              <div class="col-md-6">
                <label for="estado" class="form-label">Estado</label>
                <input type="text" class="form-control" id="estado">
              </div>
              <br><br>
              <div class="col-md-2">
                <label for="codigopostal" class="form-label">Código postal</label>
                <input type="text" class="form-control" id="codigopostal">
              </div>
              <br><br>
              <div class="col-12 text-end">
                <a class="btn btn-primary" @click="enviarPedido()">Enviar pedido</a>
              </div>
            </div>
          </div>
            
          </form>
        </div>
        </div>
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
      },
      enviarPedido(){
        const pedido = {
                orden: this.VuexCarrito,
                total: this.total,
                usuario: this.$store.state.logged.id  
        }
        this.$store.dispatch("enviarPedido",pedido)
        alert("Pedido Enviado correctamente ¡Muchas gracias!")
        this.$router.push("main")
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
.mb-60{
  margin-bottom: 60px;
}
</style>
