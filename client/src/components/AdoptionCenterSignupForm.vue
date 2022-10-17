<template>
  <div>
    <b-container class="b-con">
      <b-row class="b-row">
        <b-col>
          <b-form
            id="adoptionCenter"
            class="b-form"
            @submit.prevent="registerAdoptionCenter"
          >
            <h6 class="msg-info">Adoption center sign up</h6>
            <b-form-group label="E-mail address">
              <b-form-input
                id="email"
                name="email"
                class="form-control-label text-muted"
                placeholder="Please enter your e-mail address"
                v-model="registerAdCenter.email"
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
                v-model="registerAdCenter.password"
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

            <b-form-group label="Name">
              <b-form-input
                id="name"
                name="name"
                class="form-control-label text-muted"
                placeholder="Please enter the name of your adoption center"
                v-model="registerAdCenter.name"
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

            <b-form-group label="Address">
              <b-form-input
                id="address"
                name="address"
                class="form-control-label text-muted"
                placeholder="Address"
                v-model="registerAdCenter.address"
                v-validate="{ required: true, min: 4 }"
                :state="validateState('address')"
                aria-describedby="address-live-feedback"
                data-vv-as="address"
              >
              </b-form-input>
              <b-form-invalid-feedback id="address-live-feedback">{{
                veeErrors.first('address')
              }}</b-form-invalid-feedback>
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
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref)
      }
      return null
    },
    async registerAdoptionCenter() {
      this.$validator.validateAll().then(async result => {
        if (!result) {
          return
        }
        try {
          const response = await Api.post(
            '/adoptionCenters/register',
            this.registerAdCenter
          )
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
            swal('Error', err.message, 'error')
          } else {
            swal('Error', err.data.err.message, 'error')
          }
        }
      })
    }
  }
}
</script>
