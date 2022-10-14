import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AdopterLogin from './views/AdopterLogin.vue'
import AdoptionCenterLogin from './views/AdoptionCenterLogin'
import PrelSignupPage from './views/PrelSignupPage.vue'
import AdopterSignup from './views/AdopterSignup.vue'
import AdoptionCenterSignup from './views/AdoptionCenterSignup.vue'
import AdoptionCenter from './views/AdoptionCenter.vue'
import AddAnimal from './views/AddAnimal.vue'
import Adopter from './views/Adopter.vue'
import UpdateAnimal from './views/UpdateAnimal.vue'

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
      path: '/adoptionCenters/:id',
      name: 'adoption-center',
      component: AdoptionCenter
    },
    {
      path: '/adoptionCenters/:id/addAnimal',
      name: 'add-animal',
      component: AddAnimal
    },
    {
      path: '/adoptionCenters/:id/adoptionApplications',
      name: 'adoptionCenter-applications',
      component: AdoptionCenter
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
    },
    {
      path: '/AdopterLogin',
      name: '/adopter-login',
      component: AdopterLogin
    },
    {
      path: '/AdoptionCenterLogin',
      name: '/adoption-center-login',
      component: AdoptionCenterLogin
    },
    {
      path: '/adopters/:id',
      name: 'adopter',
      component: Adopter,
      meta: {
        requiresAuth: true
      },
      beforeEnter: (to, from, next) => {
        if (to.matched.some(record => record.meta.requiresAuth)) {
          if (localStorage.getItem('jwt') == null) {
            next({
              path: '/'
            })
          } else {
            next()
          }
        } else {
          next()
        }
      }
    },
    {
      path: '/adoptionCenters/:id/updateAnimal/:animalId',
      name: 'update-animal',
      component: UpdateAnimal
    }
  ]
})
