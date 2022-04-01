<template>
  <div  :key="task.id" v-for="task in tasks" >
    <Task :task="task"
          @toggle-reminder="$emit('toggle-reminder', task.id)"
          @delete-task="$emit('delete-task', task.id)"

    ></Task>

  </div>
</template>

<script>
import Task from "@/components/Task";
export default {
  name: "Tasks",
  components: {Task},
  props: {
    tasks: Array
  },
  emits: ['delete-task','toggle-reminder']
}
</script>

<style scoped>

</style>