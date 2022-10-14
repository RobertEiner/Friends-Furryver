<template>
  <b-navbar type="dark">
    <b-img
      class="dog-img-navbar"
      :src="require('../Assets/pet-house.png')"
      rounded="top"
      fluid-grow
    ></b-img>
    <b-navbar-brand class="navbar">
      Friends Furryver
    </b-navbar-brand>
    <b-button
      id="log-out-button"
      class="ml-auto"
      pill
      variant="outline-secondary"
      @click="logUserOut()"
      >Log out</b-button
    >
  </b-navbar>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logUserOut() {
      localStorage.removeItem('jwt')
      this.$router.push('/')
    }
  }
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

#log-out-button {
  color: white;
  border-color: white;

}

#log-out-button:hover {
  background-color: rgb(79, 196, 239);
}

@media (max-width: 334px) {
  .navbar {

  display: inline-block;

}

#log-out-button {

  margin: 2% 0;
}
}

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>
