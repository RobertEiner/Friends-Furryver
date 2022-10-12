<template>
  <div>
    <b-container class="b-con">
      <b-row class="b-row">
        <b-col>
          <b-form class="b-form" @submit.prevent="registerUser">
            <h6 class="msg-info">Adopter Sign up</h6>
            <b-form-group label="E-mail address">
              <b-form-input
                required
                class="form-control-label text-muted"
                placeholder="Please enter your e-mail address"
                v-model="register.email"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input
                required
                type="password"
                class="form-control-label text-muted"
                placeholder="Please enter your password"
                v-model="register.password"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="SSN">
              <b-form-input
                class="form-control-label text-muted"
                placeholder="SSN"
                v-model="register.ssn"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Name">
              <b-form-input
                class="form-control-label text-muted"
                placeholder="Please enter your full name"
                v-model="register.name"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Age">
              <b-form-input
                type="number"
                class="form-control-label text-muted"
                placeholder="Age"
                v-model="register.age"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Preferred species">
              <b-form-input
                class="form-control-label text-muted"
                placeholder="Species"
                v-model="register.petPreferences.species"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Preferred size">
              <b-form-input
                class="form-control-label text-muted"
                placeholder="Size"
                v-model="register.petPreferences.size"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Hours">
              <b-form-input
                required
                type="number"
                class="form-control-label text-muted"
                placeholder="How many hours of company can you provide?"
                v-model="register.petPreferences.hours"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Personality">
              <b-form-input
                class="form-control-label text-muted"
                placeholder="What personality would you like your pet to have?"
                v-model="register.petPreferences.personality"
              >
              </b-form-input>
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

<script>
import { Api } from '@/Api'
import swal from 'sweetalert'

export default {
  name: 'adopter-signup-form',
  data() {
    return {
      header: 'Signup information',
      register: {
        email: '',
        password: '',
        ssn: '',
        name: '',
        age: '',
        petPreferences: {
          species: '',
          size: '',
          hours: '',
          personality: ''
        }
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    async registerUser() {
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
    }
  }
}
</script>
