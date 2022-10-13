<template>
  <b-navbar type="dark">
    <b-img
            class="dog-img-navbar"
            :src="require('../Assets/pet-house.png')"
            rounded="top"
            fluid-grow
          ></b-img>
    <b-navbar-brand class="navbar" >

        Friends Furryver
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style scoped>
    .navbar {
        background-color: rgb(58, 172, 213);
        font-family: 'Pacifico', cursive;
    }

    .dog-img-navbar {
      max-width: 2rem;
    }

    @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>
