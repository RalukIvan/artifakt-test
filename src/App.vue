<template lang="pug">
 #app
    router-view
</template>

<script>

export default {
    name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,700;1,400&display=swap');
body {
    background-color: #E5E5E5;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #E5E5E5;
}
:focus {
    outline: none;
}
input {
    border: none;
}

button {
    border: none;
}
</style>
