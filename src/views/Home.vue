<template>
  <div class="home container">
    <div class="level has-centered-text">
      <h1 class="level-item title">Battles</h1>
    </div>

    <div class="section">
      <div class="columns is-centered">
        <div class="column is-narrow">
          <div class="buttons is-centered">
            <b-button
                type="is-primary is-large"
                @click="createBattle">
              New Battle
            </b-button>
            <b-button
                type="is-info is-large"
                @click="replayDialog">
              From Replay
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="battles columns is-multiline">
        <div class="column is-half is-offset-one-quarter"
            v-for="(battle, id) in $store.state.battles"
            :key="id">
          <div class="buttons is-centered has-addons">
            <router-link
                tag="b-button"
                :class="`battle-link is-outlined ${getResultClass(battle)}`"
                :to="{ name: 'battle', params: { id: id } }">
              <div class="team-preview">
                <span
                  v-for="mon in sortTeam(battle.opponent.team)"
                  :key="mon.name"
                  :style="`${getIcon(mon.name)}`"
                  :class="`picon ${mon.brought ? 'active' : 'inactive'}`"
                ></span>
              </div>
            </router-link>
            <b-button @click="removeBattle(id)"><b-icon icon="delete"></b-icon></b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuidv4 from 'uuid/v4'

export default {
  name: 'home',
  methods: {
    getIcon (name) {
      return Dex.getPokemonIcon(name)
    },
    createBattle () {
      this.$store.commit('createBattle', { battleId: uuidv4() })
      // The created battle is always first
      this.$router.push({
        'name': 'battle',
        'params': {
          id: 0
        }
      })
    },
    removeBattle(id) {
      this.$store.commit('removeBattle', { battleId: id })
    },
    getResultClass (battle) {
      if (battle.result === 'Won') {
        return 'is-success'
      } else if (battle.result === 'Lost') {
        return 'is-danger'
      }
      return ''
    },
    sortTeam (team) {
      return team.slice().sort((a, b) => {
        if (!a.brought && !b.brought) {
          return 0
        } else if (!a.brought) {
          return 1
        } else if (!b.brought) {
          return -1
        }
        return a.brought - b.brought
      })
    },
    replayDialog () {
      this.$buefy.dialog.prompt({
        message: 'Replay URL',
        inputAttrs: {
          placeholder: 'https://replay.pokemonshowdown.com/...'
        },
        scroll: 'keep',
        trapFocus: true,
        onConfirm: (url) => {
          this.$store.dispatch('battleFromReplay', { battleId: uuidv4(), replayUrl: url })
        }
      })
    }
  }
}
</script>

<style scoped>
.battles > * {
  padding-top: 0;
}
.team-preview {
  display: flex;
}
.picon {
  display: inline-block;
  width: 40px;
  height: 30px;
}
.picon.inactive {
  opacity: .5;
}
</style>