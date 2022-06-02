<template>
  <h2>Zasoby</h2>
  <div class="card" v-if="zasoby_list">
   <ul class="list-group" v-for="item in zasoby_list">
      <li class="list-group-item">Hrubka: {{ item.typHrubka.name }}</li>
      <li class="list-group-item">   Pocet: {{item.pocet}}   Dlzka: {{item.typHrubka.name}}</li>
      <button   @click.prevent="zmazItem(item._id)" >Zmaz</button>
      <br>
    </ul>


  </div>
  <button id="show-modal" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modalPridajZasobu :show="showModal" @close="showModal = false">
<!--                menim slot body-->
      <template #body>

      </template>
    </modalPridajZasobu>
  </Teleport>
</template>

<script>
import modalPridajZasobu from "./modalPridajZasobu";
import {mapActions, mapGetters} from "vuex";
import {async} from "rxjs";
export default {
  components: {
    modalPridajZasobu
  },
  // zasoby list je nasov
  computed: mapGetters(["zasoby_list", "hrubky", "dlzky"]),
  methods: {
    ...mapActions(["getZasoby", "getHrubka", "getDlzky", "zmazZasobu"]),
    zmazItem(idDlz) {

      let zasoba = {
        id : idDlz
      }
      console.log(zasoba)
      this.zmazZasobu(zasoba).then(res => {
        console.log(res)
        if (res.data.success) {
          // console.log('success')
          this.zasoby_list  =  this.getZasoby()
        }
      })
          .catch(err => {
            console.log(err);
          });
      // const lol = await this.zmazZasobu(id)
      // if(!lol.success){
      //   console.log("nepodarilo sa zmazat")
      // }else {
      //
      // }
    },
  },
  name: "Zasoby",
  created() {
    this.getZasoby();




  },
  data() {
    return {
      showModal: false,
      idDlzka: ""
    }
  }
}
</script>

<style scoped>

</style>