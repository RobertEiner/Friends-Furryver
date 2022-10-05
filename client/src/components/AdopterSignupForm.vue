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

                           <b-form-group label ="SSN">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="SSN"
                             v-model="form.ssn"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Name">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="Please enter your full name"
                             v-model="form.name"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Age">
                            <b-form-input type="number"
                             class="form-control-label text-muted"
                             placeholder="Age"
                             v-model="form.age"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Preferred species">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="Age"
                             v-model="form.species"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Preferred size">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="Size"
                             v-model="form.size"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Hours">
                            <b-form-input
                             required
                             class="form-control-label text-muted"
                             placeholder="How many hours of company can you provide?"
                             v-model="form.hours"
                            >
                            </b-form-input>
                           </b-form-group>

                           <b-form-group label ="Personality">
                            <b-form-input
                             class="form-control-label text-muted"
                             placeholder="What personality would you like your pet to have?"
                             v-model="form.personality"
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
        ssn: '',
        name: '',
        age: '',
        species: '',
        size: '',
        hours: '',
        personality: ''
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
