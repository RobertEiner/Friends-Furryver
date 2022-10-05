<template>
    <div>
        <body>
              <home-login-signup-style></home-login-signup-style>
              <div class="container px-4 py-5 mx-auto">
                  <div class="card card0">
                      <div class="d-flex flex-lg-row flex-column-reverse">
                          <div class="card card1">
                              <div class="row justify-content-center my-auto">
                                  <div class="col-md-8 col-10 my-5">
                                      <div class="row justify-content-center px-3 mb-3">
                                          <img id="logo" src='../Assets/pet-house.png'>
                                      </div>
                                  <h3 class="mb-3 text-center heading">Welcome to Friends Furryver</h3>
                              </div>
                      <adoption-center-signup-form></adoption-center-signup-form>
                  </div>
              </div>
              <div class="card card2">
                  <div class="row mx-2">
                    <h3 class="text-black justify-content-center pt-5 pb-5">We are more than just a company</h3>
                  </div>
                  <div class ="row mx-auto mb-5">
                              <small class="text-black">
                                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                              </small>
                      </div>
                      <!-- <div class="row mx-auto">
                      <img src="../Assets/pets_big.png" class="img-fluid" />
                  </div> -->
              </div>
                      </div>
                  </div>
              </div>
          </body>
      </div>
  </template>

<script>
// @ is an alias to /src
// import { Api } from '@/Api'
import AdoptionCenterSignupForm from '@/components/AdoptionCenterSignupForm.vue'
import HomeLoginSignupStyle from '@/components/HomeLoginSignupStyle.vue'

export default {
  name: 'adopterSignup',
  components: {
    'adoption-center-signup-form': AdoptionCenterSignupForm,
    'home-login-signup-style': HomeLoginSignupStyle
  },
  methods: {
  }
}
</script>

<!-- Based on template from https://bbbootstrap.com/snippets/login-form-information-text-67856111 -->
