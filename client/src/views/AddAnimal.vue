<template>
<div>
  <navbar></navbar>
  <animal-form formType="add-animal"></animal-form>
</div>
</template>

<script>
import AnimalForm from '@/components/AnimalForm.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'add-animal',
  components: {
    'animal-form': AnimalForm,
    Navbar
  }
}
</script>

<style>
</style>
