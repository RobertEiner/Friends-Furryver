<template>
  <div class="outer-div">
    <div class="inner-div">
      <b-tabs content-class="mt-3">
        <b-tab :title="tabThree">
          <animals-list />
        </b-tab>
        <b-tab :title="tabTwo">{{ secondTab }}</b-tab>
        <b-tab :title="tabThree">{{ thirdTab }}</b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import AnimalsList from '@/components/AnimalsList.vue'

export default {
  name: 'navbar-adopter',
  props: ['firstTab', 'secondTab', 'thirdTab'],
  components: {
    'animals-list': AnimalsList
  },
  data() {
    return {
      tabOne: this.firstTab,
      tabTwo: this.secondTab,
      tabThree: this.thirdTab,
      adopter: this.adopterId
    }
  }
}
</script>

<style scoped>
.outer-div {
  padding: 3% 7%;
  background-color: rgb(119, 200, 246);
}

.inner-div {
  background-color: aliceblue;
}

.navbar-brand {
  background-color: royalblue;
}
</style>
