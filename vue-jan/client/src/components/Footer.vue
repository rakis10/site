<template>
  <footer>
    <p>Copyright &copy; 2022</p>
<!--  href robi reload  <a href="/about" >About</a>-->
    <router-link to="/about" >About</router-link>
  </footer>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
a{
  color: steelblue;
}
footer{
  margin-top: 30px;
  text-align: center;
}
</style>