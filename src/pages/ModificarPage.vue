<template>

  <section>
    <h1>Hola {{nombreUsuario}}</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10">
        <h2 class="text-start">Modificar artículo</h2>
          <div class="contenedor-tarjeta">
          <form class="row g-3">
            <div class="col-sm-12 col-md-6 text-start">
              <label for="Nombre_Articulo">Nombre Artículo</label>
              <input class="form-control" type="text" name="Nombre_Articulo" placeholder="Ejemplo: XX ambar" v-model="VuexArticulo.nombre" id="nombre_articulo" >
              <div v-if="alertaNombreArticulo" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="Tipo_cerveza">Tipo de Cerveza</label>
              <input class="form-control" type="text" name="Tipo_cerveza" placeholder="Ejemplo: Pale Lager, American-Style Lager" v-model="VuexArticulo.tipo_cerveza" id="tipo_cerveza">
              <div v-if="alertaTipoCerveza" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="precio">Precio</label>
              <input class="form-control" type="number" name="precio" min="0" placeholder="Ejemplo: 19.55" v-model="VuexArticulo.precio" id="precio">
              <div v-if="alertaPrecio" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="opinion">Opinion</label>
              <input class="form-control" type="number" max="5" min="0" name="opinion" placeholder="Ejemplo: 4.5" v-model="VuexArticulo.opinion" id="opinion">
              <div v-if="alertaOpinion" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="pais">País</label>
              <input class="form-control" type="text" name="pais" placeholder="Ejemplo: Alemania" v-model="VuexArticulo.pais" id="pais">
              <div v-if="alertaPais" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="ruta_imagen">Ruta imagen</label>
              <input class="form-control" type="text" name="ruta_imagen" placeholder="Ejemplo: https://drive.google.com/file/d/1Cj-VNsG0w6uVuQfcf2_tVwTNTNZLkMyG/view" v-model="VuexArticulo.imagen" id="ruta_imagen">
              <div v-if="alertaImagen" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-12 text-start">
              <label for="descripcion">Descripción</label>
              <textarea class="form-control" name="descripcion" v-model="VuexArticulo.descripcion" id="descripcion"></textarea>
              <div v-if="alertaDescripcion" class="form-text text-danger">Campo Requerido</div>
            </div>
          </form>
              <br>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="modificarArticulo()">Modificar artículo</button>
              </div>
              <br>  
              <div class="text-end">
                <button class="btn btn-secondary" @click="cancelar()">Cancelar</button>
              </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>


    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="alertaCarrito" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              <p>Artículo modificado.</p>
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
    name: 'modificar-page',
    props: [],
    mounted () {
    },
    data () {
      return {
        nombreUsuario: "",
        alertaNombreArticulo: false,
        alertaTipoCerveza: false,
        alertaPrecio: false,
        alertaOpinion: false,
        alertaPais: false,
        alertaImagen: false,
        alertaDescripcion: false,
        mensajeAlertaArticulo: ''
      }
    },
    methods: {
      cancelar(){
        this.$router.push("admin")
      },
      modificarArticulo(){
        this.validarNombreCerveza()
        this.validarTipoCerveza()
        this.validarPrecioCerveza()
        this.validarOpinionCerveza()
        this.validarPaisCerveza()
        this.validarRutaImagen()
        this.validarDescripcionCerveza()
        if(this.validarNombreCerveza() && this.validarTipoCerveza() && this.validarPrecioCerveza() && this.validarOpinionCerveza() && this.validarPaisCerveza() && this.validarRutaImagen() && this.validarDescripcionCerveza()){
          try {
            const articuloModificado = {
              nombre: this.VuexArticulo.nombre,
              tipo_cerveza: this.VuexArticulo.tipo_cerveza,
              precio: this.VuexArticulo.precio,
              opinion: this.VuexArticulo.opinion,
              pais: this.VuexArticulo.pais,
              imagen: this.VuexArticulo.ruta_imagen,
              descripcion: this.VuexArticulo.descripcion,
              id: this.VuexArticulo.id
            }
            this.$store.dispatch("updateArticulo", articuloModificado)
            this.$router.push("admin")
          }
          catch (error) {
            console.log(error);
          }
        }
      },
      validarNombreCerveza(){
        if(this.VuexArticulo.nombre != ''){
          this.alertaNombreArticulo = false
          return true
        }else{
          this.alertaNombreArticulo = true
        }
      },
      validarTipoCerveza(){
        if(this.VuexArticulo.tipo_cerveza != ''){
          this.alertaTipoCerveza = false
          return true
        }else{
          this.alertaTipoCerveza = true
        }
      },
      validarPrecioCerveza(){
        if(this.VuexArticulo.precio != 0 && this.VuexArticulo.precio != ''){
          this.alertaPrecio = false
          return true
        }else{
          this.alertaPrecio = true
        }
      },
      validarOpinionCerveza(){
        if(this.VuexArticulo.opinion != 0 && this.VuexArticulo.opinion != ''){
          this.alertaOpinion = false
          return true
        }else{
          this.alertaOpinion = true
        }
      },
      validarPaisCerveza(){
        if(this.VuexArticulo.pais != ''){
          this.alertaPais = false
          return true
        }else{
          this.alertaPais = true
        }
      },
      validarRutaImagen(){
        if(this.VuexArticulo.ruta_imagen != ''){
          this.alertaImagen = false
          return true
        }else{
          this.alertaImagen = true
        }
      },
      validarDescripcionCerveza(){
        if(this.VuexArticulo.descripcion != ''){
          this.alertaDescripcion = false
          return true
        }else{
          this.alertaDescripcion = true
        }
      },
      eliminarArticulo(payload){
        let texto = "¿Estas seguro de eliminar este artículo?";
          if (confirm(texto) == true) {
              this.$store.dispatch("eliminararticulo", payload.id)
              this.$store.dispatch("getProductos")
          }
      }
    },
    computed: {
      ...mapGetters({
        VuexArticulo : 'detalleProducto'
      })
    }
}


</script>

<style scoped>
textarea{
  resize: none;
  height: 100px;
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
.inventario{
  vertical-align: middle;
}
</style>
