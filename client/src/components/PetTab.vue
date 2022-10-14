<template>
  <b-container>
    <b-row v-if="animals.length > 0">
      <b-col sm="12" md="6"  v-for="animal in animals" :key="animal._id">
        <b-card-group>
          <span>
            <b-card
              class="animal-card"
              :title="animalEmojis[animal.species]"
              tag="article"
              bg-variant="info"
              text-variant="white"

            >
              <hr />
              <b-card-text>Species: {{ animal.species }}</b-card-text>
              <hr />
              <b-card-text>Size: {{ animal.size }}</b-card-text>
              <hr />
              <b-card-text
                >Health status: {{ animal.healthStatus }}</b-card-text
              >
              <hr />
              <b-card-text>Personality: {{ animal.personality }}</b-card-text>
              <hr />

              <p>Sex: {{ animal.gender }}</p>
              <hr />
              <b-card-text>Age: {{ animal.age }}</b-card-text>
              <hr />
              <b-card-text>Hours: {{ animal.hours }}</b-card-text>
              <hr />
              <b-card-text>Other needs: {{ animal.otherNeeds }}</b-card-text>
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
    </b-row>
    <b-row v-else>
      <b-col sm="12">
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
      // Attribution for source of emojis: https://emojipedia.org/
      animalEmojis: {
        dog: '🐕‍🦺',
        cat: '🐈',
        bird: '🐦',
        rabbit: '🐇'
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
  width: 17rem;
}

.delete-animal-button {
  margin: 3% auto;
  font-size: 1em;
  display: block;
  background-color: rgb(152, 62, 62);
  border: solid 0.08em;
  border-color: black;
}

.update-animal-button {
  margin: 2% auto;
  font-size: 1em;
  display: block;
  background-color: rgb(86, 155, 73);
   border: solid 0.08em;
  border-color: black;
}

.no-animals-title {
  padding-bottom: 1%;
  font-family: 'Pacifico', cursive;
}

.no-animals-img {
  max-width: 15rem;
}

 @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>
