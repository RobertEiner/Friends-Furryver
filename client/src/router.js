import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
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
    }
  ]
})
