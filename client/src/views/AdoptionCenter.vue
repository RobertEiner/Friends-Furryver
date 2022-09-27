<template>
  <div class="outer-div">
    <div class="inner-div">
      <navbar />
      <b-tabs content-class="mt-3" class="tabs">
        <b-tab title="Pets" active>
          <div>
            <b-card-group deck>
              <div v-for="animal in animals" v-bind:key="animal._id">
                <pets-tab v-bind:animal="animal" />
              </div>
            </b-card-group>
            <b-button class="update-animal-button" v-on:click="sayHi()" size="lg" variant="primary">Add new animal</b-button>
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
    Api.get('/animals')
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
    }
  },
  methods: {
    sayHi() {
      this.$router.push('/adoptionCenter/addAnimal')
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
</style>
