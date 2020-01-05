<template>
  <div class="battle">
    <h1>Battle {{id}}</h1>
    <TeamSelect owner="opponent" />
  </div>
</template>

<script>
import TeamSelect from '@/components/TeamSelect.vue'

export default {
  name: 'Battle',
  props: {
    id: String
  },
  components: {
    TeamSelect
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.team {
  margin: auto;
}
</style>
