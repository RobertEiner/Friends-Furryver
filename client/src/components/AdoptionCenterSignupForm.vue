<template>
  <div>
    <b-container class="b-con">
      <b-row class="b-row">
        <b-col>
          <b-form id="adoptionCenter" class="b-form" @submit.prevent="registerAdoptionCenter">
            <h6 class="msg-info">Adopter Sign up</h6>
            <b-form-group label="E-mail address">
              <b-form-input
                required
                class="form-control-label text-muted"
                placeholder="Please enter your e-mail address"
                v-model="registerAdCenter.email"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Password">
              <b-form-input
                required
                type="password"
                class="form-control-label text-muted"
                placeholder="Please enter your password"
                v-model="registerAdCenter.password"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Name">
              <b-form-input
                required
                class="form-control-label text-muted"
                placeholder="Please enter the name of your adoption center"
                v-model="registerAdCenter.name"
              >
              </b-form-input>
            </b-form-group>

            <b-form-group label="Address">
              <b-form-input
                class="form-control-label text-muted"
                placeholder="Address"
                v-model="registerAdCenter.address"
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
  name: 'adoption-center-signup-form',
  data() {
    return {
      header: 'Signup information',
      registerAdCenter: {
        email: '',
        password: '',
        name: '',
        address: ''
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    async registerAdoptionCenter() {
      console.log(this.registerAdCenter)
      try {
        const response = await Api.post('/adoptionCenters/register', this.registerAdCenter)
        console.log(response)
        const token = response.data.token
        if (token) {
          localStorage.setItem('jwt', token)
          this.$router.push('/AdoptionCenterLogin')
          swal('Success', 'Registration Was successful', 'success')
        } else {
          swal('Error', 'Something Went Wrong', 'error')
        }
      } catch (err) {
        if (err) {
          console.log(err)
          swal('Error', err.message, 'error')
        } else {
          swal('Error', err.data.err.message, 'error')
        }
      }
    }
  }
}
</script>
