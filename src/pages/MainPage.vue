<template>

  <section class="welcome-page">
    <h1>Hola {{nombreUsuario}}</h1>
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-10 col-lg-12">
            <h2 class="text-start">Todas las Cervezas</h2>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-sm-12 col-md-10 col-lg-12">
            <div class="productos">
              <ul>
              <li v-for="(items, index) in listaInventario" :key="index">
                <div class="card">
                  <img @click="infoProducto(items.id)" :src="items.imagen" class="card-img-top" :alt="items.nombre">
                  <div class="card-body">
                    <p class="card-text nombre-producto">{{items.nombre}}</p>
                    <p class="card-text">${{items.precio}}</p>
                    <a href="#" class="btn btn-primary" @click="agregarAlCarrito(items)">Agregar al carrito</a>
                  </div>
                </div>
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="alertaCarrito" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              <p>Artículo agregado al carrito.</p>
            </div>
            <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </section>

</template>

<script>
  import axios from 'axios'
  export default  {
    name: 'main-page',
    props: [],
    mounted () {
      this.nombreUsuario = this.$store.state.logged.nombre
      if(!this.nombreUsuario){
        this.$router.push("login")
      }
      // this.$store.dispatch("getProductos")
      this.listaInventario = this.$store.state.listaProductos
    },
    data () {
      return {
        nombreUsuario: "",
        listaInventario: [],
        cantidad: 0
      }
    },
    methods: {
      async agregarAlCarrito(payload){
        try{
          const respuestaCarrito = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/carrito`);
          this.listaCarrito = respuestaCarrito.data
        }
        catch (error) {
            console.log(error);
        }

        let cantidadCarrito = this.listaCarrito.find(i=> i.productoId === payload.id)

        if(cantidadCarrito){
          console.log(cantidadCarrito.id)
          this.cantidad = cantidadCarrito.cantidad + 1
          try {
            const agregarArticulo = {
              cantidad: this.cantidad
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
        // eslint-disable-next-line
        $('#alertaCarrito').toast('show')
      },
      infoProducto(payload){
        this.$store.dispatch("getDetalleProducto", payload)
        // localStorage.setItem("articulo", payload)
        this.$router.push('details')
      }
    },
    computed: {

    }
}


</script>

<style scoped>
ul{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    padding: 0;
    list-style: none;
    column-gap: var(--grid-desktop-horizontal);
    row-gap: var(--grid-desktop-vertical);
}
.nombre-producto{
  font-family: 'Oswald', sans-serif;
  white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.card-img-top{
  max-width: 150px;
  margin: 0 auto;
  cursor: pointer;
}
li{
  width: 100%;
  max-width: 250px;
}
.card{
  transition: all 0.1s linear;
}
.card:hover{
  box-shadow: 0px 5px 5px #cccccc;
  transform: translateY(-5px);
}
.grid-imagen{
  grid-column: 1;
  grid-row: 2;
}
.grid-detalles{
  grid-column: 1;
  grid-row: 21;
}
td.active{
  background-color: #f0f0f0 !important;
}
#alertaCarrito{
  background-color: rgb(38 173 110 / 90%);
}
.toast-body p{
  margin: 0;
  font-size: 18px;
  color: #ffffff;
}
.btn-close{
  background-color: #ffffff;
}
@media screen and (min-width: 500px) and (max-width: 768px){
li{
  max-width: 200px;
}
}
@media screen and (max-width: 500px){
ul{
  padding-left: 0!important;
  column-gap: var(--grid-mobile-horizontal);
  row-gap: var(--grid-mobile-vertical);
}
li {
  flex-grow: 1;
    width: calc(50% - var(--grid-mobile-horizontal) / 2);
    max-width: calc(50% - var(--grid-mobile-horizontal) / 2);
}
.card-img-top{
  max-width: 90px;
}
.card:hover{
  box-shadow: none;
  transform: none;
}
}
</style>
