<template>
  <b-container class="container-fluid">
    <b-row>
      <b-column>
        <div>
          <navbar></navbar>
          <animal-form formType="update-animal"></animal-form>
        </div>
      </b-column>
    </b-row>
  </b-container>
</template>

<script>
import AnimalForm from '@/components/AnimalForm.vue'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'update-animal',
  components: {
    'animal-form': AnimalForm,
    Navbar
  }
}
</script>

<style></style>
