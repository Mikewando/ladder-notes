<template>
  <div class="battle">
    <h1>Battle {{id}}</h1>
    <TeamSelect :battleId="id" side="opponent" />
  </div>
</template>

<script>
import TeamSelect from '@/components/TeamSelect.vue'

export default {
  name: 'Battle',
  props: {
    id: Number
  },
  components: {
    TeamSelect
  },
  data () {
    return {
    }
  },
  created () {
    if (!this.$store.state.battles[this.id]) {
      this.$store.commit('createBattle', {battleId: this.id});
    }
  }
}
</script>

<style>
.team {
  margin: auto;
}
</style>
