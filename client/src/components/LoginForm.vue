<template>
<div>
    <b-container class="b-con">
        <b-row class="b-row">
            <b-col @submit="onSubmit">
                <b-form class="b-form">
                <h6 class="msg-info">Please login to your account</h6>
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
                <div class="row justify-content-center my-3 px-3">
                    <b-button
                                class="btn-block btn-color"
                                >Login to Friends Furryver
                    </b-button>
                </div>

                <div class="row justify-content-center my-2">
                    <a href="#">
                            <small
                                class="text-muted"
                                >Forgot Password?

                            </small>
                    </a>
                </div>

                <div class="bottom text-center mb-5">
                    <p href="#"
                                class="sm-text mx-auto mb-3"
                                >Don't have an account?
                        <b-button
                                    class="btn btn-white ml-2" @click="goToPrelSignup"
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

<script>
// import { Api } from '@Api'

export default {
  name: 'login-form',
  data() {
    return {
      header: 'Login Information',
      form: {
        emailAddress: '',
        password: ''
      }
    }
  },
  methods: {
    goToPrelSignup() {
      this.$router.push('/PrelSignupPage')
    }
  }
}
</script>
