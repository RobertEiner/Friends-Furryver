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
                <adoption-center-signup-form></adoption-center-signup-form>
              </div>
            </div>
            <div class="card card2">
              <div class="row mx-auto">
                <h3 class="mx-auto text-black pt-5 pb-5 pl-3 pr-3">
                  No pet deserves to be alone.
                </h3>
              </div>
              <div class="row mx-auto pl-3 pr-3">
                <p class="text-description"
                  >
                  Are you an animal lover? Would you like to make a new friend? Or maybe you are an
                  adoption center looking for a platform to advertise your furry tenants to possible adopters?
                  You're just in the right place.

              </p>
              </div>
              <div class="row mb-5 mt-5"></div>
              <div class="row auto">
                <img src="../Assets/adoption_center.png" class ="responsive my-auto">
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
import AdoptionCenterSignupForm from '@/components/AdoptionCenterSignupForm.vue'

export default {
  name: 'adopterSignup',
  components: {
    'adoption-center-signup-form': AdoptionCenterSignupForm
  },
  methods: {}
}
</script>

<!-- Based on template from https://bbbootstrap.com/snippets/login-form-information-text-67856111 -->
<!-- Login and signup with authentication done based on the tutorial from https://codesource.io/setting-up-vue-authentication-using-expressjs-mongodb-and-jwt/ -->
