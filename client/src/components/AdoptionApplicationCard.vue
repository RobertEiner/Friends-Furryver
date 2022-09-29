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
        <b-list-group-item>
          Size: {{ adoptionApplication.animal.size }}
        </b-list-group-item>
        <b-list-group-item>
          Species: {{ adoptionApplication.animal.species }}
        </b-list-group-item>
        <b-list-group-item>
          Breed: {{ adoptionApplication.animal.breed }}
        </b-list-group-item>
        <b-list-group-item>
          Personality: {{ adoptionApplication.animal.personality }}
        </b-list-group-item>
        <b-list-group-item
          >Gender: {{ adoptionApplication.animal.gender }}</b-list-group-item
        >
        <b-list-group-item
          >Age: {{ adoptionApplication.animal.age }}</b-list-group-item
        >
        <b-list-group-item
          >Hours needed:
          {{ adoptionApplication.animal.hours }}</b-list-group-item
        >
      </b-list>
      <div>
        <b-badge pill variant="warning"
          >Status: {{ adoptionApplication.status }}</b-badge
        >
      </div>
      <b-button @click="deleteApplication" variant="danger">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'adoption-application-card',
  props: ['adoptionApplication'],
  methods: {
    deleteApplication() {
      this.$emit('deleteApplication', this.adoptionApplication._id)
      Api.delete(`/adoption-applications/${this.adoptionApplication._id}`)
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
