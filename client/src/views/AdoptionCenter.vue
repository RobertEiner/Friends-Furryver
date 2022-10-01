<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <div class="inner-div">
          <navbar />
          <b-tabs content-class="mt-3" class="tabs">
            <b-tab title="Pets" active>
              <div>
                <b-card-group deck>
                  <div v-for="animal in animals" v-bind:key="animal._id">
                    <pets-tab
                      v-bind:animal="animal"
                      v-on:del-animal="deleteAnimal"
                    />
                  </div>
                </b-card-group>
                <b-button
                  class="add-animal-button"
                  v-on:click="goToAddAnimal()"
                  size="lg"
                  variant="primary"
                  >Add new animal</b-button
                >
              </div>
            </b-tab>

            <b-tab title="Applications">
              <div>
                <b-card-group deck>
                  <div
                    v-for="application in applications"
                    :key="application._id"
                  >
                    <applications-tab
                      :application="application"
                      v-on:del-application="declineApplication"
                    ></applications-tab>
                  </div>
                </b-card-group>
              </div>
            </b-tab>

            <b-tab title="Profile">
              <profile-tab></profile-tab> </b-tab>
          </b-tabs>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Api } from '@/Api'
import PetTab from '@/components/PetTab.vue'
import Navbar from '@/components/Navbar.vue'
import ApplicationTab from '@/components/ApplicationTab.vue'
import ProfileTab from '@/components/ProfileTab.vue'

export default {
  name: 'adoption-center',
  components: {
    'pets-tab': PetTab,
    Navbar,
    'applications-tab': ApplicationTab,
    ProfileTab
  },
  mounted() {
    this.getAllAnimals()
    this.getAllApplications()
  },
  data() {
    return {
      animals: [],
      applications: []
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
    },
    declineApplication(applicationId) {
      Api.delete(`/adoption-applications/${applicationId}`).then(response => {
        const index = this.applications.findIndex(
          application => application._id === applicationId
        )
        this.applications.splice(index, 1)
      })
    },
    getAllAnimals() {
      Api.get(`/adoptionCenters/${this.$route.params.id}/animals`)
        .then(response => {
          console.log(response.data)
          this.animals = response.data.Animals
        })
        .catch(error => {
          console.log(error)
        })
    },
    getAllApplications() {
      Api.get(`/AdoptionCenters/${this.$route.params.id}/adoptionApplications`)
        .then(response => {
          console.log(response.data)
          this.applications = response.data.Applications
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.inner-div {
  background-color: aliceblue;
}

.add-animal-button {
  margin: 2%;
}
</style>
