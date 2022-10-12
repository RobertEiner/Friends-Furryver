<template>
  <b-container>
    <b-row>
      <b-col  v-if="animals.length > 0">
        <span v-for="animal in animals" :key="animal._id">
          <b-card
            class="animal-card"
            title="Animal"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
          >
            <b-list-group-item>
              Species: {{ animal.species }}
            </b-list-group-item>

            <b-list-group-item> Size: {{ animal.size }} </b-list-group-item>

            <b-list-group-item>
              Health status: {{ animal.healthStatus }}
            </b-list-group-item>
            <b-list-group-item>
              Personality: {{ animal.personality }}
            </b-list-group-item>
            <b-list-group-item>Gender: {{ animal.gender }}</b-list-group-item>
            <b-list-group-item>Age: {{ animal.age }}</b-list-group-item>
            <b-list-group-item
              >Hours needed: {{ animal.hours }}</b-list-group-item
            >

            <b-button
              class="update-animal-button"
              size="sm"
              @click="goToUpdateAnimal(animal._id)"
              variant="primary"
              >Update animal</b-button
            >
            <b-button
              class="delete-animal-button"
              size="sm"
              @click="$emit('del-animal', animal._id)"
              variant="primary"
              >Delete animal</b-button
            >
          </b-card>
        </span>
      </b-col>
      <b-col v-else sm="12">
        <div>
          <h5 class="no-animals-title">
            Currently, there are no animals in your adoption center
          </h5>
          <b-img class="no-animals-img" :src="require('../Assets/pet-house.png')" fluid></b-img>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'pets-tab',
  props: ['animals'],

  methods: {
    goToUpdateAnimal(animalId) {
      this.$router.push(
        `/adoptionCenters/${this.$route.params.id}/updateAnimal/${animalId}`
      )
    }
  }
}
</script>

<style scoped>
.animal-card {
  margin: 0.5%;
  display: inline-block;
}

.delete-animal-button {
  margin: auto;
  font-size: 1em;
  display: block;
  background-color: red;
}

.update-animal-button {
  margin: 2% auto;
  font-size: 1em;
  display: block;
}

.no-animals-title {
  padding-bottom: 1%;
}

.no-animals-img {
  max-width: 15rem;
}
</style>
