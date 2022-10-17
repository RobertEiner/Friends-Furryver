<template>
  <b-container class="b-con">
    <b-row class="b-row">
      <b-col @submit.prevent="onSubmit" v-if="animalCreated === false">
        <h1>{{ header }}</h1>
        <p v-if="emptyForm === true" class="empty-input">
          Please fill in atleast one field
        </p>
        <b-form class="b-form">
          <b-form-group v-if="this.formType === 'add-animal'" label="Species">
            <p v-if="invalidFormInput === true" class="invalid-input">
              Please choose a species
            </p>
            <b-form-select
              v-model="form.species"
              :options="alternativesSpecies"
              size="sm"
            >
              <template #first>
                <option value="" disabled selected>Select species</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group v-if="this.formType === 'add-animal'" label="Size">
            <p v-if="invalidFormInput === true" class="invalid-input">
              Please choose a size
            </p>
            <b-form-select
              size="sm"
              placeholder="Enter size"
              v-model="form.size"
              :options="alternativesSizes"
              ><template #first>
                <option value="" disabled selected>Select size</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group v-else label="Size">
            <b-form-select
              size="sm"
              placeholder="Enter size"
              v-model="form.size"
              :options="alternativesSizes"
              ><template #first>
                <option value="" disabled selected>Select size</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Health status">
            <b-form-select
              size="sm"
              placeholder="Enter health status"
              v-model="form.healthStatus"
              :options="alternativesHealthStatus"
              ><template #first>
                <option value="" disabled selected>Select health status</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Personality">
            <b-form-select
              size="sm"
              placeholder="Enter personality"
              v-model="form.personality"
              :options="alternativesPersonality"
              ><template #first>
                <option value="" disabled selected>Select personality</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group v-if="this.formType === 'add-animal'" label="Sex">
            <b-form-select
              v-model="form.gender"
              :options="alternativesGender"
              size="sm"
              placeholder="Select an option"
              ><template #first>
                <option value="" disabled selected>Select sex</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Age">
            <b-form-select
              size="sm"
              placeholder="Enter age"
              v-model="form.age"
              :options="alternativesAge"
            >
              <template #first>
                <option value="" disabled selected>Select age</option>
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group
            v-if="this.formType === 'add-animal'"
            label="Select hours of company needed"
          >
            <p v-if="invalidFormInput === true" class="invalid-input">
              Please choose amount of hours needed
            </p>
            <b-form-select
              size="sm"
              placeholder="Hours of company needed per day"
              v-model="form.hours"
              :options="alternativesHours"
            >
              <template #first>
                <option value="" disabled selected
                  >Select hours of company needed</option
                >
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group v-else label="Select hours of company needed">
            <b-form-select
              size="sm"
              placeholder="Physical activity needed"
              v-model="form.hours"
              :options="alternativesHours"
            >
              <template #first>
                <option value="" disabled selected
                  >Select hours of company needed per day</option
                >
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Specify other needs of the animal">
            <b-form-input
              size="sm"
              placeholder="Leave blank if there are no other needs"
              v-model="form.otherNeeds"
            >
            </b-form-input>
          </b-form-group>

          <div v-if="this.formType === 'add-animal'">
            <b-button
              class="add-button"
              type="submit"
              size="md"
              variant="primary"
              >Add animal</b-button
            >
          </div>
          <div v-else>
            <b-button
              class="add-button"
              type="submit"
              size="md"
              variant="primary"
              >Update animal</b-button
            >
          </div>
        </b-form>
      </b-col>
      <!-- Attribution for image/icon source-->
      <!-- <a href="https://www.flaticon.com/free-icons/tick" title="tick icons">Tick icons created by Octopocto - Flaticon</a> -->
      <b-col v-else class="success-column">
        <b-img
          :src="require('../Assets/check-mark.png')"
          class="success-image"
        ></b-img>
        <h3 v-if="this.formType === 'add-animal'">
          Animal created successsfully
        </h3>
        <h3 v-else>Animal updated successsfully</h3>
        <b-button
          class="to-main-page-button"
          size="sm"
          variant="primary"
          @click="goToMainPage()"
          >Back to main page</b-button
        >
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'animal-form',
  props: ['formType'],

  data() {
    return {
      alternativesSpecies: [
        { value: 'dog', text: 'Dog' },
        { value: 'cat', text: 'Cat' },
        { value: 'bird', text: 'Bird' },
        { value: 'rabbit', text: 'Rabbit' }
      ],
      alternativesGender: [
        { value: 'female', text: 'Female' },
        { value: 'male', text: 'Male' }
      ],
      alternativesSizes: [
        { value: 'small', text: 'Small' },
        { value: 'medium', text: 'Medium' },
        { value: 'big', text: 'Big' }
      ],
      alternativesHealthStatus: [
        { value: 'excellent health', text: 'Excellent health' },
        { value: 'healthy', text: 'Healthy' },
        { value: 'poor health', text: 'Poor health' }
      ],
      alternativesPersonality: [
        { value: 'energetic', text: 'Energetic' },
        { value: 'playful', text: 'Playful' },
        { value: 'calm', text: 'Calm' },
        { value: 'lazy', text: 'Lazy' }
      ],
      alternativesAge: [
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' },
        { value: '7', text: '7' },
        { value: '8', text: '8' }
      ],
      alternativesHours: [
        { value: '1', text: '1 hour' },
        { value: '2', text: '2 hours' },
        { value: '3', text: '3 hours' },
        { value: '4', text: '4 hours' },
        { value: '5', text: '5 hours' },
        { value: '6', text: '6 hours' }
      ],
      header: 'Animal information',
      form: {
        species: '',
        size: '',
        healthStatus: '',
        personality: '',
        gender: '',
        age: '',
        hours: '',
        otherNeeds: ''
      },
      animalCreated: false,
      emptyForm: false,
      invalidFormInput: false
    }
  },
  methods: {
    checkIfInputInUpdateForm() {
      let fieldHasInput = false
      for (const inputKey in this.form) {
        const value = this.form[inputKey]
        if (value !== '') {
          fieldHasInput = true
        }
      }
      return fieldHasInput
    },

    checkIfInputInAddForm() {
      let formHasEnoughInput = false
      if (this.form.species && this.form.size && this.form.hours) {
        formHasEnoughInput = true
      }
      return formHasEnoughInput
    },

    addAnimal() {
      const animalFormData = this.form
      Api.post(
        `/adoptionCenters/${this.$route.params.id}/animals`,
        animalFormData
      )
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateAnimal() {
      const animalFormData = this.form
      Api.patch(`/animals/${this.$route.params.animalId}`, animalFormData)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },

    onSubmit() {
      if (this.formType === 'add-animal') {
        const addFormHasEnoughInput = this.checkIfInputInAddForm()
        if (addFormHasEnoughInput === false) {
          this.invalidFormInput = true
        } else {
          this.addAnimal()
          this.showCreationMessage()
        }
      } else {
        const updateFormHasInput = this.checkIfInputInUpdateForm()
        if (updateFormHasInput === false) {
          this.emptyForm = true
        } else {
          this.updateAnimal()
          this.showCreationMessage()
        }
      }
    },
    showCreationMessage() {
      this.animalCreated = true
    },
    goToMainPage() {
      this.$router.push(`/adoptionCenters/${this.$route.params.id}`)
    }
  }
}
</script>

<style scoped>
h1 {
  display: block;
  font-family: 'Pacifico', cursive;
}
.b-row {
  text-align: left;
}

.b-con {
  display: flex;
  justify-content: center;
  margin-top: 2%;
  color: white;
}

.add-button {
  margin: 5% 0;
}

.background-div {
  background-color: rgb(119, 200, 246);
}

.b-form {
  display: inline-block;
}

#input {
  border: none;
}

.empty-input {
  color: rgb(255, 72, 72);
}

.invalid-input {
  color: rgb(255, 72, 72);
}

.success-column {
  text-align: center;
}

.success-image {
  max-width: 15rem;
}

.to-main-page-button {
  margin-top: 2%;
}

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>

<!--Reference for inspiration when creating this form https://bootstrap-vue.org/docs/components/form-->
