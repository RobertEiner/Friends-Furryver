<template>
  <b-container class="b-con">
    <b-row class="b-row">
      <b-col md="6" sm="12">
        <b-img
          :src="require('../Assets/pexels-amal-santhosh-662417.jpg')"
          fluid
        ></b-img>
      </b-col>
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

          <b-form-group v-if="this.formType === 'add-animal'" label="Hours">
            <p v-if="invalidFormInput === true" class="invalid-input">
              Please choose a species
            </p>
            <b-form-select
              size="sm"
              placeholder="Physical activity needed"
              v-model="form.hours"
              :options="alternativesHours"
            >
              <template #first>
                <option value="" disabled selected
                  >Select hours of physical activity needed</option
                >
              </template>
            </b-form-select>
          </b-form-group>

          <b-form-group v-else label="Hours">
            <b-form-select
              size="sm"
              placeholder="Physical activity needed"
              v-model="form.hours"
              :options="alternativesHours"
            >
              <template #first>
                <option value="" disabled selected
                  >Select hours of physical activity needed</option
                >
              </template>
            </b-form-select>
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
      <!-- Attribution for image source-->
      <!-- <a href="https://www.flaticon.com/free-icons/tick" title="tick icons">Tick icons created by Octopocto - Flaticon</a> -->
      <b-col v-else>
        <b-img
          :src="require('../Assets/check-mark.png')"
          class="success-image"
        ></b-img>
        <h1 v-if="this.formType === 'add-animal'">
          Animal created successsfully
        </h1>
        <h1 v-else>Animal updated successsfully</h1>
        <b-button size="sm" variant="primary" @click="goToMainPage()"
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
        { text: 'Dog', value: 'Dog' },
        { value: 'Cat', text: 'Cat' },
        { value: 'Bird', text: 'Bird' },
        { value: 'Rabbit', text: 'Rabbit' }
      ],
      alternativesGender: [
        { value: 'Female', text: 'Female' },
        { value: 'Male', text: 'Male' }
      ],
      alternativesSizes: [
        { value: 'Small', text: 'Small' },
        { value: 'Medium', text: 'Medium' },
        { value: 'Big', text: 'Big' }
      ],
      alternativesHealthStatus: [
        { value: 'Excellent health', text: 'Excellent health' },
        { value: 'Healthy', text: 'Healthy' },
        { value: 'Poor health', text: 'Poor health' }
      ],
      alternativesPersonality: [
        { value: 'Energetic', text: 'Energetic' },
        { value: 'Playful', text: 'Playful' },
        { value: 'Calm', text: 'Calm' }
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
        { value: '1', text: '1' },
        { value: '2', text: '2' },
        { value: '3', text: '3' },
        { value: '4', text: '4' },
        { value: '5', text: '5' },
        { value: '6', text: '6' }
      ],
      header: 'Animal information',
      form: {
        species: '',
        size: '',
        healthStatus: '',
        personality: '',
        gender: '',
        age: '',
        hours: ''
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
          console.log('HA')
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
          console.log('HA')
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
          console.log('add error')
        } else {
          this.addAnimal()
          this.showCreationMessage()
        }
      } else {
        const updateFormHasInput = this.checkIfInputInUpdateForm()
        if (updateFormHasInput === false) {
          this.emptyForm = true
          console.log('errororororor')
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
}
.b-row {
  text-align: left;
}

.b-con {
  display: flex;
  justify-content: center;
  margin-top: 2%;
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

.success-image {
  max-width: 15rem;
}
</style>

<!--Reference for inspiration when creating this form https://bootstrap-vue.org/docs/components/form-->
