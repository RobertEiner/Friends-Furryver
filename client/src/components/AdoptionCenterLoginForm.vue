<template>
  <div>
    <b-container class="b-con">
      <b-row class="b-row">
        <b-col>
          <b-form class="b-form" @submit.prevent="loginAdCenter">
            <h6 class="msg-info">Please login to your account</h6>
            <b-form-group label="E-mail address">
              <b-form-input
                id="email"
                name="email"
                class="form-control-label text-muted"
                placeholder="Please enter your e-mail address"
                v-model="login.email"
                v-validate="{ required: true, email: true }"
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
                v-model="login.password"
                v-validate="{ required: true }"
                :state="validateState('password')"
                aria-describedby="password-live-feedback"
                data-vv-as="password"
              >
              </b-form-input>
              <b-form-invalid-feedback id="password-live-feedback">{{
                veeErrors.first('password')
              }}</b-form-invalid-feedback>
            </b-form-group>
            <div class="row justify-content-center my-3 px-3">
              <b-button class="btn-block btn-color" type="submit"
                >Login to Friends Furryver
              </b-button>
            </div>

            <div class="row justify-content-center my-2">
              <a href="#">
                <small class="text-muted">Forgot Password? </small>
              </a>
            </div>

            <div class="bottom text-center mb-5">
              <p href="#" class="sm-text mx-auto mb-3">
                Don't have an account?
                <b-button class="btn btn-white ml-2" @click="goToPrelSignup"
                  >Create new account
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
import VueJwtDecode from 'vue-jwt-decode'
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  errorBagName: 'veeErrors'
})

export default {
  name: 'ad-center-login-form',
  data() {
    return {
      header: 'Login Information',
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    goToPrelSignup() {
      this.$router.push('/PrelSignupPage')
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
    async loginAdCenter() {
      this.$validator.validateAll().then(async result => {
        if (!result) {
          return
        }
        try {
          const response = await Api.post('/adoptionCenters/login', this.login)
          const token = response.data.token
          localStorage.setItem('jwt', token)
          if (token) {
            swal('Success', 'Login Successful', 'success')
            const adoptionCenter = VueJwtDecode.decode(token)
            this.$router.push(`/AdoptionCenters/${adoptionCenter._id}`)
          }
        } catch (err) {
          swal('Login unsuccessful', 'Invalid login details', 'error')
        }
      })
    }
  }
}
</script>
