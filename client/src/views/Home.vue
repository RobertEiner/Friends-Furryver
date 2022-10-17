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
                  <h3 class="mb- text-center heading">
                    Welcome to Friends Furryver!
                  </h3>

                  <h6 class="msg-info">Please log into your account.</h6>

                  <div class="row justify-content-center my-3 px-3">
                    <b-button
                      class="btn-block btn-color"
                      @click="goToAdoptionCenterLogin"
                      >Login as Adoption Center
                    </b-button>
                  </div>

                  <div class="row justify-content-center my-3 px-3">
                    <b-button
                      class="btn-block btn-color"
                      @click="goToAdopterLogin"
                      >Login as Adopter
                    </b-button>
                  </div>
                </div>
              </div>

              <div class="bottom text-center mb-5">
                <p href="#" class="sm-text mx-auto mb-3">
                  Don't have an account?
                  <b-button class="btn btn-white ml-2" @click="goToPrelSignup"
                    >Create new account
                  </b-button>
                </p>
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
              <div class="row mx-auto">
                <img src="../Assets/home.png" class ="responsive mx-auto mb-auto">
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

export default {
  name: 'home',
  components: {},
  methods: {
    goToAdopterLogin() {
      this.$router.push('/AdopterLogin')
    },
    goToAdoptionCenterLogin() {
      this.$router.push('/AdoptionCenterLogin')
    },
    goToPrelSignup() {
      this.$router.push('/PrelSignupPage')
    }
  }
}
</script>

<!-- Based on template from https://bbbootstrap.com/snippets/login-form-information-text-67856111 -->
<!-- Login and signup with authentication done based on the tutorial from https://codesource.io/setting-up-vue-authentication-using-expressjs-mongodb-and-jwt/ -->
