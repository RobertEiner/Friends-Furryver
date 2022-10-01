<template>
  <div>
<b-container>
  <b-row>
    <b-col>
    <b-card
      title="Animal"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
    >
      <b-list-group-item> Animal ID: {{ animal._id }} </b-list-group-item>
      <b-list-group-item> Size: {{ animal.size }} </b-list-group-item>
      <b-list-group-item> Species: {{ animal.species }} </b-list-group-item>
      <b-list-group-item> Breed: {{ animal.breed }} </b-list-group-item>
      <b-list-group-item>
        Health status: {{ animal.healthStatus }}
      </b-list-group-item>
      <b-list-group-item>
        Personality: {{ animal.personality }}
      </b-list-group-item>
      <b-list-group-item>Gender: {{ animal.gender }}</b-list-group-item>
      <b-list-group-item>Age: {{ animal.age }}</b-list-group-item>
      <b-list-group-item>Hours needed: {{ animal.hours }}</b-list-group-item>

      <b-button
        class="update-animal-button"
        size="sm"
        v-on:click="goToUpdateAnimal"
        variant="primary"
        >Update animal</b-button
      >
      <b-button
        class="delete-animal-button"
        size="sm"
        v-on:click="$emit('del-animal', animal._id)"
        variant="primary"
        >Delete animal</b-button
      >
    </b-card>

    </b-col>
  </b-row>
</b-container>
  </div>
</template>

<script>
export default {
  name: 'pets-tab',
  props: ['animal'],

  methods: {
    goToUpdateAnimal() {
      this.$router.push(
        `/adoptionCenters/${this.$route.params.id}/updateAnimal/${this.animal._id}`
      )
    }
  }
}
</script>

<style scoped>
.animal-card {
  margin: 2% 2%;
}

.delete-animal-button {
  margin: auto;
  font-size: 1em;
  display: block;
  background-color: red;
}

.update-animal-button {
  margin:  2% auto;
  font-size: 1em;
  display: block;

}

</style>
