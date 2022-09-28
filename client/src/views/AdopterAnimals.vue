<template>
  <div>
    <navbar-adopter
      firstTab="Animals"
      secondTab="Applications"
      thirdTab="Profile"
      :adopterId="adopter"
    />
  </div>
</template>

<script>
import NavbarAdopter from '@/components/NavbarAdopter.vue'

export default {
  name: 'adopter',
  components: {
    'navbar-adopter': NavbarAdopter
  },
  data() {
    return {
      animals: [],
      adopter: this.$route.params.id
    }
  },
  props: ['adopterId']
}
</script>
