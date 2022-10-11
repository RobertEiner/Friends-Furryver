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
              Application ID: {{ activeApplication._id }}
            </b-list-group-item>

            <b-list-group-item>
              Adopter ID: {{ activeApplication.adopter }}
            </b-list-group-item>
            <b-list-group-item>
              Animal ID: {{ activeApplication.animal }}
            </b-list-group-item>
            <b-list-group-item>
              Application status: {{ activeApplication.status }}
            </b-list-group-item>

            <b-button
              id="accept-application-button"
              size="sm"
              variant="primary"
              @click="$emit('accept-application', activeApplication._id)"
              >Accept application</b-button
            >

            <b-button
              id="decline-application-button"
              size="sm"
              variant="primary"
              @click="$emit('del-application', activeApplication._id)"
              >Decline application</b-button
            >
          </b-card>
        </span>
      </div>
      <div v-else>
        <p class="no-active-applications">Currently no active applications</p>
      </div>
    </b-tab>

    <b-tab title="Processed applications">
      <div v-if="handledApplications.length > 0">
        <span
          v-for="handledApplicationsTwo in handledApplications"
          :key="handledApplicationsTwo._id"
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
              Application ID: {{ handledApplicationsTwo._id }}
            </b-list-group-item>

            <b-list-group-item>
              Adopter ID: {{ handledApplicationsTwo.adopter }}
            </b-list-group-item>
            <b-list-group-item>
              Animal ID: {{ handledApplicationsTwo.animal }}
            </b-list-group-item>
            <b-list-group-item>
              Application status: {{ handledApplicationsTwo.status }}
            </b-list-group-item>
            <b-button
              class="remove-application-button"
              size="sm"
              variant="primary"
              @click="$emit('remove-application', handledApplicationsTwo._id)"
              >Remove application</b-button
            >
          </b-card>
        </span>
      </div>

      <div v-else>
        <p class="no-processed-applications">
          Currently no processed applications
        </p>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
// import { Api } from '@/Api'

export default {
  name: 'applications-tab',
  components: {},
  props: ['applications'],
  data() {
    return {
      activeApplications: [],
      handledApplications: []
    }
  },
  created() {
    this.sortApplications()
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
    }

  }
}
</script>

<style scoped>
.remove-application-button {
  margin: 2% auto;
  background-color: red;
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

.handled-card {
  display: inline-block;
  margin: 1%;
}

.no-active-applications {
  margin: 10%;
  padding-bottom: 17%;
}

.no-processed-applications {
  margin: 10%;
  padding-bottom: 20%;
}
</style>
