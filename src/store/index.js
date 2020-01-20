import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

function newMoves () {
  const output = []
  for (let i = 0; i < 4; i++) {
    output[i] = null
  }
  return output
}

function newTeam () {
  const output = []
  for (let i = 0; i < 6; i++) {
    output[i] = {
      name: null,
      moves: newMoves(),
      ability: null,
      item: null,
      brought: false
    }
  }
  return output
}

function newBattle (battleId, playerTeam) {
  return {
    id: battleId,
    player: {
      team: playerTeam.slice()
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

function getMoveOptions () {
  return Object.entries(BattleMovedex)
      .filter(([_, value]) => {
        return value && value.num >= 0
      })
      .map(([_, value]) => {
        return value.name
      })
}

export default new Vuex.Store({
  state: {
    battles: [],
    player: {
      team: newTeam()
    },
    pokemonOptions: getPokemonOptions(),
    moveOptions: getMoveOptions()
  },
  mutations: {
    createBattle (state, {battleId}) {
      state.battles.unshift(newBattle(battleId, state.player.team))
    },
    removeBattle (state, {battleId}) {
      state.battles.splice(battleId, 1)
    },
    updateTeam (state, {battleId, side, teamIndex, prop, value}) {
      if (typeof battleId !== 'undefined') {
        const newMon = {...state.battles[battleId][side].team[teamIndex]}
        newMon[prop] = value
        Vue.set(state.battles[battleId][side].team, teamIndex, newMon)
      } else {
        const newMon = {...state.player.team[teamIndex]}
        newMon[prop] = value
        Vue.set(state.player.team, teamIndex, newMon)
      }
    },
    updateMove (state, {battleId, side, teamIndex, moveIndex, value}) {
      if (typeof battleId !== 'undefined') {
        const newMoves = {...state.battles[battleId][side].team[teamIndex].moves}
        newMoves[moveIndex] = value
        Vue.set(state.battles[battleId][side].team[teamIndex], 'moves', newMoves)
      } else {
        const newMoves = {...state.player.team[teamIndex].moves}
        newMoves[moveIndex] = value
        Vue.set(state.player.team[teamIndex], 'moves', newMoves)
      }
    },
    updateResult (state, {battleId, result}) {
      Vue.set(state.battles[battleId], 'result', result)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
