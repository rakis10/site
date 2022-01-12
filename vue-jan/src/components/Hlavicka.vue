<template>
  <header>
      <h1>{{ title }}</h1>
    <Tlacitko
        v-show="homepage"
        @showAddTask="$emit('showAddTask')"
        :text="showAddTask ? 'Zavri' : 'Pridaj'"
        :color="showAddTask ? 'red' : 'green'"/>


  </header>

</template>

<script>

import Tlacitko from "./Tlacitko";

export default {
  name: "Hlavicka",
  props: {
    title: String,
    showAddTask: Boolean
    },
  components: {
    Tlacitko
  },
  computed:{
    homepage(){
      if(this.$route.path === "/"){
        return true
      }else {
        return false
      }
    }
  }
}
</script>

<style scoped>
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
</style>