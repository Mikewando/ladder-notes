import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import axios from 'axios'

const PLAYER_NAME = 'slowpoke.jpg'

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

function newMon () {
  return {
    name: null,
    moves: newMoves(),
    ability: null,
    item: null,
    brought: false
  }
}

function newTeam () {
  const output = []
  for (let i = 0; i < 6; i++) {
    output[i] = newMon()
  }
  return output
}

function newBattle (battleId, opponentTeam, playerTeam) {
  return {
    id: battleId,
    player: {
      team: playerTeam.slice()
    },
    opponent: {
      team: opponentTeam.slice()
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
    createBattle (state, {battleId, opponentTeam, playerTeam}) {
      if (typeof opponentTeam === 'undefined') {
        opponentTeam = newTeam()
      }

      if (typeof playerTeam === 'undefined') {
        playerTeam = state.player.team
      }

      state.battles.unshift(newBattle(battleId, opponentTeam, playerTeam))
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
  actions: {
    battleFromReplay ({ commit, state }, { battleId, replayUrl }) {
      console.log(replayUrl)
      if (!replayUrl.endsWith('.json')) {
        replayUrl = replayUrl + '.json'
      }
      axios.get(replayUrl)
        .then((response) => {
          const battleData = response.data
          const log = battleData.log

          let teams = {
            p1: [],
            p2: []
          }
          let brought = {
            p1: 1,
            p2: 1
          }
          
          let playerTeam = teams.p1
          let opponentTeam = teams.p2

          let result

          for (let line of log.split('\n')) {
            const [ _, command, ...unparsed ] = line.split('|')
            switch (command) {
              case 'player': {
                const [ pid, name, ...ignored ] = unparsed
                if (name === PLAYER_NAME) {
                  playerTeam = teams[pid]
                  if (pid === 'p1') {
                    opponentTeam = teams.p2
                  } else {
                    opponentTeam = teams.p1
                  }
                }
                break
              }
              case 'poke': {
                const [ pid, info, hp ] = unparsed
                const [ name, level, gender ] = info.split(', ')
                const mon = newMon()
                mon.name = name
                teams[pid].unshift(mon)
                break
              }
              case 'switch': {
                const [ slotName, info, hp ] = unparsed
                const [ slot, ...ignored ] = slotName.split(': ')
                const [ name, level, gender ] = info.split(', ')
                const pid = slot.slice(0, -1)
                for (let mon of teams[pid]) {
                  if (mon.name === name) {
                    if (!mon.brought) {
                      mon.brought = brought[pid]++
                    }
                  }
                }
                break
              }
              case 'win': {
                const [ name ] = unparsed
                if (name === PLAYER_NAME) {
                  result = 'Won'
                } else {
                  result = 'Lost'
                }
              }
              default:
                console.log(command, unparsed)
            }
          }
          commit('createBattle', { battleId, opponentTeam, playerTeam })
          commit('updateResult', { battleId: 0, result })
        })
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
