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
import NavbarAdopter from '@/components/NavbarAdopter.vue'

export default {
  name: 'adopter',
  components: {
    'navbar-adopter': NavbarAdopter
  },
  data() {
    return {
      animals: []
    }
  }
}
</script>
