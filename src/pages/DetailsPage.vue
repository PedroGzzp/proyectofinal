<template>

  <section>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-12 col-md-10">
          <div v-if="!this.vacio" class="row">
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
            </div>
          </div> 
          <div class="col-sm-12 col-md-8 col-lg-8" v-else><h2>Vacío<br> (esta pagina no sería visible hasta seleccionar un articulo, se muestra para ejemplo)</h2></div>       
        </div>
      </div>
    </div>
    

  </section>

</template>

<script>
  import axios from 'axios'
  export default  {
    name: 'details-page',
    props: [],
    async mounted () {
      if(!this.$store.state.logged.id){
        this.$router.push("login")
      }

      let idArticulo = localStorage.getItem("articulo")
      try{
        const respuestaArticulo = await axios.get(`https://62df4289976ae7460be99a23.mockapi.io/inventario/${idArticulo}`);
        this.articulo = respuestaArticulo.data
      }
      catch (error) {
          this.vacio = true
          console.log(error);
      }
    },
    data () {
      return {
        vacio: false,
        articulo:[]
      }
    },
    methods: {

    }
}


</script>

<style scoped>
.imagen_cerveza{
  max-width: 250px;
}
</style>
