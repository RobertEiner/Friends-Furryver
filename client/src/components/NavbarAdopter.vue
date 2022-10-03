<template>
  <div class="outer-div">
    <div class="inner-div">
      <div>
        <b-button v-b-toggle.collapse-1 variant="primary">Filter</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-form-group label="species:">
            <b-form-checkbox-group
              id="species-filter"
              v-model="filters"
              :options="species"
              @change="updateAnimalList"
            ></b-form-checkbox-group>
          </b-form-group>
        </b-collapse>
      </div>
      <b-tabs content-class="mt-3">
        <b-tab :title="tabOne">
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
    updateAnimalList(filters) {
      console.log(filters)
      this.$refs.animalList.updateList(filters)
    }
  },
  data() {
    return {
      tabOne: this.firstTab,
      tabTwo: this.secondTab,
      tabThree: this.thirdTab,
      adopter: this.adopterId,
      species: [
        { text: 'Dog', value: 'dog' },
        { text: 'Cat', value: 'cat' }
      ],
      filters: []
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
