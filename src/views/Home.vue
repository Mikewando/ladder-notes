<template>
  <div class="home">
    <h1 class="title">Battles</h1>
    <div class="battles">
      <b-button
          type="is-primary"
          @click="createBattle">
        New Battle
      </b-button>
      <router-link
          v-for="(battle, id) in $store.state.battles"
          :key="id"
          tag="b-button"
          :class="`battle-link is-outlined ${getResultClass(battle)}`"
          :to="{ name: 'battle', params: { id: id } }">
        <div>
          <span
            v-for="mon in battle.opponent.team"
            :key="mon.name"
            :style="`${getIcon(mon.name)}`"
            class="picon"
          ></span>
        </div>
      </router-link>
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
    },
    getResultClass (battle) {
      if (battle.result === 'Won') {
        return 'is-success'
      } else if (battle.result === 'Lost') {
        return 'is-danger'
      }
      return ''
    }
  }
}
</script>

<style scoped>
button {
  min-height: 60px;
}
.battles {
  display: grid;
  grid-row: 1fr;
  grid-gap: 10px;
  max-width: 400px;
  margin: auto;
}
.picon {
  display: inline-block;
  width: 40px;
  height: 30px;
}
</style>