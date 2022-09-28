<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <b-colum
          sm
          :key="adoptionApplication._id"
          v-for="adoptionApplication in adoptionApplications"
        >
          <adoption-application-card
            :adoptionApplication="adoptionApplication"
          />
        </b-colum>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { Api } from '@/Api'
import AdoptionApplicationCard from '@/components/AdoptionApplicationCard.vue'

export default {
  name: 'adoption-application-list',
  components: { 'adoption-application-card': AdoptionApplicationCard },
  mounted() {
    Api.get(`/adopters/${this.$route.params.id}/adoption-applications`)
      .then((response) => {
        this.adoptionApplications = response.data.AdoptionApplications
        console.log(this.adoptionApplications[0].animal)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  data() {
    return {
      adoptionApplications: []
    }
  }
}
</script>
