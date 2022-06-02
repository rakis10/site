<template>
<!--   <AddTask v-if="showAddTask" @addTask="addTask" />-->
  {{zasoby_list}}
  {{zasoby}}
  <table class="table">

    <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in zasoby_list">
      <th scope="row">1</th>
      <td>{{item._id}}</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
<!--    <tr>-->
<!--      <th scope="row">2</th>-->
<!--      <td>Jacob</td>-->
<!--      <td>Thornton</td>-->
<!--      <td>@fat</td>-->
<!--    </tr>-->
<!--    <tr>-->
<!--      <th scope="row">3</th>-->
<!--      <td>Larry</td>-->
<!--      <td>the Bird</td>-->
<!--      <td>@twitter</td>-->
<!--    </tr>-->
    </tbody>
  </table>

  <Tasks @toggle-reminder="toggleReminder"   @delete-task="deleteTask" :tasks="tasks"/>
</template>

<script>
import AddTask from "@/components/AddTask";
import Tasks from "@/components/Tasks";
import {mapActions, mapGetters, mapState} from "vuex";
export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    Tasks,
    AddTask
  },
  data(){
    return{
      // tu sa robia rest call
      tasks: [],
    }
  },
  computed: {
    // ...mapState(["zasoby"]),
    zasoby(){
      return this.$store.state.zasoby
    },
    beforeMount() {
      this.$store.dispatch('getZasoby' )

      // this.nacitajData()
    }
  }  ,
  methods:{
    ...mapActions[("getZasoby")],
     nacitajData(){
      this.getZasoby()
    }
  },
  async created() {
    // this.$store.dispatch("getZasoby");

  },

}
</script>

<style scoped>

</style>