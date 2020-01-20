<template>
  <div class="team">
    <h1 class="title">Update Team</h1>
    <div class="inputs container">
      <TeamSelect side="player" />
    </div>
  </div>
</template>

<script>
import TeamSelect from '@/components/TeamSelect.vue'

export default {
  name: 'Team',
  props: {
  },
  components: {
    TeamSelect
  },
  methods: {
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>
