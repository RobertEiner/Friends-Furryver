<template>
  <b-container class="outer-container" fluid>
    <b-row>
      <b-col sm=12

      >
        <div class="inner-div" >
          <navbar />
          <b-tabs content-class="mt-3" class="tabs">
            <b-tab title="Pets" active>
              <div>
                <div>
                  <span class="animals-span" >
                    <pets-tab
                    v-bind:animals="animals"

                      v-on:del-animal="deleteAnimal"
                    />
                  </span>
                </div>

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
                <applications-tab
                  :applications="applications"
                  v-if="applications.length > 0"
                  v-on:del-application="declineApplication"
                  v-on:accept-application="acceptApplication"
                  v-on:remove-application="deleteApplication"
                ></applications-tab>
              </div>
            </b-tab>
            <div>
              <b-tab class="profile-tab" title="Profile">
                <profile-tab

                  :adoptionCenter="adoptionCenter"
                ></profile-tab>
              </b-tab>
            </div>
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
    this.getAdoptionCenter()
  },
  data() {
    return {
      animals: [],
      applications: [],
      adoptionCenter: {}

    }
  },
  methods: {
    goToAddAnimal() {
      this.$router.push(`/adoptionCenters/${this.$route.params.id}/addAnimal`)
      console.log(this.animals.length)
    },
    // Delete an animal from the adoption center
    deleteAnimal(id) {
      Api.delete(`/animals/${id}`)
        .then(response => {
          console.log(response.data)
          const index = this.animals.findIndex(animal => animal._id === id)
          this.animals.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Accept an adoption application, which changes the status code to 1, which means accepted
    acceptApplication(applicationId) {
      Api.put(`/adoption-applications/${applicationId}`, { status: 1 })
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // declines an adoption application, changing the status code to 2, which means declined
    declineApplication(applicationId) {
      Api.put(`/adoption-applications/${applicationId}`, { status: 2 })
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Deletes an adoption application
    deleteApplication(applicationId) {
      Api.delete(`/adoption-applications/${applicationId}`)
        .then(response => {
          const index = this.applications.findIndex(
            application => application._id === applicationId
          )
          this.applications.splice(index, 1)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Get all the animals of an doption center
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
    // Get all applications of an adoption center
    getAllApplications() {
      Api.get(`/AdoptionCenters/${this.$route.params.id}/adoptionApplications`)
        .then(response => {
          console.log(response.data)

          this.applications = response.data.Applications
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Get a specific adoption center
    getAdoptionCenter() {
      Api.get(`/AdoptionCenters/${this.$route.params.id}`)
        .then(response => {
          this.adoptionCenter = response.data

          console.log(response.data)
          console.log(this.adoptionCenter)
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
  margin-bottom: 0;
}

.outer-container {
  background-color: rgb(119, 200, 246);
}

.add-animal-button {
  margin: 2%;
}

.animals-span {
  display: inline-block;
}

.profile-tab {
  padding-bottom: 14%;
}
</style>
