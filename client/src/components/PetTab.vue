<template>
  <b-container>
    <b-row>
      <b-col v-if="animals.length > 0">
        <b-card-group>
          <span v-for="animal in animals" :key="animal._id">
            <b-card
              class="animal-card"
              :title="animalEmojis[animal.species]"
              tag="article"
              bg-variant="info"
              text-variant="white"
            >
              <hr />
              <p>Species: {{ animal.species }}</p>
              <hr />

              <p>Size: {{ animal.size }}</p>
              <hr />
              <p>Health status: {{ animal.healthStatus }}</p>
              <hr />
              <p>Personality: {{ animal.personality }}</p>
              <hr />
              <p>Gender: {{ animal.gender }}</p>
              <hr />
              <p>Age: {{ animal.age }}</p>
              <hr />
              <p>Hours needed: {{ animal.hours }}</p>
              <hr />

              <b-button
                class="update-animal-button"
                size="sm"
                @click="goToUpdateAnimal(animal._id)"
                >Update animal</b-button
              >
              <b-button
                class="delete-animal-button"
                size="sm"
                @click="$emit('del-animal', animal._id)"
                >Delete animal</b-button
              >
            </b-card>
          </span>
        </b-card-group>
      </b-col>
      <b-col v-else sm="12">
        <div>
          <h5 class="no-animals-title">
            Currently, there are no animals in your adoption center
          </h5>
          <b-img
            class="no-animals-img"
            :src="require('../Assets/pet-house.png')"
            fluid
          ></b-img>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'pets-tab',
  props: ['animals'],
  data() {
    return {
      animalEmojis: {
        dog: '🐕‍🦺',
        Cat: '🐈',
        Bird: '🐦',
        Rabbit: '🐇'
      }
    }
  },

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
  margin: 2%;
  display: inline-block;
  background-color: aquamarine;
}

.delete-animal-button {
  margin: auto;
  font-size: 1em;
  display: block;
  background-color: rgb(158, 56, 56);
}

.update-animal-button {
  margin: 2% auto;
  font-size: 1em;
  display: block;
  background-color: rgb(46, 112, 179);
}

.no-animals-title {
  padding-bottom: 1%;
}

.no-animals-img {
  max-width: 15rem;
}
</style>
