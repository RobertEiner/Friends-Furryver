<template>
  <div class="outer-div">
    <div class="inner-div">
      <b-tabs content-class="mt-3">
        <b-tab :title="tabOne">
          <div class="automaticFilters">
            <b-form-checkbox
              v-model="automaticFilterChecked"
              @change="autoFilter"
              name="check-button"
              switch
            >
              Automatic Filter
            </b-form-checkbox>
          </div>

          <div class="regularFilters">
            <b-button v-b-toggle.collapse-1 variant="primary">Filter</b-button>
            <b-collapse id="collapse-1" class="mt-2">
              <b-form-group label="species:">
                <b-form-checkbox-group
                  id="species-filter"
                  v-model="filters.selectedSpecies"
                  :options="speciesOptions"
                  @change="updateAnimalList"
                ></b-form-checkbox-group>
              </b-form-group>

              <b-form-group label="personality:">
                <b-form-checkbox-group
                  id="personality-filter"
                  v-model="filters.selectedPersonality"
                  :options="personalityOptions"
                  @change="updateAnimalList"
                ></b-form-checkbox-group>
              </b-form-group>

              <b-form-group label="size:">
                <b-form-checkbox-group
                  id="size-filter"
                  v-model="filters.selectedSize"
                  :options="sizeOptions"
                  @change="updateAnimalList"
                ></b-form-checkbox-group>
              </b-form-group>
            </b-collapse>
          </div>
          <animals-list
            ref="animalList"
            @newAdoptionApplication="updateAdoptionApplicationList"
          />
        </b-tab>
        <b-tab :title="tabTwo">
          <adoption-application-list
            ref="adoptionApplicationList"
            @removedAdoptionApplication="updateAnimalList"
          />
        </b-tab>
        <b-tab :title="tabThree">
          <adopter-profile
            :adopter="adopter"
            @adopterProfileUpdated="getAdopter"
          />
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

import AnimalsList from '@/components/AnimalsList.vue'
import AdoptionApplicationList from '@/components/AdoptionApplicationList.vue'
import AdopterProfile from '@/components/AdopterProfile.vue'

export default {
  name: 'navbar-adopter',
  props: ['firstTab', 'secondTab', 'thirdTab'],
  components: {
    'animals-list': AnimalsList,
    'adoption-application-list': AdoptionApplicationList,
    'adopter-profile': AdopterProfile
  },
  methods: {
    updateAdoptionApplicationList() {
      this.$refs.adoptionApplicationList.updateList()
    },
    updateAnimalList() {
      this.$refs.animalList.updateList(this.filters)
    },
    getAdopter() {
      Api.get(`/adopters/${this.$route.params.id}`)
        .then((response) => {
          this.adopter = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    autoFilter() {
      if (this.automaticFilterChecked) {
        this.filters.selectedSpecies = [this.adopter.petPreferences.species]
        this.filters.selectedSize = [this.adopter.petPreferences.size]
        this.filters.selectedPersonality = [this.adopter.petPreferences.personality]
        this.updateAnimalList(this.filters)
      } else {
        this.filters = {
          selectedSpecies: [],
          selectedSize: [],
          selectedPersonality: []
        }
        this.updateAnimalList(this.filters)
      }
    }
  },
  mounted() {
    this.getAdopter()
  },
  data() {
    return {
      tabOne: this.firstTab,
      tabTwo: this.secondTab,
      tabThree: this.thirdTab,
      adopter: this.adopter,
      speciesOptions: [
        { text: 'Dog', value: 'dog' },
        { text: 'Cat', value: 'cat' },
        { text: 'Rabbit', value: 'rabbit' },
        { text: 'Bird', value: 'bird' }
      ],
      personalityOptions: [
        { text: 'Lazy', value: 'lazy' },
        { text: 'Calm', value: 'calm' },
        { text: 'Energetic', value: 'energetic' },
        { text: 'Playful', value: 'playful' }
      ],
      sizeOptions: [
        { text: 'Small', value: 'small' },
        { text: 'Medium', value: 'medium' },
        { text: 'Big', value: 'big' }
      ],
      filters: {
        selectedSpecies: [],
        selectedPersonality: [],
        selectedSize: []
      },
      automaticFilterChecked: false
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

.outer-div {
  background-color: rgb(119, 200, 246);
  position: relative;
  min-height: 100vh;
}

.inner-div {
  background-color: aliceblue;
  min-height: 100vh;
}
</style>
