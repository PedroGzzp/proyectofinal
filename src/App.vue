<template>
<section>
  <div id="app" :class="{'mt-60' : this.loggeado.length != 0}">
  <nav v-if="this.loggeado.length != 0" class="navbar navbar-expand-lg bg-light fixed-top">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <!-- <router-link class="nav-link" to="/login">Login</router-link>
          <router-link class="nav-link" to="/signIn">Sing In</router-link> -->
          <router-link class="nav-link" to="/main">Home</router-link>
          <router-link v-if="this.loggeado.perfil === 1" class="nav-link" to="/admin">Admin</router-link>
          <router-link class="nav-link" to="/cart">Carrito</router-link>
          <button @click="logout" class="btn btn-danger">Logout</button>
        </div>
      </div>
    </div>
  </nav>
    <router-view />
  </div>

  <div class="toast-container position-fixed top-0 end-0 p-3">
      <div id="alertaaltaUsuario" class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <p>Usuario registrado con éxito.</p>
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
  </div>

</section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'App',
  components: {
    
  },
  data(){
    return{
      listaUsuarios: []
    }
  },
  mounted(){
    this.$store.dispatch("getUsuarios")
    this.$store.dispatch("getProductos")
    this.$store.dispatch("getCarrito")
  },
  methods:{
    mensajeAltaUsuario(){
      // eslint-disable-next-line
      $('#alertaaltaUsuario').toast('show')
    },
    logout(){
      let text = "¿Estas seguro de salir?";
      if (confirm(text) == true) {
        this.$store.dispatch("logOut")
        this.$router.push("login")
      }
    }
  },
  computed:{
    ...mapGetters({
      loggeado: 'loggeado'
    })
  }
}
</script>

<style>
.navbar-nav{
  margin-left: auto;
}

.mt-60{
  margin-top:60px;
}

:root{
  --grid-desktop-horizontal: 24px;
  --grid-desktop-vertical: 24px;
  --grid-mobile-horizontal: 12px;
  --grid-mobile-vertical: 12px;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mt-60{
  margin-top: 60px;
}
h1, h2, h3,h4, h5, h6{
    font-family: 'Oswald', sans-serif;
}
nav form{
  margin-left: auto;
}
nav button{
  margin: 0 5px;
}
#alertaaltaUsuario{
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
