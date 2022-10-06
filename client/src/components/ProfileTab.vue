<template>
  <div class="outer-div">
    <b-container>
      <b-row>
        <b-col>
          <show-profile-info ></show-profile-info>
          <b-button
            class="add-animal-button"
            size="sm"
            variant="primary"

            >Change info</b-button
          >
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ShowProfileInfo from '@/components/ShowProfileInfo.vue'
// import ShowProfileForm from '@/components/ShowProfileForm.vue'

export default {
  name: 'profile-tab',
  props: ['adoptionCenter'],
  components: {
    'show-profile-info': ShowProfileInfo
    // 'show-profile-form': ShowProfileForm
  }

}
</script>

<style scoped>
.outer-div{
  margin-bottom: 0;
}
.name-paragraph {
  margin-top: 30%;
}
</style>
