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
            :title="applicationEmoji"
            bg-variant="info"
            text-variant="white"
            tag="article"
            style="max-width: 17rem;"
          >
            <hr />
            <b-card-text
              >Adopter: {{ activeApplication.adopter.name }}</b-card-text
            >
            <hr />
            <b-card-text
              >Species: {{ activeApplication.animal.species }}</b-card-text
            >
            <hr />
            <b-card-text>
              Size: {{ activeApplication.animal.size }}</b-card-text
            >
            <hr />
            <b-card-text
              >Health status:
              {{ activeApplication.animal.healthStatus }}</b-card-text
            >
            <hr />
            <b-card-text
              >Personality:
              {{ activeApplication.animal.personality }}</b-card-text
            >
            <hr />
            <b-card-text
              >Sex: {{ activeApplication.animal.gender }}</b-card-text
            >
            <hr />
            <b-card-text>Age: {{ activeApplication.animal.age }}</b-card-text>
            <hr />
            <b-card-text
              >Hours needed: {{ activeApplication.animal.hours }}</b-card-text
            >
            <hr />

            <b-badge :status="activeApplication.status" class="badge" pill
              >Status: {{ applicationStatus[activeApplication.status] }}
            </b-badge>

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
            :title="applicationEmoji"
            bg-variant="info"
            text-variant="white"
            tag="article"
            style="max-width: 17rem;"
          >
            <hr />
            <b-card-text
              >Adopter: {{ handledApplication.adopter.name }}</b-card-text
            >
            <hr />
            <b-card-text
              >Species: {{ handledApplication.animal.species }}</b-card-text
            >
            <hr />
            <b-card-text>
              Size: {{ handledApplication.animal.size }}</b-card-text
            >
            <hr />
            <b-card-text
              >Health status:
              {{ handledApplication.animal.healthStatus }}</b-card-text
            >
            <hr />
            <b-card-text
              >Personality:
              {{ handledApplication.animal.personality }}</b-card-text
            >
            <hr />
            <b-card-text
              >Sex: {{ handledApplication.animal.gender }}</b-card-text
            >
            <hr />
            <b-card-text>Age: {{ handledApplication.animal.age }}</b-card-text>
            <hr />
            <b-card-text
              >Hours needed: {{ handledApplication.animal.hours }}</b-card-text
            >
            <hr />

            <b-badge :status="handledApplication.status" pill class="badge"
              >Status: {{ applicationStatus[handledApplication.status] }}
            </b-badge>

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
      status: '',
      // Attribution for source of emojis: https://emojipedia.org/
      applicationEmoji: '📃',
      applicationStatus: {
        0: 'pending',
        1: 'accepted',
        2: 'declined'
      }
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
  background-color: rgb(152, 62, 62);
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

.badge[status='0'] {
  display: inline-block;
  margin-top: 5%;
  background-color: rgb(205, 170, 16);
}
.badge[status='1'] {
  display: inline-block;
  margin-top: 5%;
  background-color: rgb(32, 144, 13);
}
.badge[status='2'] {
  display: inline-block;
  margin-top: 5%;
  background-color: rgb(175, 48, 48);
}

.handled-card {
  display: inline-block;
  margin: 1%;
}

.no-active-applications {
  padding-bottom: 1%;
  font-family: 'Pacifico', cursive;
}

.no-active-applications-img {
  max-width: 15rem;
  margin-bottom: 2%;
}

.no-processed-applications {
  padding-bottom: 1%;
  font-family: 'Pacifico', cursive;
}

.no-processed-applications-img {
  max-width: 15rem;
  margin-bottom: 2%;
}

@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
</style>
