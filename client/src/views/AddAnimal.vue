<template>
<div>
  <navbar></navbar>
  <animal-form formType="add-animal"></animal-form>
</div>
</template>

<script>
import AddAnimalForm from '@/components/AddAnimalForm.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'add-animal',
  components: {
    'animal-form': AddAnimalForm,
    Navbar
  }
}
</script>

<style>
</style>
