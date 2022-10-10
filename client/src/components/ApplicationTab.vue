<template>
  <b-tabs pills>
    <b-tab title="Active applications">
      <div v-if="activeApplications.length > 0">
        <span
          v-for="handledApplication in activeApplications"
          :key="handledApplication._id"
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

            <b-badge pill variant="warning"
              >Status: pending </b-badge
            >

            <b-button
              id="accept-application-button"
              size="sm"
              variant="primary"
              @click="$emit('accept-application', handledApplication._id)"
              >Accept application</b-button
            >

            <b-button
              id="decline-application-button"
              size="sm"
              variant="primary"
              @click="$emit('del-application', handledApplication._id)"
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

            <b-badge v-if="handledApplication.status === 1" pill variant="success" class="badge"
              >Status: approved </b-badge
            >
             <b-badge v-else pill variant="danger" class="badge"
              >Status: declined</b-badge
            >
            <b-button
              class="remove-application-button"
              size="sm"
              variant="primary"
              @click="$emit('remove-application', handledApplication._id)"
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
      handledApplications: [],
      status: ''
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
  margin: 10%;
  padding-bottom: 17%;
}

.no-processed-applications {
  margin: 10%;
  padding-bottom: 20%;
}
</style>
