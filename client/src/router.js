import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PrelSignupPage from './views/PrelSignupPage.vue'
import AdopterSignup from './views/AdopterSignup.vue'
import AdoptionCenterSignup from './views/AdoptionCenterSignup.vue'
import AdoptionCenter from './views/AdoptionCenter.vue'
import AddAnimal from './views/AddAnimal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/adoptionCenter',
      name: 'adoption-center',
      component: AdoptionCenter
    },
    {
      path: '/adoptionCenter/addAnimal',
      name: 'add-animal',
      component: AddAnimal
    },
    {
      path: '/PrelSignupPage',
      name: '/prel-signup-page',
      component: PrelSignupPage
    },
    {
      path: '/AdopterSignup',
      name: 'adopter-signup',
      component: AdopterSignup
    },
    {
      path: '/AdoptionCenterSignup',
      name: 'adoption-center-signup',
      component: AdoptionCenterSignup
    }
  ]
})
