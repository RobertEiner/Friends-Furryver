<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <b-col sm=12 md=6 lg=4 :key="animal._id" v-for="animal in animals">
          <animal-card :animal="animal" @apply="removeAnimalCard">
          </animal-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AnimalCard from '@/components/AnimalCard.vue'

export default {
  name: 'animals-list',
  components: {
    'animal-card': AnimalCard
  },
  mounted() {
    this.updateList([])
  },
  data() {
    return {
      animals: []
    }
  },
  methods: {
    updateList(species) {
      if (species.length) {
        console.log('----------')
        console.log(species)
        Api.get(`/adopters/${this.$route.params.id}/animals`, {
          params: {
            species: species
          }
        })
          .then((response) => {
            this.animals = response.data.Animals
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        Api.get(`/adopters/${this.$route.params.id}/animals`)
          .then((response) => {
            this.animals = response.data.Animals
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    removeAnimalCard(removedId) {
      const index = this.animals.findIndex((animal) => animal._id === removedId)
      this.animals.splice(index, 1)
      this.$emit('newAdoptionApplication')
    }
  }
}
</script>
