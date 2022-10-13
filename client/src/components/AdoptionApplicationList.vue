<template>
  <div>
    <b-container fluid>
      <b-row align-h="center">
        <div v-if="!adoptionApplications.length">
          <h5>You don't have applications yet</h5>
        </div>
        <b-col
          sm="12"
          md="6"
          lg="4"
          :key="adoptionApplication._id"
          v-for="adoptionApplication in adoptionApplications"
        >
          <adoption-application-card
            :adoptionApplication="adoptionApplication"
            @deleteApplication="removeApplication"
          />
        </b-col>
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
  methods: {
    updateList() {
      Api.get(`/adopters/${this.$route.params.id}/adoption-applications`)
        .then((response) => {
          this.adoptionApplications = response.data.AdoptionApplications
          console.log(this.adoptionApplications[0].animal)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeApplication(removeId) {
      const index = this.adoptionApplications.findIndex(
        (adoptionApplication) => adoptionApplication._id === removeId
      )
      this.adoptionApplications.splice(index, 1)
      this.$emit('removedAdoptionApplication')
    }
  },
  mounted() {
    this.updateList()
  },
  data() {
    return {
      adoptionApplications: []
    }
  }
}
</script>
