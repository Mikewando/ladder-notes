<template>
  <div class="team section">
    <h2 class="subtitle">{{ side }}</h2>
    <div class="columns is-multiline">
      <div v-for="index in teamLayout" :key="index" class="column is-half">
        <div :class="`mon-card box ${pokemonActiveStyle(index)}`" @click="broughtPokemon(index, $event)">
          <div class="mon-card columns is-multiline">
            <v-select
                :value="getBattleSide().team[index]"
                @input="pokemonSelect(index, $event)"
                :options="$store.state.pokemonOptions"
                class="mons column is-8 is-offset-2"
                label="name">
              <template v-slot:option="option">
                <div class="pcontainer">
                  <span class="picon" :style="getIcon(option.name)"></span>
                  <span class="plabel">{{ option.name }}</span>
                </div>
              </template>
              <template v-slot:selected-option="option">
                <span class="picon" :style="getIcon(option.name)"></span>
                <span class="plabel">{{ option.name }}</span>
              </template>
            </v-select>
            <div
                v-for="moveIndex in moveLayout"
                :key="moveIndex"
                class="move column is-8 is-offset-2">
              <v-select
                  :value="getBattleSide().team[index].moves[moveIndex]"
                  @input="moveSelect(index, moveIndex, $event)"
                  :options="$store.state.moveOptions"
                  label="name">
              </v-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  name: 'TeamSelect',
  props: {
    side: String,
    battleId: Number
  },
  components: {
    vSelect
  },
  methods: {
    getIcon (name) {
      return Dex.getPokemonIcon(name)
    },
    searchLabel ({ name }) {
      return name.toLowerCase()
    },
    moveSelect (index, moveIndex, choice) {
      this.$store.commit('updateMove', {
        battleId: this.$props.battleId,
        side: this.$props.side,
        teamIndex: index,
        moveIndex: moveIndex,
        value: choice
      })
    },
    pokemonSelect (index, choice) {
      this.$store.commit('updateTeam', {
        battleId: this.$props.battleId,
        side: this.$props.side,
        teamIndex: index,
        prop: 'name',
        value: choice
      })
    },
    getBattleSide () {
      if (typeof this.$props.battleId === 'undefined') {
        return this.$store.state.player
      } else {
        return this.$store.state.battles[this.$props.battleId][this.$props.side]
      }
    },
    pokemonActiveStyle (index) {
      return this.getBattleSide().team[index].brought ? 'brought' : ''
    },
    broughtPokemon (index, event) {
      // Only count clicks on "background"
      if (!Array.prototype.includes.call(event.explicitOriginalTarget.classList, 'mon-card')) {
        return;
      }

      // Don't mark 
      if (typeof this.$props.battleId === 'undefined') {
        return;
      }

      let brought = false
      if (!this.getBattleSide().team[index].brought) {
        brought = this.getBattleSide().team.reduce((accumulator, member, index) => {
          return accumulator + (member.brought ? 1 : 0)
        }, 1)
      }

      this.$store.commit('updateTeam', {
        battleId: this.$props.battleId,
        side: this.$props.side,
        teamIndex: index,
        prop: 'brought',
        value: brought
      })

      // TODO update other mons
    }
  },
  computed: {
    teamLayout () {
      return [...Array(6).keys()]
    },
    moveLayout () {
      return [...Array(4).keys()]
    }
  }
}
</script>

<style>
.mons .vs__selected {
  min-width: 0;
}
.mons .vs__selected-options {
  min-width: 0;
  flex-wrap: nowrap;
  padding: 0;
  min-height: 36px;
}
.mons .vs__dropdown-option {
  padding-left: 8px;
}
.mons .vs__search:focus {
  margin-left: 40px;
}

.move .vs__dropdown-option {
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* default stuff */
h3 {
  margin: 42px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* custom stuff */
.mon-card .column {
  margin-bottom: 0;
  padding-bottom: 0;
}
.mon-card.brought {
  background-color: #124364;
}
.v-select {
  padding: 0;
}
.pcontainer {
  display: flex;
  align-items: center;
}
.picon {
  width: 40px;
  height: 30px;
  flex-shrink: 0;
  display: inline-block;
}
.plabel {
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
  min-width: 0;
}
</style>
