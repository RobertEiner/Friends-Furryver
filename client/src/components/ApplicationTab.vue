<template>
  <b-tabs pills>
    <b-tab title="Active applications">
      <div v-if="activeApplications.length > 0">
        <span
          v-for="activeApplication in activeApplications"
          :key="activeApplication._id"
        >
          <b-card
            class="active-card"
            title="Application"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
          >
            <b-list-group-item>
              Adopter: {{ activeApplication.adopter.name }}<br />
              User name: {{ activeApplication.adopter.username }}
            </b-list-group-item>

            <b-list-group-item>
              Species: {{ activeApplication.animal.species }}
            </b-list-group-item>
            <b-list-group-item>
              breed: {{ activeApplication.animal.breed }}
            </b-list-group-item>
            <b-list-group-item>
              size: {{ activeApplication.animal.size }}
            </b-list-group-item>
            <b-list-group-item>
              health status: {{ activeApplication.animal.healthStatus }}
            </b-list-group-item>

            <b-badge pill variant="warning">Status: pending </b-badge>

            <b-button
              id="accept-application-button"
              size="sm"
              variant="primary"
              @click="acceptApplication(activeApplication._id)"
              >Accept application</b-button
            >

            <b-button
              id="decline-application-button"
              size="sm"
              variant="primary"
              @click="declineApplication(activeApplication._id)"
              >Decline application</b-button
            >
          </b-card>
        </span>
      </div>
      <div v-else>
        <h5 class="no-active-applications">Currently no active applications</h5>
        <b-img
          class="no-active-applications-img"
          :src="require('../Assets/pet-house.png')"
          fluid
        ></b-img>
      </div>
    </b-tab>

    <b-tab title="Processed applications">
      <div v-if="handledApplications.length > 0">
        <span
          v-for="handledApplication in handledApplications"
          :key="handledApplication._id"
        >
          <b-card
            class="handled-card"
            title="Application"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
          >
            <b-list-group-item>
              Adopter: {{ handledApplication.adopter.name }}<br />
              User name: {{ handledApplication.adopter.username }}
            </b-list-group-item>

            <b-list-group-item>
              Species: {{ handledApplication.animal.species }}
            </b-list-group-item>
            <b-list-group-item>
              breed: {{ handledApplication.animal.breed }}
            </b-list-group-item>
            <b-list-group-item>
              size: {{ handledApplication.animal.size }}
            </b-list-group-item>
            <b-list-group-item>
              health status: {{ handledApplication.animal.healthStatus }}
            </b-list-group-item>

            <b-badge
              v-if="handledApplication.status === 1"
              pill
              variant="success"
              class="badge"
              >Status: approved
            </b-badge>
            <b-badge v-else pill variant="danger" class="badge"
              >Status: declined</b-badge
            >
            <b-button
              class="remove-application-button"
              size="sm"
              variant="primary"
              @click="deleteApplication(handledApplication._id)"
              >Remove application</b-button
            >
          </b-card>
        </span>
      </div>

      <div v-else>
        <h5 class="no-processed-applications">
          Currently no processed applications
        </h5>
        <b-img
          class="no-processed-applications-img"
          :src="require('../Assets/pet-house.png')"
          fluid
        ></b-img>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'applications-tab',
  components: {},
  // props: ['applications'],
  data() {
    return {
      applications: [],
      activeApplications: [],
      handledApplications: [],
      status: ''
    }
  },
  created() {
    this.getAllApplications()
  },
  methods: {
    sortApplications() {
      for (let i = 0; i < this.applications.length; i++) {
        if (this.applications[i].status === 0) {
          this.activeApplications.push(this.applications[i])
        } else {
          this.handledApplications.push(this.applications[i])
        }
      }
    },

    // Get all applications of an adoption center
    getAllApplications() {
      Api.get(`/AdoptionCenters/${this.$route.params.id}/adoptionApplications`)
        .then(response => {
          console.log(response.data)
          this.applications = response.data.Applications
          this.sortApplications()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Accept an adoption application, which changes the status code to 1, which means accepted
    acceptApplication(applicationId) {
      Api.put(`/adoption-applications/${applicationId}`, { status: 1 })
        .then(response => {
          console.log(response.data)
          this.applications = []
          this.activeApplications = []
          this.handledApplications = []
          this.getAllApplications()
          console.log(this.applications)
        })
        .catch(error => {
          console.log(error)
        })
    },

    // declines an adoption application, changing the status code to 2, which means declined
    declineApplication(applicationId) {
      Api.put(`/adoption-applications/${applicationId}`, { status: 2 })
        .then(response => {
          console.log(response)
          this.applications = []
          this.activeApplications = []
          this.handledApplications = []
          this.getAllApplications()
        })
        .catch(error => {
          console.log(error)
        })
    },

    // Deletes an adoption application
    deleteApplication(applicationId) {
      Api.delete(`/adoption-applications/${applicationId}`)
        .then(response => {
          this.applications = []
          this.activeApplications = []
          this.handledApplications = []
          this.getAllApplications()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.remove-application-button {
  margin: 2% auto;
  background-color: red;
  display: block;
}

#accept-application-button {
  margin: 2% auto;

  display: block;
}

#decline-application-button {
  background-color: red;
}

.active-card {
  display: inline-block;
  margin: 2%;
}

.badge {
  display: inline-block;
  margin-top: 5%;
}

.handled-card {
  display: inline-block;
  margin: 1%;
}

.no-active-applications {
  padding-bottom: 1%;
}

.no-active-applications-img {
  max-width: 15rem;
  margin-bottom: 2%;
}

.no-processed-applications {
  padding-bottom: 1%;
}

.no-processed-applications-img {
  max-width: 15rem;
  margin-bottom: 2%;
}
</style>
