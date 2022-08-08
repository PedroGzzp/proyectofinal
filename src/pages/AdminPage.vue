<template>

  <section>
    <h1>Hola {{nombreUsuario}}</h1>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10">
        <h2 class="text-start">Lista Usuarios</h2>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Usuario</th>
              <th>Perfil</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index)  in listaUsuarios" :key="index">
              <td>{{usuario.nombre}} {{usuario.apellidos}}</td>
              <td>{{usuario.email}}</td>
              <td>{{usuario.usuario}}</td>
              <td v-if="usuario.perfil === 1">Administrador</td>
              <td v-if="usuario.perfil === 2">Usuario</td>
              <td><button @click="eliminarUsuario(usuario)" class="btn btn-danger">Eliminar Usuario</button></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10">
        <h2 class="text-start">Alta inventario</h2>
          <div class="contenedor-tarjeta">
          <form class="row g-3">
            <div class="col-sm-12 col-md-6 text-start">
              <label for="Nombre_Articulo">Nombre Artículo</label>
              <input class="form-control" type="text" name="Nombre_Articulo" placeholder="Ejemplo: XX ambar" v-model="nombre_articulo">
              <div v-if="alertaNombreArticulo" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="Tipo_cerveza">Tipo de Cerveza</label>
              <input class="form-control" type="text" name="Tipo_cerveza" placeholder="Ejemplo: Pale Lager, American-Style Lager" v-model="tipo_cerveza">
              <div v-if="alertaTipoCerveza" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="precio">Precio</label>
              <input class="form-control" type="number" name="precio" min="0" placeholder="Ejemplo: 19.55" v-model.number="precio">
              <div v-if="alertaPrecio" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="opinion">Opinion</label>
              <input class="form-control" type="number" max="5" min="0" name="opinion" placeholder="Ejemplo: 4.5" v-model.number="opinion">
              <div v-if="alertaOpinion" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="pais">País</label>
              <input class="form-control" type="text" name="pais" placeholder="Ejemplo: Alemania" v-model="pais">
              <div v-if="alertaPais" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-6 text-start">
              <label for="ruta_imagen">Ruta imagen</label>
              <input class="form-control" type="text" name="ruta_imagen" placeholder="Ejemplo: https://drive.google.com/file/d/1Cj-VNsG0w6uVuQfcf2_tVwTNTNZLkMyG/view" v-model="ruta_imagen">
              <div v-if="alertaImagen" class="form-text text-danger">Campo Requerido</div>
            </div>
            <div class="col-sm-12 col-md-12 text-start">
              <label for="descripcion">Descripción</label>
              <textarea class="form-control" name="descripcion" v-model="descripcion"></textarea>
              <div v-if="alertaDescripcion" class="form-text text-danger">Campo Requerido</div>
            </div>
          </form>
              <br>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" @click="altaArticulo()">Agregar al inventario</button>
              </div>
          </div>
        </div>
      </div>
    </div>

    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="alertaCarrito" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              <p>Artículo agregado al inventario.</p>
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
    name: 'admin-page',
    props: [],
    mounted () {
      this.nombreUsuario = this.$store.state.logged.nombre
      if(!this.nombreUsuario){
        this.$router.push("login")
      }
      
      if(this.$store.state.logged.perfil != 1){
        this.$router.push("main")
      }

      this.$store.dispatch("getUsuarios")
      this.listaUsuarios = this.$store.state.listaUsuarios
    },
    data () {
      return {
        nombreUsuario: "",
        listaUsuarios: [],
        nombre_articulo: '',
        tipo_cerveza: '',
        precio: '',
        opinion: '',
        pais: '',
        ruta_imagen: '',
        descripcion: '',
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
      async eliminarUsuario(payload){
          let text = "¿Estas seguro de eliminar este usuario?";
          if (confirm(text) == true) {
              try{
              await axios.delete(`https://62df4289976ae7460be99a23.mockapi.io/usuarios/${payload.id}`);
              this.actualizarDatos()
            }catch (error) {
              console.log(error);
            }
          }
      },
      async actualizarDatos(){
        try{
                const respuestaUsuarios = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/usuarios`);
                this.listaUsuarios = respuestaUsuarios.data
              }
              catch (error) {
                  console.log(error);
              }
      },
      async altaArticulo(){
        this.validarNombreCerveza()
        this.validarTipoCerveza()
        this.validarPrecioCerveza()
        this.validarOpinionCerveza()
        this.validarPaisCerveza()
        this.validarRutaImagen()
        this.validarDescripcionCerveza()
        if(this.validarNombreCerveza() && this.validarTipoCerveza() && this.validarPrecioCerveza() && this.validarOpinionCerveza() && this.validarPaisCerveza() && this.validarRutaImagen() && this.validarDescripcionCerveza()){
          try {
            const nuevoArticulo = {
              nombre: this.nombre_articulo,
              tipo_cerveza: this.tipo_cerveza,
              precio: this.precio,
              opinion: this.opinion,
              pais: this.pais,
              imagen: this.ruta_imagen,
              descripcion: this.descripcion

            };
            this.$store.dispatch("setArticulo", nuevoArticulo)
            // eslint-disable-next-line
            $('#alertaCarrito').toast('show')
          }
          catch (error) {
            console.log(error);
          }
        }
      },
      validarNombreCerveza(){
        if(this.nombre_articulo != ''){
          this.alertaNombreArticulo = false
          return true
        }else{
          this.alertaNombreArticulo = true
        }
      },
      validarTipoCerveza(){
        if(this.tipo_cerveza != ''){
          this.alertaTipoCerveza = false
          return true
        }else{
          this.alertaTipoCerveza = true
        }
      },
      validarPrecioCerveza(){
        if(this.precio != 0 && this.precio != ''){
          this.alertaPrecio = false
          return true
        }else{
          this.alertaPrecio = true
        }
      },
      validarOpinionCerveza(){
        if(this.opinion != 0 && this.opinion != ''){
          this.alertaOpinion = false
          return true
        }else{
          this.alertaOpinion = true
        }
      },
      validarPaisCerveza(){
        if(this.pais != ''){
          this.alertaPais = false
          return true
        }else{
          this.alertaPais = true
        }
      },
      validarRutaImagen(){
        if(this.ruta_imagen != ''){
          this.alertaImagen = false
          return true
        }else{
          this.alertaImagen = true
        }
      },
      validarDescripcionCerveza(){
        if(this.descripcion != ''){
          this.alertaDescripcion = false
          return true
        }else{
          this.alertaDescripcion = true
        }
      },
    },
    computed: {

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
</style>
