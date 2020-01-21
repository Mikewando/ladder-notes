<template>
  <div class="team">
    <div class="level has-centered-text">
      <h1 class="level-item title">Update Team</h1>
    </div>
    <div class="inputs container">
      <div class="section">
        <div class="columns is-centered">
          <div class="column is-half box">
            <b-field label="Showdown Name">
              <b-input v-model="showdownName"></b-input>
            </b-field>
          </div>
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
  computed: {
    showdownName: {
      get () {
        return this.$store.state.showdownName
      },
      set (value) {
        this.$store.commit('updateShowdownName', { showdownName: value })
      }
    }
  },
  created () {
  }
}
</script>
