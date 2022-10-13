<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <a class="navbar-brand" href="#">Navbar</a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item active">
                <b-button><a class="nav-link" @click="logUserOut"> Logout</a></b-button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section>
        <div class="container mt-5">
          <div class="row">
            <div class="col-md-12">
              <ul class="list-group">
                <li class="list-group-item">Name : {{ adopter.name }}</li>
                <li class="list-group-item">Email : {{ adopter.email }}</li>
                <li class="list-group-item">SSN : {{ adopter.ssn }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
<script>
import VueJwtDecode from 'vue-jwt-decode'
export default {
  data() {
    return {
      adopter: {}
    }
  },
  methods: {
    getUserDetails() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.adopter = decoded
    },
    logUserOut() {
      localStorage.removeItem('jwt')
      this.$router.push('/')
    }
  },
  created() {
    this.getUserDetails()
  }
}
</script>
  <style scoped></style>
