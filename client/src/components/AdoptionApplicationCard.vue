<template>
  <div class="margin">
    <b-card
      title="📃"
      bg-variant="info"
      tag="article"
      text-variant="white"
    >
      <hr />
      <b-card-text> Size: {{ adoptionApplication.animal.size }} </b-card-text>

      <hr />
      <b-card-text>
        Species: {{ adoptionApplication.animal.species }}
      </b-card-text>

      <hr />
      <b-card-text>
        Personality: {{ adoptionApplication.animal.personality }}
      </b-card-text>

      <hr />
      <b-card-text> Sex: {{ adoptionApplication.animal.gender }} </b-card-text>

      <hr />
      <b-card-text> Age: {{ adoptionApplication.animal.age }} </b-card-text>

      <hr />
      <b-card-text>
        Health status: {{ adoptionApplication.animal.healthStatus }}
      </b-card-text>

      <hr />
      <b-card-text>
        Other needs: {{ adoptionApplication.animal.otherNeeds }}
      </b-card-text>

      <hr />
      <b-card-text>
        Hours needed: {{ adoptionApplication.animal.hours }}
      </b-card-text>
      <hr />
      <div>
        <b-badge
          class="status-badge"
          pill
          :status-color="adoptionApplication.status"
          >Status:
          {{ this.applicationStatus[adoptionApplication.status] }}</b-badge
        >
      </div>
      <b-button
        class="delete-button"
        @click="deleteApplication"
        variant="danger"
        >Delete</b-button
      >
    </b-card>
  </div>
</template>

<script>
// Attribution for source of emojis: https://emojipedia.org/

import { Api } from '@/Api'
export default {
  name: 'adoption-application-card',
  props: ['adoptionApplication'],
  data() {
    return {
      applicationStatus: {
        0: 'pending',
        1: 'approved',
        2: 'declined'
      }
    }
  },
  methods: {
    deleteApplication() {
      Api.delete(`/adoption-applications/${this.adoptionApplication._id}`)
      this.$emit('deleteApplication', this.adoptionApplication._id)
    }
  }
}
</script>

<style scoped>
.margin {
  padding: 3% 7%;
}
.b-card {
  width: 17rem;
}
.delete-button {
  padding: 3%;
  border: solid 0.1em;
  border-color: black;
}
.status-badge {
  margin: 3%;
}
.status-badge[status-color='0'] {
  background-color: rgb(205, 170, 16);
}
.status-badge[status-color='1'] {
  background-color: rgb(32, 144, 13);
}
.status-badge[status-color='2'] {
  background-color: rgb(175, 48, 48);
}
</style>
