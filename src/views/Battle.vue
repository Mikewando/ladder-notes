<template>
  <div class="battle">
    <h1 class="title">{{$store.state.battles[id].id}}</h1>
    <div class="inputs container">
      <TeamSelect :battleId="id" side="opponent" />
      <div class="section">
        <div class="box">
          <b-button
              type="is-outlined"
              :class="`picon ${pokemonActiveStyle(index, 'player')}`"
              @click="broughtPokemon(index, $event)"
              v-for="index in teamLayout"
              :key="index" 
              :style="getIcon($store.state.battles[id].player.team[index].name)">
          </b-button>
        </div>
      </div>
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
    getIcon (name) {
      return Dex.getPokemonIcon(name)
    },
    resultChanged (result) {
      this.$store.commit('updateResult', {
        battleId: this.$props.id,
        result: result
      })
    },
    getBattle () {
      return this.$store.state.battles[this.$props.id]
    },
    broughtPokemon (index, event) {
      // TODO don't duplicate
      if (!Array.prototype.includes.call(event.explicitOriginalTarget.classList, 'picon')) {
        return;
      }

      let brought = false
      if (!this.getBattle().player.team[index].brought) {
        brought = this.getBattle().player.team.reduce((accumulator, member, index) => {
          return accumulator + (member.brought ? 1 : 0)
        }, 1)
      }

      this.$store.commit('updateTeam', {
        battleId: this.$props.id,
        side: 'player',
        teamIndex: index,
        prop: 'brought',
        value: brought
      })

      // TODO update other mons
    },
    pokemonActiveStyle (index, side) {
      return this.getBattle()[side].team[index].brought ? 'is-info' : ''
    }
  },
  computed: {
    teamLayout () {
      return [...Array(6).keys()]
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

<style scoped>
.picon {
  width: 40px;
  height: 30px;
  flex-shrink: 0;
  display: inline-block;
}
</style>