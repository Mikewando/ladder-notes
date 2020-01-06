<template>
  <div class="team section">
    <h2 class="subtitle">{{ side }}</h2>
    <div class="columns is-multiline">
      <div v-for="index in teamLayout" :key="index" class="column is-half">
        <div class="box">
          <div class="columns">
            <v-select
                :value="$store.state.battles[$props.battleId][$props.side].team[index]"
                @input="input(index, $event)"
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
    input (index, choice) {
      this.$store.commit('updateTeam', {
        battleId: this.$props.battleId,
        side: this.$props.side,
        teamIndex: index,
        prop: 'name',
        value: choice
      })
    }
  },
  computed: {
    teamLayout () {
      return [...Array(6).keys()]
    }
  },
  data () {
    const options = Object.entries(BattlePokedex)
      .filter(([key, value]) => {
        return value && value.num >= 0
      })
      .map(([key, value]) => {
        return value.species
      })
    return {
      testTeam: [
      ],
      options: options
    }
  }
}
</script>

<style>
.vs__selected {
  min-width: 0;
}
.vs__selected-options {
  min-width: 0;
  flex-wrap: nowrap;
  padding: 0;
  min-height: 36px;
}
.vs__dropdown-option {
  padding-left: 8px;
}
.vs__search:focus {
  margin-left: 40px;
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
