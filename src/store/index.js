import Vue from 'vue'
import Vuex from 'vuex'

import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

function newTeam () {
  const output = []
  for (let i = 0; i < 6; i++) {
    output[i] = null
  }
  return output
}

export default new Vuex.Store({
  state: {
    opponentTeam: [
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
    battles: []
  },
  getters: {
    getField
  },
  mutations: {
    createBattle (state, {battleId}) {
      state.battles[battleId] = {
        player: {
          team: newTeam()
        },
        opponent: {
          team: newTeam()
        }
      }
    },
    /*
    updateTeam (state, {battleId, side, teamIndex, name}) {
      Vue.set(state.battles[battleId][side].team, teamIndex, name)
    },
    */
    updateField
  },
  actions: {
    loadBattles (context) {
    }
  },
  modules: {
  }
})
