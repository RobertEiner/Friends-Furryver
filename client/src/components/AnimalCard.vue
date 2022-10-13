<template>
  <div class="animal-card">
    <b-card
      :title="animalEmojis[animal.species]"
      bg-variant="info"
      tag="article"
      text-variant="white"
    >
      <hr />
      <b-card-text> Size: {{ animal.size }} </b-card-text>

      <hr />
      <b-card-text> Species: {{ animal.species }} </b-card-text>

      <hr />
      <b-card-text> Personality: {{ animal.personality }} </b-card-text>

      <hr />
      <b-card-text> Sex: {{ animal.gender }} </b-card-text>

      <hr />
      <b-card-text> Age: {{ animal.age }} </b-card-text>

      <hr />
      <b-card-text> Health status: {{ animal.healthStatus }} </b-card-text>

      <hr />
      <b-card-text> Other needs: {{ animal.otherNeeds }} </b-card-text>

      <hr />
      <b-card-text> Hours needed: {{ animal.hours }} </b-card-text>
      <hr />

      <b-button @click="apply" class="applyButton">Apply</b-button>
    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'animal-card',
  props: ['animal'],
  data() {
    return {
      animalEmojis: {
        dog: '🐕‍🦺',
        cat: '🐈',
        bird: '🐦',
        rabbit: '🐇'
      }
    }
  },
  methods: {
    apply() {
      console.log('applied')
      console.log(this.$route.params.id)
      Api.post('/adoption-applications', {
        status: 0,
        adoptionCenter: this.animal.adoptionCenter,
        animal: this.animal._id,
        adopter: this.$route.params.id
      })
      this.$emit('apply', this.animal._id)
    }
  }
}
</script>

<style scoped>
.animal-card {
  padding: 3% 7%;
}
.b-card {
  width: 17rem;
}
.applyButton {
  padding: 3%;
  background-color: rgb(32, 144, 13);
  border: solid 0.1em;
  border-color: black;
}
</style>
