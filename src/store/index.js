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
      name: null
    }
  }
  return output
}

function newBattle () {
  return {
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
      Vue.set(state.battles, battleId, newBattle())
    },
    updateTeam (state, {battleId, side, teamIndex, prop, value}) {
      const newMon = {...state.battles[battleId][side].team[teamIndex]}
      newMon[prop] = value
      Vue.set(state.battles[battleId][side].team, teamIndex, newMon)
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
  },
  plugins: [vuexLocal.plugin]
})
