<template>
  <div class="outermost-div">
    <b-container fluid>
      <b-row>
        <b-col>
          <navbar></navbar>
          <animal-form formType="update-animal"></animal-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
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

<style scoped>
  .outermost-div {
    background-color: rgb(119, 200, 246);
  }
</style>
