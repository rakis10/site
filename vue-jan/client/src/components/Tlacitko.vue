<template>
  <button
      @click="onClick()"
      :style="{background: color}"
          class="btn" >{{ text }}</button>
</template>

<script>
export default {
  name: "Tlacitko",
  props: {
    text: String,
    color: String
  },
  methods: {
    onClick(){
     this.$emit('showAddTask')
    }
  }
}
</script>

<style scoped>

</style>