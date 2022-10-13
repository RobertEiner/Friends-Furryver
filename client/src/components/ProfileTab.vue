<template>
  <div class="outer-div">
    <b-container>
      <b-row>
        <b-col sm="12" md="6" >
          <b-img
            class="dog-img"
            :src="require('../Assets/pet-house.png')"
            rounded="top"
            fluid-grow
          ></b-img>
        </b-col>

        <b-col v-if="pageState === form" sm="12" md="6" >
          <b-card class="form-card">
            <h3>Fill in the form below</h3>
            <p v-if="error != ''" class="invalid-input">
              Please fill in atleast one field
            </p>
            <b-form class="adoptionCenter-form">
              <label for="">Name:</label>
              <b-form-input
                placeholder="Enter name"
                class="name-input"
                v-model="form.name"
              >
              </b-form-input>

              <label class="adress-label" for="">Address:</label>
              <b-form-input placeholder="Enter address" v-model="form.address">
              </b-form-input>

              <b-button
                class="submit-button"
                size="sm"
                variant="primary"
                @click="submitForm()"
                >Apply changes</b-button
              >
            </b-form>
          </b-card>
        </b-col>

        <b-col v-else>
          <b-card class="info-card">
            <h3>Adoption Center information</h3>
            <h5>Name:</h5>
            <p>{{ adoptionCenter.name }}</p>
            <h5>Address:</h5>
            <p>{{ adoptionCenter.address }}</p>
            <b-button size="sm" variant="primary" @click="pageState = form"
              >Change info</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import { Api } from '@/Api'

export default {
  name: 'profile-tab',
  props: ['adoptionCenter'],

  data() {
    return {
      pageState: '',
      form: {
        name: '',
        address: ''
      },
      error: ''
    }
  },

  methods: {
    changeState() {
      if (this.form.name || this.form.address) {
        this.pageState = ''
        this.error = ''
      }
    },

    submitForm() {
      if (!this.form.name && !this.form.address) {
        this.error = 'error occured'
      } else {
        this.updateAdoptionCenter()
        this.changeState()
        this.form.name = ''
        this.form.address = ''
      }
    },
    updateAdoptionCenter() {
      const formData = this.form
      this.$emit('update-adoptionCenter', formData)
    }
  }
}
</script>

<style scoped>

h3 {
  font-family: 'Pacifico', cursive;
}

.outer-div {
  margin-bottom: 0;
}
.info-card {
  margin-top: 30%;
  background-color: rgb(58, 172, 213);
  color: white;
}

.form-card {
  margin-top: 10%;
  background-color: rgb(58, 172, 213);
  color: white;
}
.adoptionCenter-form {
  text-align: left;
}

.name-input {
  border: none;
}

.adress-label {
  margin-top: 1%;
}

.submit-button {
  margin-top: 2%;
}

.invalid-input {
  color: rgb(255, 72, 72);
}

.dog-img {
  margin-top: 10%;
  max-width: 20rem;
}

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>
