<template>
  <div>
    <b-container class="b-con">
      <b-row class="b-row">
        <b-col>
          <b-form class="b-form" @submit.prevent="registerUser">
            <h6 class="msg-info">Adopter sign up</h6>
            <b-form-group label="E-mail address">
              <b-form-input
                id="email"
                name="email"
                class="form-control-label text-muted"
                placeholder="Please enter your e-mail address"
                v-model="register.email"
                v-validate="{ required: true, min: 6, email: true }"
                :state="validateState('email')"
                aria-describedby="email-live-feedback"
                data-vv-as="email"
              >
              </b-form-input>
              <b-form-invalid-feedback id="email-live-feedback">{{
                veeErrors.first('email')
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input
                id="password"
                name="password"
                type="password"
                class="form-control-label text-muted"
                placeholder="Please enter your password"
                v-model="register.password"
                v-validate="{ required: true, min: 6, alpha_dash: true }"
                :state="validateState('password')"
                aria-describedby="password-live-feedback"
                data-vv-as="password"
              >
              </b-form-input>
              <b-form-invalid-feedback id="password-live-feedback">{{
                veeErrors.first('password')
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="SSN">
              <b-form-input
                id="ssn"
                name="ssn"
                class="form-control-label text-muted"
                placeholder="SSN"
                v-model="register.ssn"
                v-validate="{ required: true, digits: 10 }"
                :state="validateState('ssn')"
                aria-describedby="ssn-live-feedback"
                data-vv-as="ssn"
              >
              </b-form-input>
              <b-form-invalid-feedback id="ssn-live-feedback">{{
                veeErrors.first('ssn')
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Name">
              <b-form-input
                id="name"
                name="name"
                class="form-control-label text-muted"
                placeholder="Please enter your full name"
                v-model="register.name"
                v-validate="{ required: true, min: 4, alpha_spaces: true }"
                :state="validateState('name')"
                aria-describedby="name-live-feedback"
                data-vv-as="name"
              >
              </b-form-input>
              <b-form-invalid-feedback id="name-live-feedback">{{
                veeErrors.first('name')
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Age">
              <b-form-input
                id="age"
                name="age"
                class="form-control-label text-muted"
                placeholder="Age"
                v-model="register.age"
                v-validate="{ required: true, min_value: 16, max_value: 85 }"
                :state="validateState('age')"
                aria-describedby="age-live-feedback"
                data-vv-as="age"
              >
              </b-form-input>
              <b-form-invalid-feedback id="age-live-feedback">{{
                veeErrors.first('age')
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Preferred species">
              <b-form-select
                id="species"
                name="species"
                class="form-control-label text-muted"
                placeholder="Species"
                v-model="register.petPreferences.species"
                :options="species"
              >
              </b-form-select>
            </b-form-group>

            <b-form-group label="Preferred size">
              <b-form-select
                id="size"
                name="size"
                class="form-control-label text-muted"
                placeholder="Size"
                v-model="register.petPreferences.size"
                :options="size"
              >
              </b-form-select>
            </b-form-group>

            <b-form-group
              label="How many hours of company can you provide daily?"
            >
              <b-form-select
                id="hours"
                name="hours"
                class="form-control-label text-muted"
                v-model="register.petPreferences.hours"
                v-validate="{ required: true }"
                :options="hours"
                :state="validateState('hours')"
                aria-describedby="hours-live-feedback"
                data-vv-as="hours"
              >
              </b-form-select>
              <b-form-invalid-feedback id="hours-live-feedback">{{
                veeErrors.first('hours')
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Personality">
              <b-form-select
                class="form-control-label text-muted"
                placeholder="What personality would you like your pet to have?"
                v-model="register.petPreferences.personality"
                :options="personality"
              >
              </b-form-select>
            </b-form-group>
            <div class="row justify-content-center my-3 px-3">
              <b-button class="btn-block btn-color" type="submit"
                >Create account
              </b-button>
            </div>

            <div class="bottom text-center mb-5">
              <p href="#" class="sm-text mx-auto mb-3">
                Already have an account?
                <b-button class="btn btn-white ml-2" @click="goToHome"
                  >Login
                </b-button>
              </p>
            </div>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style scoped src="@/Assets/HomeLoginSignupStyle.css"></style>

<script>
import { Api } from '@/Api'
import swal from 'sweetalert'
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors'
})

export default {
  name: 'adopter-signup-form',
  data() {
    return {
      header: 'Signup information',
      species: [
        { value: null, text: 'Choose one' },
        { value: 'dog', text: 'Dog' },
        { value: 'cat', text: 'Cat' },
        { value: 'bird', text: 'Bird' },
        { value: 'rabbit', text: 'Rabbit' }
      ],
      size: [
        { value: null, text: 'Choose one' },
        { value: 'small', text: 'Small' },
        { value: 'medium', text: 'Medium' },
        { value: 'big', text: 'Big' }
      ],
      hours: [
        { value: null, text: 'Choose one' },
        { value: '1', text: '1 hour' },
        { value: '2', text: '2 hours' },
        { value: '3', text: '3 hours' },
        { value: '4', text: '4 hours' },
        { value: '5', text: '5 hours' },
        { value: '6', text: '6 hours' }
      ],
      personality: [
        { value: null, text: 'Choose one' },
        { value: 'energetic', text: 'Energetic' },
        { value: 'playful', text: 'Playful' },
        { value: 'calm', text: 'Calm' },
        { value: 'lazy', text: 'Lazy' }
      ],
      register: {
        email: '',
        password: '',
        ssn: '',
        name: '',
        age: '',
        petPreferences: {
          species: null,
          size: null,
          hours: null,
          personality: null
        }
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },

    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    async registerUser() {
      this.$validator.validateAll().then(async result => {
        if (!result) {
          return
        }
        try {
          const response = await Api.post('/adopters/register', this.register)
          const token = response.data.token
          if (token) {
            localStorage.setItem('jwt', token)
            this.$router.push('/AdopterLogin')
            swal('Success', 'Registration Was successful', 'success')
          } else {
            swal('Error', 'Something Went Wrong', 'error')
          }
        } catch (err) {
          if (err) {
            console.log(err)
            swal('Error', err.data.message, 'error')
          } else {
            swal('Error', err.data.err.message, 'error')
          }
        }
      })
    }
  }
}
</script>
