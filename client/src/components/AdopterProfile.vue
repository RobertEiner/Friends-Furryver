<template>
  <div v-if="adopter">
    <div>
      <h1>{{ adopter.name }}</h1>
      <h2>{{ adopter.username }}</h2>
    </div>
    <div class="pet-preferences">
      <b-card title="Your preferences">
        <b-list-group>
          <b-list-group-item>
            Species: {{ adopter.petPreferences.species }}
          </b-list-group-item>
          <b-list-group-item>
            Size: {{ adopter.petPreferences.size }}
          </b-list-group-item>
          <b-list-group-item>
            Size: {{ adopter.petPreferences.hours }}
          </b-list-group-item>
          <b-list-group-item>
            Personality: {{ adopter.petPreferences.personality }}
          </b-list-group-item>
        </b-list-group>
      </b-card>

      <b-button> Update profile </b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'adopter-profile',
  props: ['adopter']
}
</script>

<style scoped>
</style>
