<template>
  <b-container class="outer-container" fluid>
    <b-row>
      <b-col sm="12">
        <div class="inner-div">
          <navbar />
          <b-tabs content-class="mt-3" class="tabs">
            <b-tab title="Pets" active>
              <div>
                <div>
                  <span class="animals-span">
                    <pets-tab
                      :animals="animals"
                      @del-animal="deleteAnimal"
                    />
                  </span>
                </div>

                <b-button
                  class="add-animal-button"
                  @click="goToAddAnimal()"
                  size="lg"
                  variant="primary"
                  >Add new animal</b-button
                >
              </div>
            </b-tab>

            <b-tab title="Applications">
              <div>
                <applications-tab
                class="application-tab"
                  :key="applicationsKey"

                ></applications-tab>

              </div>
            </b-tab>
            <div>
              <b-tab class="profile-tab" title="Profile">
                <profile-tab :key="profileKey" :adoptionCenter="adoptionCenter" @update-adoptionCenter="updateAdoptionCenter"></profile-tab>
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

    this.getAdoptionCenter()
  },
  data() {
    return {
      animals: [],
      adoptionCenter: {},
      applicationsKey: 0,
      profileKey: 0
    }
  },
  methods: {
    reRenderInfoComponent() {
      this.getAdoptionCenter()
      this.profileKey += 1
    },
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
    },

    // Update an adoption center
    updateAdoptionCenter(formData) {
      Api.patch(`/adoptionCenters/${this.$route.params.id}`, formData)
        .then(response => {
          console.log(response)
          this.reRenderInfoComponent()
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
  background-color: rgb(64, 183, 227);
  min-height: 100vh;
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

.no-applications {
  margin: 10%;
  padding-bottom: 17%;
}
</style>
