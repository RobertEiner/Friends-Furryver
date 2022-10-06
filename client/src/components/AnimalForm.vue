<template>
  <b-container class="b-con">
    <b-row class="b-row">
      <b-col>
        <img src="../Assets/pet-house.png" alt="" />
      </b-col>
      <b-col @submit="onSubmit">
        <h1>{{ header }}</h1>
        <b-form class="b-form">
          <b-form-group v-if="this.formType === 'add-animal'" label="Species">
            <b-form-select
              required
              v-model="form.species"
              :options="alternativesSpecies"
              size="sm"
              placeholder="Select an option"
            >
            </b-form-select>
          </b-form-group>

          <b-form-group v-else label="Species">
            <b-form-select
              v-model="form.species"
              :options="alternativesSpecies"
              size="sm"
              placeholder="Select an option"
            >
            </b-form-select>
          </b-form-group>

          <b-form-group v-if="this.formType === 'add-animal'" label="Size">
            <b-form-input

              required
              size="sm"
              placeholder="Enter size"
              v-model="form.size"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group v-else label="Size">
            <b-form-input
              size="sm"
              placeholder="Enter size"
              v-model="form.size"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Breed">
            <b-form-input

              size="sm"
              placeholder="Enter breed"
              v-model="form.breed"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Health status">
            <b-form-input
              size="sm"
              placeholder="Enter health status"
              v-model="form.healthStatus"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Personality">
            <b-form-input
              size="sm"
              placeholder="Enter personality"
              v-model="form.personality"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Gender">
            <b-form-select
              v-model="form.gender"
              :options="alternativesGender"
              size="sm"
              placeholder="Select an option"
            >
            </b-form-select>
          </b-form-group>

          <b-form-group label="Age">
            <b-form-input size="sm" placeholder="Enter age" v-model="form.age">
            </b-form-input>
          </b-form-group>

          <b-form-group v-if="this.formType === 'add-animal'" label="Hours">
            <b-form-input
              required
              size="sm"
              placeholder="Physical activity needed"
              v-model="form.hours"
            >
            </b-form-input>
          </b-form-group>

          <b-form-group v-else label="Hours">
            <b-form-input
              size="sm"
              placeholder="Physical activity needed"
              v-model="form.hours"
            >
            </b-form-input>
          </b-form-group>

          <!-- <b-form-group label="Upload image">
          <b-form-file
            placeholder="Choose an image.."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <div class="mt-3">Selected file: {{ file1 ? file1.name : '' }}</div>
            </b-form-group>-->
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
        { value: 'Dog', text: 'Dog' },
        { value: 'Cat', text: 'Cat' },
        { value: 'Bird', text: 'Bird' },
        { value: 'Rabbit', text: 'Rabbit' },
        { value: 'Fish', text: 'Fish' }
      ],
      alternativesGender: [
        { value: 'Female', text: 'Female' },
        { value: 'Male', text: 'Male' }
      ],
      header: 'Animal information',
      form: {
        species: '',
        size: '',
        breed: '',
        healthStatus: '',
        personality: '',
        gender: '',
        age: '',
        hours: ''
      }
    }
  },
  methods: {
    AddOrUpdateAnimal() {
      const animalFormData = this.form

      if (this.formType === 'add-animal') {
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
      } else if (this.formType === 'update-animal') {
        Api.patch(`/animals/${this.$route.params.animalId}`, animalFormData)
          .then(response => {
            console.log(response.data)
            console.log('HA')
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    onSubmit() {
      this.AddOrUpdateAnimal()
      this.goToAdoptionCenterView()
    },
    async goToAdoptionCenterView() {
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
</style>

<!--Reference for inspiration when creating this form https://bootstrap-vue.org/docs/components/form-->
