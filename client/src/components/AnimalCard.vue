<template>
  <div class="margin">
    <b-card
      title="Animal"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
    >
      <b-list>
        <b-list-group-item> Size: {{ animal.size }} </b-list-group-item>
        <b-list-group-item> Species: {{ animal.species }} </b-list-group-item>
        <b-list-group-item> Breed: {{ animal.breed }} </b-list-group-item>
        <b-list-group-item>
          Personality: {{ animal.personality }}
        </b-list-group-item>
        <b-list-group-item>Gender: {{ animal.gender }}</b-list-group-item>
        <b-list-group-item>Age: {{ animal.age }}</b-list-group-item>
        <b-list-group-item>Hours needed: {{ animal.hours }}</b-list-group-item>
      </b-list>
      <b-button @click="apply" variant="success" class="applyButton"
        >Apply</b-button
      >
    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'animal-card',
  props: ['animal', 'adopterId'],
  methods: {
    apply() {
      console.log('applied')
      console.log(this.adopterId)
      Api.post('/adoption-applications', {
        status: 0,
        adoptionCenter: this.animal.adoptionCenter,
        animal: this.animal._id,
        adopter: this.adopterId
      })
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 3% 7%;
}
.applyButton {
  padding: 3%;
}
</style>
