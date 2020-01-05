import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function basicArray () {
  const output = []
  for (let i = 0; i < 6; i++) {
    output[i] = null
  }
  return output
}

function newBattle () {
  return {
    player: {
      team: basicArray()
    },
    opponent: {
      team: basicArray()
    }
  }
}

function getPokemonOptions () {
  return Object.entries(BattlePokedex)
      .filter(([_, value]) => {
        return value && value.num >= 0
      })
      .map(([_, value]) => {
        return value.species
      })
}

export default new Vuex.Store({
  state: {
    battles: [],
    pokemonOptions: getPokemonOptions()
  },
  mutations: {
    createBattle (state, {battleId}) {
      Vue.set(state.battles, battleId, newBattle())
    },
    updateTeam (state, {battleId, side, teamIndex, name}) {
      Vue.set(state.battles[battleId][side].team, teamIndex, name)
    },
  },
  actions: {
    loadBattles (context) {
    },
    updateTeam (context, options) {
      return context.commit('updateTeam', options)
    }
  },
  modules: {
  }
})
