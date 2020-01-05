import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

function newTeam () {
  const output = []
  for (let i = 0; i < 6; i++) {
    output[i] = {
      name: null,
      moves: [],
      brought: false
    }
  }
  return output
}

function newBattle (battleId) {
  return {
    id: battleId,
    player: {
      team: newTeam()
    },
    opponent: {
      team: newTeam()
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
      state.battles.unshift(newBattle(battleId))
    },
    updateTeam (state, {battleId, side, teamIndex, prop, value}) {
      const newMon = {...state.battles[battleId][side].team[teamIndex]}
      newMon[prop] = value
      Vue.set(state.battles[battleId][side].team, teamIndex, newMon)
    },
    updateResult (state, {battleId, result}) {
      Vue.set(state.battles[battleId], 'result', result)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
