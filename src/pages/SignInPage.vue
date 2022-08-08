<template>

  <section :style="BackgroundImage">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-4">
        <div class="contenedor-tarjeta">
          <h2>Registrate</h2>
          <div class="form-floating text-start">
            <input class="form-control" type="text" placeholder="Nombre" name="Nombre" v-model="nombre">
            <label for="Nombre">Nombre</label>
            <div v-if="alertaNombre" class="form-text text-danger" v-text="mensajeAlertaNombre"></div>
          </div>
          <div class="form-floating text-start">
            <input class="form-control" type="text" placeholder="Apellidos" name="apellidos" v-model="apellidos">
            <label for="usuario">Apellidos</label>
            <div v-if="alertaApellidos" class="form-text text-danger" v-text="mensajeAlertaApellidos"></div>
          </div>
          <div class="form-floating text-start">
            <input class="form-control" type="text" placeholder="Email" name="email" v-model="email" v-on:keyup="validarFormatoEmail">
            <label for="email">Email</label>
            <div v-if="alertaEmail" class="form-text text-danger" v-text="mensajeAlertaEmail"></div>
          </div>
          <div class="form-floating text-start">
            <input class="form-control" type="text" placeholder="Usuario" name="usuario" v-model="usuario">
            <label for="usuario">Usuario</label>
            <div v-if="alertaUsuario" class="form-text text-danger" v-text="mensajeAlertaUsuario"></div>
          </div>
          <div class="form-floating text-start">
            <input class="form-control" type="password" placeholder="Contraseña" name="password" v-model="password">
            <label for="password">Password</label>
            <div v-if="alertapassword" class="form-text text-danger" v-text="mensajeAlertapassword"></div>
          </div>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="SignIn()">Sign in</button>
          </div>
          <div class="login">
          <p>¿Ya tienes cuenta? <a class="text-primary" @click="iniciarSesion">Inicia sesión</a></p>
          </div>
      </div>
        </div> 
      </div>
    </div>    
  </section>

</template>

<script>
  import axios from 'axios'
  export default  {
    name: 'sign-in-page',
    props: [],
    mounted () {

    },
    data () {
      return {
        rutaUsuarios: "https://62df4289976ae7460be99a23.mockapi.io/usuarios",
        BackgroundImage: {backgroundImage: "url(img/loginpage/background_login.jpg)"},
        nombre: "",
        apellidos: "",
        email: "",
        // eslint-disable-next-line
        reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        usuario: "",
        password: "",
        alertaNombre: false,
        alertaApellidos: false,
        alertaEmail: false,
        alertaUsuario: false,
        alertapassword: false
      }
    },
    methods: {
      async SignIn(){
        this.validarNombre()
        this.validarApellidos()
        this.validarEmail()
        this.validarUsuario()
        this.validarpassword()
        if(this.validarNombre() && this.validarApellidos() && this.validarEmail() && this.validarUsuario() && this.validarpassword()){
          try {
            const nuevoUsuario = {
              perfil: 2,
              nombre: this.nombre,
              apellidos: this.apellidos,
              email: this.email,
              usuario: this.usuario,
              password: this.password

            };
            await axios.post(`${this.rutaUsuarios}`, nuevoUsuario);
            this.$router.push("login")
          }
          catch (error) {
            console.log(error);
          }
          // this.$emit("signed", this.usuario)
        }
      },
      validarNombre(){
        if(this.nombre != ""){
          this.alertaNombre = false
          return true
        }
        if(this.nombre == ""){
          this.alertaNombre = true,
          this.mensajeAlertaNombre = "Nombre es requerido"
        }
      },
      validarApellidos(){
        if(this.apellidos != ""){
          this.alertaApellidos = false
          return true
        }
        if(this.apellidos == ""){
          this.alertaApellidos = true,
          this.mensajeAlertaApellidos = "Apellidos es requerido"
        }
      },
      validarEmail(){
        if(this.email == "")
        {
          this.alertaEmail = true,
          this.mensajeAlertaEmail = "Email es requerido"
          return false
        }else if(this.formatoEmail){
          this.alertaEmail = false
          return true
        }
      },
      validarFormatoEmail(){
        // eslint-disable-next-line
        if(this.reg.test(this.email)){
          this.alertaEmail = false,
          this.formatoEmail = true
        }else{
          this.alertaEmail = true,
          this.mensajeAlertaEmail = "Email no válido"
          this.formatoEmail = false
        }
      },
      validarUsuario(){
        if(this.usuario != ""){
          this.alertaUsuario = false
          return true
        }
        if(this.usuario == ""){
          this.alertaUsuario = true,
          this.mensajeAlertaUsuario = "Nombre de Usuario es requerido"
        }
      },
      validarpassword(){
        if(this.password != ""){
          this.alertapassword = false
          return true
        }
        if(this.password == ""){
          this.alertapassword = true
          this.mensajeAlertapassword = "password requerido"
        }
      },
      iniciarSesion(){
        this.$router.push("login")
      }
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
}
.form-floating{
  margin-bottom: 20px;
}
label{
  opacity: .65;
}
.login{
  margin-top: 30px;
  font-size: 14px;
}

a{
  cursor: pointer;
}
</style>
