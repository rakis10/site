<template>
   <AddTask v-if="showAddTask" @addTask="addTask" />


  <Tasks @toggle-reminder="toggleReminder"   @delete-task="deleteTask" :tasks="tasks"/>
</template>

<script>
import AddTask from "@/components/AddTask";
import Tasks from "@/components/Tasks";
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
  methods:{
    async deleteTask(id){
      if (confirm('Isto?')){
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE',

        })
        res.status === 200 ? (this.tasks = this.tasks.filter((task) => task.id !== id)) : alert('Nepodarilo sa vymazat')

      }
    },
    async toggleReminder(id){
      const taskNaMenenie = await this.fetchTask(id)
      const meneniTask = {...taskNaMenenie, reminder: !taskNaMenenie.reminder}

      const res = await fetch(` api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',

        },
        body: JSON.stringify(meneniTask)
      })
      const data = await res.json()
      this.tasks = this.tasks.map((task)=> task.id === id ? {...task, reminder: data.reminder} : task)
    },
    async fetchTasks(){
      const res = await fetch('api/tasks')
      const data = await res.json()
      return data
    },
    async fetchTask(id){
      const res = await fetch(`api/tasks/${id}`)
      const data = await res.json()
      return data
    },
    async addTask(task){
      // this.tasks.push(task)
      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',

        },
        body: JSON.stringify(task)
      })
      const data = await res.json()
      this.tasks = [...this.tasks, data]
    },
    toggleAddTask(){
      this.showAddTask =  !this.showAddTask
    }

  },
  async created() {
    this.tasks = await this.fetchTasks()
  }
}
</script>

<style scoped>

</style>