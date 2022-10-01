<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card
          title="Application"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
        >
          <b-list-group-item>
            Application ID: {{ application._id }}
          </b-list-group-item>

          <b-list-group-item>
            Adopter ID: {{ application.adopter }}
          </b-list-group-item>
          <b-list-group-item>
            Animal ID: {{ application.animal }}
          </b-list-group-item>
           <b-list-group-item>
            Application status: {{ application.status }}
          </b-list-group-item>

          <b-button
            id="accept-application-button"
            size="sm"
            variant="primary"
            >Accept application</b-button
          >

          <b-button
            id="decline-application-button"
            size="sm"
            variant="primary"
            v-on:click="$emit('del-application', application._id)"
            >Decline application</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import { Api } from '@/Api'
export default {
  name: 'applications-tab',
  props: ['application'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
#accept-application-button {
  margin: 2% auto;

  display: block;
}

#decline-application-button {
  background-color: red;
}
</style>
