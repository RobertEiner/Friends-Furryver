<template>
  <b-container class="adopterProfileInfoTab">
    <b-col class="mx-auto" sm="12" md="4" v-if="changeInfo">
      <b-card class="form-card">
        <b-form class="adopter-profile-form" @submit.prevent="updateProfile">
          <b-form-group id="input-group-1" label="Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              placeholder="New name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Prefered pet species:"
            label-for="input-2"
          >
            <b-form-select
              id="input-2"
              v-model="form.petPreferences.species"
              :options="['dog', 'cat', 'rabbit', 'bird']"
              value="null"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Prefered pet size:"
            label-for="input-3"
          >
            <b-form-select
              id="input-3"
              v-model="form.petPreferences.size"
              :options="['small', 'medium', 'big']"
              value="null"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Availabe hours:"
            label-for="input-4"
          >
            <b-form-select
              id="input-4"
              v-model="form.petPreferences.hours"
              :options="['1', '2', '3', '4', '5', '6']"
              value="null"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="input-group-5"
            label="Pet personality"
            label-for="input-4"
          >
            <b-form-select
              id="input-5"
              v-model="form.petPreferences.personality"
              :options="['fun', 'calm', 'active']"
              value="null"
            ></b-form-select>
          </b-form-group>
          <b-button align class="submit-update-form-button" type="submit">submit</b-button>
          <b-button variant="danger" class="cancel-update-button" @click="updateteChangeInfo">cancel</b-button>
        </b-form>
      </b-card>
    </b-col>

    <b-col class="mx-auto" sm="12" md="4" v-else-if="adopter">
      <h1 class="adoperName">Hi, {{ adopter.name }}!</h1>
      <div class="pet-preferences">
        <b-card class="info-card" title="Your pet preferences">
          <h5>Species: {{ adopter.petPreferences.species }}</h5>
          <p></p>
          <h5>Size: {{ adopter.petPreferences.size }}</h5>
          <p></p>
          <h5>Hours: {{ adopter.petPreferences.hours }}</h5>
          <p></p>
          <h5>Personality: {{ adopter.petPreferences.personality }}</h5>
          <p></p>
        </b-card>

        <b-button class="update-button" @click="updateteChangeInfo">
          Update profile
        </b-button>
      </div>
    </b-col>
  </b-container>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'adopter-profile',
  props: ['adopter'],
  data() {
    return {
      changeInfo: false,
      form: {
        name: '',
        petPreferences: {
          species: '',
          size: '',
          hours: ''
        }
      }
    }
  },
  methods: {
    updateteChangeInfo() {
      this.changeInfo = !this.changeInfo
    },
    updateProfile() {
      const formData = this.form
      Api.patch(`/adopters/${this.$route.params.id}`, formData)
        .then((response) => {
          console.log(response)
          this.$emit('adopterProfileUpdated')
          this.updateteChangeInfo()
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(this.form.petPreferences.hours)
    }
  }
}
</script>

<style scoped>
.info-card {
  margin-top: 10%;
  background-color: rgb(216, 238, 251);
}
.submit-update-form-button{
  padding: 3%;
  background-color: rgb(33, 158, 231);
  border: solid 0.1em;
  border-color: black;
  margin: 10%;
}
.cancel-update-button{
  padding: 3%;
  border: solid 0.1em;
  border-color: black;
  margin: 10%;
}
.update-button {
  padding: 3%;
  border: solid 0.1em;
  border-color: black;
  margin: 10%;
}
</style>
