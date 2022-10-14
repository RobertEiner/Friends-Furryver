<template>
  <div>
    <navbar />
    <adopter-tabs
      firstTab="Animals"
      secondTab="Applications"
      thirdTab="Profile"
    />
  </div>
</template>

<script>
import AdopterTabs from '@/components/AdopterTabs.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'adopter',
  components: {
    navbar: Navbar,
    'adopter-tabs': AdopterTabs
  },
  data() {
    return {
      animals: []
    }
  }
}
</script>
