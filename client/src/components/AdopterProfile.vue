<template>
  <div v-if="adopter">
    <div>
      <h1>{{ adopter.name }}</h1>
      <h2>{{ adopter.username }}</h2>
    </div>
    <div class="pet-preferences">
      <b-card title="Your preferences">
        <b-list-group>
          <b-list-group-item>
            Species: {{ adopter.species }}
          </b-list-group-item>
          <b-list-group-item>
            Size: {{ adopter.size }}
          </b-list-group-item>
          <b-list-group-item>
            Size: {{ adopter.hours }}
          </b-list-group-item>
          <b-list-group-item>
            Personality: {{ adopter.personality }}
          </b-list-group-item>
        </b-list-group>
      </b-card>

      <b-button> Update profile </b-button>
    </div>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode'

export default {
  name: 'adopter-profile',
  props: ['adopter'],
  data() {
    return {
      adopterbyID: this.adopter
    }
  },
  methods: {
    getUserDetails() {
      const token = localStorage.getItem('jwt')
      const decoded = VueJwtDecode.decode(token)
      this.adopterbyID = decoded
    }
  },
  created() {
    this.getUserDetails()
  }
}
</script>

<style scoped>
</style>
