<template>
  <div class="battle">
    <h1 class="title">{{$store.state.battles[id].id}}</h1>
    <div class="inputs container">
      <TeamSelect :battleId="id" side="opponent" />
      <div class="section">
        <b-field position="is-centered" class="result">
          <b-radio-button
              :value="$store.state.battles[id].result"
              @input="resultChanged"
              native-value="Won"
              type="is-success">
            <span>Won</span>
          </b-radio-button>
          <b-radio-button
              :value="$store.state.battles[id].result"
              @input="resultChanged"
              native-value="Lost"
              type="is-danger">
            <span>Lost</span>
          </b-radio-button>
        </b-field>
      </div>
    </div>
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
  methods: {
    resultChanged (result) {
      this.$store.commit('updateResult', {
        battleId: this.$props.id,
        result: result
      })
    }
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
