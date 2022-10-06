<template>
  <div class="outer-div">
    <div class="inner-div">
      <b-tabs content-class="mt-3">
        <b-tab :title="tabOne">
          <div>
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
              <b-form-group label="sex:">
                <b-form-checkbox-group
                  id="sex-filter"
                  v-model="filters.selectedSex"
                  :options="sexOptions"
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
        <b-tab :title="tabThree">{{ thirdTab }}</b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import AnimalsList from '@/components/AnimalsList.vue'
import AdoptionApplicationList from '@/components/AdoptionApplicationList.vue'

export default {
  name: 'navbar-adopter',
  props: ['firstTab', 'secondTab', 'thirdTab'],
  components: {
    'animals-list': AnimalsList,
    'adoption-application-list': AdoptionApplicationList
  },
  methods: {
    updateAdoptionApplicationList() {
      this.$refs.adoptionApplicationList.updateList()
    },
    updateAnimalList() {
      console.log(this.filters.selectedSpecies)
      console.log(this.filters.selectedSex)
      this.$refs.animalList.updateList(this.filters)
    }
  },
  data() {
    return {
      tabOne: this.firstTab,
      tabTwo: this.secondTab,
      tabThree: this.thirdTab,
      adopter: this.adopterId,
      speciesOptions: [
        { text: 'Dog', value: 'dog' },
        { text: 'Cat', value: 'cat' },
        { text: 'Rabbit', value: 'rabbit' },
        { text: 'Bird', value: 'bird' }
      ],
      sexOptions: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      filters: {
        selectedSpecies: [],
        selectedSex: []
      }
    }
  }
}
</script>

<style scoped>
.outer-div {
  padding: 3% 7%;
  background-color: rgb(119, 200, 246);
}

.inner-div {
  background-color: aliceblue;
}

.navbar-brand {
  background-color: royalblue;
}
</style>
