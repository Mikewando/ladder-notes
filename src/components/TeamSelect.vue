<template>
  <div class="team">
    <h1>{{ side }}</h1>
    <div class="mons">
      <multiselect v-for="index in 6" :key="index" :v-model="`testTeam[${index - 1}]`.name"
                   :options="options" :option-height="30" 
                   placeholder="" selectLabel="" deselectLabel="" selectedLabel="">
      <!--
      <multiselect v-for="(member, i) in testTeam" :key="i" :v-model="member.name"
                   :options="options" :option-height="30" 
                   placeholder="" selectLabel="" deselectLabel="" selectedLabel="">
      <multiselect v-for="index in 6" :key="index" :v-model="`opponentTeam[${index - 1}]`.name"
                   :options="options" :option-height="30" 
                   placeholder="" selectLabel="" deselectLabel="" selectedLabel="">
      -->
        <template slot="placeholder">
          <div class="plabel">
            <span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?g8) no-repeat scroll -0px -0px"></span>
            <span class="pname">Select Pokemon</span>
          </div>
        </template>
        <template slot="singleLabel" slot-scope="props">
          <div class="plabel">
            <span class="picon" :style="`${getIcon(props.option)}`"></span>
            <span class="pname">{{ props.option }}</span>
          </div>
        </template>
        <template slot="option" slot-scope="props">
          <div class="plabel">
            <span class="picon" :style="`${getIcon(props.option)}`" ></span>
            <span class="pname">{{ props.option }}</span>
          </div>
        </template>
      </multiselect>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
//import { createHelpers } from 'vuex-map-fields'
import { mapMultiRowFields } from 'vuex-map-fields'
//:value="`${opponentTeam[index - 1]}`" @input="input(index - 1, $event)"

/*
const { mapMultiRowFields } = createHelpers({
  getterType: 'getOpponentTeam',
  mutationType: 'updateOpponentTeam'
})
*/

export default {
  name: 'TeamSelect',
  props: {
    side: String,
    battleId: Number
  },
  components: {
    Multiselect
  },
  methods: {
    getIcon (name) {
      return Dex.getPokemonIcon(name)
    },
    searchLabel ({ name }) {
      return name.toLowerCase()
    },
    input (index, choice) {
      console.log(`Battle #${this.$props.battleId} ${this.$props.side} pokemon #${index} is ${choice}`)
      this.$store.commit('updateTeam', {
        battleId: this.$props.battleId,
        side: this.$props.side,
        teamIndex: index,
        name: choice
      })
    }
  },
  computed: {
    /*
    ...mapMultiRowFields(['opponentTeam'])
    opponentTeam () {
        return this.$store.state.battles[this.$props.battleId][this.$props.side].team
    },
    */
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
      {
        name: null
      },
      {
        name: null
      },
      {
        name: null
      },
      {
        name: null
      },
      {
        name: null
      },
      {
        name: null
      },
      ],
      options: options
    }
  }
}
</script>

<style>
/* This is all kind of a hack... */
.team .multiselect__tags {
  min-height: 48px;
  padding: 0;
}
.team .multiselect__single {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-right: 12px;
  padding-left: 12px;
}
.team .multiselect__input {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-right: 52px;
  padding-left: 52px;
  font-size: 16px;
  line-height: 30px;
}
.team .multiselect__placeholder {
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 12px;
  margin-left: 12px;
  padding: 0;
}
.team .multiselect__select::before {
  z-index: 10;
}
.team .multiselect__select {
  z-index: 10;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* default stuff */
h3 {
  margin: 40px 0 0;
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
.team {
  max-width: 500px;
}

.mons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.picon {
  display: inline-block;
  width: 40px;
  height: 30px;
}
.plabel {
  display: flex;
  align-items: center;
}
</style>
