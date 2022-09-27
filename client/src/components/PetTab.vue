<template>
  <div>
    <b-card
      title= "Animal"
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
      <b-list-group-item> Personality: {{ animal.personality }} </b-list-group-item>
      <b-list-group-item>Gender: {{animal.gender}}</b-list-group-item>
      <b-list-group-item>Age: {{animal.age}}</b-list-group-item>
      <b-list-group-item>Hours needed: {{animal.hours}}</b-list-group-item>

      <b-button class="update-animal-button" size="lg" variant="primary">Update animal</b-button>

    </b-card>
  </div>
</template>

<script>
export default {
  name: 'pets-tab',
  props: ['animal']
}
</script>

<style scoped>
.animal-card {
  margin: 2% 2%;
}

.update-animal-button {
  margin-top: 2%;
  font-size: 1em;
}

</style>
