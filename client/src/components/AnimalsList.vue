<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <b-colum sm :key="animal._id" v-for="animal in animals">
          <animal-card :animal="animal" @apply="removeAnimalCard">
          </animal-card>
        </b-colum>
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
    Api.get(`/adopters/${this.$route.params.id}/animals`)
      .then((response) => {
        this.animals = response.data.Animals
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    return {
      animals: []
    }
  },
  methods: {
    removeAnimalCard(removedId) {
      const index = this.animals.findIndex(
        (animal) => animal._id === removedId
      )
      this.animals.splice(index, 1)
    }
  }
}
</script>
