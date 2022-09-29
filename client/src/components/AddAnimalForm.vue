<template>
  <div>
    <div class="background-div">
      <h1>Fill in the information for the animal</h1>
      <b-container class="b-con">
        <b-row class="b-row-class">
          <b-column @submit="onSubmit">
            <b-form>
              <b-form-group label="Species">
                <b-form-input
                  placeholder="Enter species"
                  v-model="form.species"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group label="Size">
                <b-form-input placeholder="Enter size" v-model="form.size">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Breed">
                <b-form-input placeholder="Enter breed" v-model="form.breed">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Health status">
                <b-form-input
                  placeholder="Enter health status"
                  v-model="form.healthStatus"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group label="Personality">
                <b-form-input
                  placeholder="Enter personality"
                  v-model="form.personality"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group label="Gender">
                <b-form-input placeholder="Enter gender" v-model="form.gender">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Age">
                <b-form-input placeholder="Enter age" v-model="form.age">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Hours">
                <b-form-input
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
          </b-column>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'animal-form',
  props: ['formType'],

  data() {
    return {
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
    onSubmit() {
      const animalFormData = this.form
      if (this.formType === 'add-animal') {
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
      } else if (this.formType === 'update-animal') {
        Api.patch(
          `/animals/${this.$route.params.animalId}`,
          animalFormData
        )
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style>
h1 {
  display: block;
}
.b-row-class {
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
</style>

<!--Reference for inspiration when creating this form https://bootstrap-vue.org/docs/components/form-->
