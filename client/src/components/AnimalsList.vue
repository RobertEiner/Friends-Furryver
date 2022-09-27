<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <b-colum sm :key="animal._id" v-for="animal in animals">
          <animal-card :animal="animal"> </animal-card>
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
    Api.get('/animals')
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
  }
}
</script>
