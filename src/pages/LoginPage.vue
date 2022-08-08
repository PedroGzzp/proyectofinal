<template>
  <section :style="BackgroundImage">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="contenedor-tarjeta">
          <h2>Login</h2>
          <div class="form-floating">
            <input class="form-control" type="text" placeholder="Usuario" name="usuario" v-model="usuario">
            <label for="usuario">Usuario</label>
            <div v-if="alertaUsuario" class="form-text text-danger" v-text="mensajeAlertaUsuario"></div>
          </div>
          <div class="form-floating">
            <input class="form-control" type="password" placeholder="Contraseña" name="password" v-model="password">
            <label for="contraseña">Contraseña</label>
            <div v-if="alertaContraseña" class="form-text text-danger" v-text="mensajeAlertaContraseña"></div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="login">Login</button>
            <div v-if="alertaLogin" class="form-text text-danger" v-text="mensajeAlerta"></div>
          </div>
          <div class="registrar">
          <p>¿No tienes cuenta? Registrate <a class="text-primary" @click="registro">aquí</a></p>
          </div>
      </div>
        </div> 
      </div>
    </div>   
  </section>


</template>

<script>
  // import axios from 'axios'
  export default  {
    name: 'login-page',
    props: [],
    async mounted () {
      this.$store.dispatch("getUsuarios")
    },
    data () {
      return {
        BackgroundImage: {backgroundImage: "url(img/loginpage/background_login.jpg)"},
        usuario: "",
        password: "",
        alertaLogin: false,
        alertaUsuario: false,
        alertaContraseña: false,
        mensajeAlerta: "",
        mensajeAlertaUsuario: "",
        mensajeAlertaContraseña: "",
      }
    },
    methods: {
      login(){
        localStorage.clear();
        this.validarUsuario()
        this.validarContraseña()
        if(this.validarUsuario() && this.validarContraseña()){
          let usuarioValido = this.$store.state.listaUsuarios.find(i=> i.usuario === this.usuario && i.password === this.password)
          if(!usuarioValido){
            this.alertaLogin = true
            this.mensajeAlerta = "Usuario o Contraseña incorrectos"
          }else{
            this.alertaLogin = false
            this.alertaUsuario = false
            this.alertaContraseña = false
            this.$store.commit("usuarioLoggeado", usuarioValido)
            if(usuarioValido.perfil === 1){
              this.$router.push('admin')
            }else if(usuarioValido.perfil === 2){
              this.$router.push('main')
            }
          }          
        }
      },
      validarUsuario(){
        if(this.usuario == ""){
          this.alertaUsuario = true
          this.mensajeAlertaUsuario = "Nombre de Usuario requerido"
        }else{
          this.alertaUsuario = false
          return true
        }
      },
      validarContraseña(){
        if(this.password == ""){
          this.alertaContraseña = true
          this.mensajeAlertaContraseña = "Contraseña requerida"
        }else{
          this.alertaContraseña = false
          return true
        }
      },
      registro(){
        this.$router.push("signIn")
      }
    },
    computed: {

    }
}


</script>

<style scoped>
section{
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
}
.contenedor-tarjeta{
    padding: 15px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 2px 2px 10px #cccccc;
}
.form-floating{
  margin-bottom: 20px;
}
label{
  opacity: .65;
}
.registrar{
  margin-top: 30px;
  font-size: 14px;
}

a{
  cursor: pointer;
}
</style>
