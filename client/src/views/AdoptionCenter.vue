<template>
  <div class="outer-div">
    <div class="inner-div">
      <navbar />
      <b-tabs content-class="mt-3" class="tabs">
        <b-tab title="Pets" active>
          <div>
            <b-card-group deck>
              <div v-for="animal in animals" v-bind:key="animal._id">
                <pets-tab v-bind:animal="animal" v-on:del-animal="deleteAnimal"/>
              </div>
            </b-card-group>
            <b-button class="add-animal-button" v-on:click="goToAddAnimal()" size="lg" variant="primary">Add new animal</b-button>
          </div>
        </b-tab>

        <b-tab title="Applications"></b-tab>
        <b-tab title="Profile"></b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import PetTab from '@/components/PetTab.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'adoption-center',
  components: {
    'pets-tab': PetTab,
    Navbar
  },
  mounted() {
    Api.get(`/adoptionCenters/${this.$route.params.id}/animals`)
      .then(response => {
        console.log(response.data)
        this.animals = response.data.Animals
      })
      .catch(error => {
        console.log(error)
      })
  },
  data() {
    return {
      animals: []
      // adoptionCenterId: this.$route.params.id
    }
  },
  methods: {
    goToAddAnimal() {
      this.$router.push(`/adoptionCenters/${this.$route.params.id}/addAnimal`)
    },
    deleteAnimal(id) {
      Api.delete(`/animals/${id}`).then(response => {
        const index = this.animals.findIndex(animal => animal._id === id)
        this.animals.splice(index, 1)
      })
    }
  }
}
</script>

<style>
.outer-div {
  padding: 3% 7%;
  background-color: rgb(119, 200, 246);
}

.inner-div {
    background-color: aliceblue;
}

.add-animal-button {
  margin: 2%;
}
</style>
