<template>
    <div>
        <b-container class="b-con">
            <b-row class="b-row">
                <b-col @submit="onSubmit">
                    <b-form class="b-form">
                    <h6 class="msg-info">Adopter Sign up</h6>
                        <b-form-group label ="E-mail address">
                            <b-form-input
                             required
                             class="form-control-label text-muted"
                             placeholder="Please enter your e-mail address"
                             v-model="form.emailAddress"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Password">
                            <b-form-input
                             required
                             class="form-control-label text-muted"
                             placeholder="Please enter your password"
                             v-model="form.password"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Name">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="Please enter the name of your adoption center"
                             v-model="form.name"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Address">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="Address"
                             v-model="form.address"
                            >
                            </b-form-input>
                           </b-form-group>

                    <div class="row justify-content-center my-3 px-3">
                        <b-button
                                    class="btn-block btn-color"
                                    >Create account
                        </b-button>
                    </div>

                    <div class="bottom text-center mb-5">
                        <p href="#"
                                    class="sm-text mx-auto mb-3"
                                    >Already have an account?
                            <b-button
                                        class="btn btn-white ml-2" @click="goToHome"
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
// import { Api } from '@Api'

export default {
  name: 'adopter-signup-form',
  data() {
    return {
      header: 'Signup information',
      form: {
        emailAddress: '',
        password: '',
        name: '',
        address: ''
      }
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>
