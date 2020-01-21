<template>
  <div class="team">
    <div class="level has-centered-text">
      <h1 class="level-item title">Update Team</h1>
    </div>
    <div class="inputs container">
      <div class="section">
        <div class="box">
          <b-field label="Showdown Name">
            <b-input :model="showdownName"></b-input>
          </b-field>
        </div>
        <TeamSelect side="player" />
      </div>
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
      "showdownName": "slowpoke.jpg"
    }
  },
  created () {
  }
}
</script>
