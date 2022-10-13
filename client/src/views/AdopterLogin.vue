<template>
  <div>
    <body>
      <div class="container px-4 py-5 mx-auto">
        <div class="card card0">
          <div class="d-flex flex-lg-row flex-column-reverse">
            <div class="card card1">
              <div class="row justify-content-center my-auto">
                <div class="col-md-8 col-10 my-5">
                  <div class="row justify-content-center px-3 mb-3">
                    <img id="logo" src="../Assets/pet-house.png" />
                  </div>
                  <h3 class="mb-3 text-center heading">
                    Welcome to Friends Furryver
                  </h3>
                </div>
                <adopter-login-form></adopter-login-form>
              </div>
            </div>
            <div class="card card2">
              <div class="row mx-2">
                <h3 class="text-black justify-content-center pt-5 pb-5">
                  We are more than just a company
                </h3>
              </div>
              <div class="row mx-auto mb-5">
                <small class="text-black">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </div>
</template>
<style scoped src="@/Assets/HomeLoginSignupStyle.css"></style>

<script>
// @ is an alias to /src
// import { Api } from '@/Api'
import AdopterLoginForm from '@/components/AdopterLoginForm.vue'

export default {
  name: 'AdopterLogin',
  components: {
    'adopter-login-form': AdopterLoginForm
  },
  methods: {}
}
</script>

<!-- Based on template from https://bbbootstrap.com/snippets/login-form-information-text-67856111 -->
