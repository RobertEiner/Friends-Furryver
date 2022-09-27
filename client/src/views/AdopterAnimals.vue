<template>
  <div>
    <navbar-adopter
      firstTab="Animals"
      secondTab="Applications"
      thirdTab="Profile"
    />
  </div>
</template>

<script>
import { Api } from '@/Api'
import NavbarAdopter from '@/components/NavbarAdopter.vue'

export default {
  name: 'adopter',
  components: {
    'navbar-adopter': NavbarAdopter
  },

  mounted() {
    Api.get('/animals').then((response) => {
      this.animals = response.data.Animals
    })
  },

  data() {
    return {
      animals: []
    }
  }
}
</script>
