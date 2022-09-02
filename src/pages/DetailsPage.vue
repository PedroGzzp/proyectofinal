<template>

  <section>
  <div v-if="!cargado" class="loading">
    <div class="loader"></div>
  </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <img class="imagen_cerveza" :src="articulo.imagen" :alt="articulo.nombre">
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <h2>{{articulo.nombre}}</h2>
              <h5>$ {{articulo.precio}}</h5>
              <br>
              <span>Tipo de cerveza:</span>
              <p>{{articulo.tipo_cerveza}}</p>
              <span>País de origen:</span>
              <p>{{articulo.pais}}</p>
              <span>Descripción:</span>
              <p>{{articulo.descripcion}}</p>
              <span>Opinión:</span>
              <p>{{articulo.opinion}} / 5</p>
              <a href="#" class="btn btn-primary" @click="agregarAlCarrito(articulo)">Agregar al carrito</a>
            </div>
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
  import {mapGetters} from 'vuex'
  export default  {
    name: 'details-page',
    props: [],
    mounted () {
      if(!this.$store.state.logged.id){
        this.$router.push("login")
      }
      this.loaded()
    },
    data () {
      return {
        cargado: false
      }
    },
    methods: {
      agregarAlCarrito(payload){
        this.$store.dispatch("agregarAlCarrito", payload)
        // eslint-disable-next-line
        $('#alertaCarrito').toast('show')
      },
      loaded(){
        setTimeout(() => {
          this.cargado = true
        }, 200);
      }
    },
    computed: {
      ...mapGetters({
        articulo : 'detalleProducto'
      })
    }
}


</script>

<style scoped>
.imagen_cerveza{
  max-width: 250px;
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
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading{
  width: 100%;
  height: 100vh;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  place-content: center;
}
</style>
