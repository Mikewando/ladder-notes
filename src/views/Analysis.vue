<template>
  <div class="analysis container">
    <h1 class="title">Analysis</h1>

    <div class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="box">
            <h2 class="title is-4">Total Battles</h2>
            <p>{{ battleCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="box">
            <h2 class="title is-4">Win Percentage</h2>
            <p>{{ winPercentage }}%</p>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="box">
            <h2 class="title is-4">Common Losses</h2>
            <b-table :data="commonLosses">
              <template slot-scope="props">
                <b-table-column field="name" label="Pokemon" centered>
                  <span class="picon" :style="`${getIcon(props.row.name)}`"></span>
                </b-table-column>
                <b-table-column field="score" label="Score" numeric>
                  {{props.row.score.toFixed(2)}}
                </b-table-column>
                <b-table-column field="score" label="Wins" numeric>
                  {{props.row.wins}}
                </b-table-column>
                <b-table-column field="score" label="Losses" numeric>
                  {{props.row.losses}}
                </b-table-column>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Analysis',
  props: {
  },
  components: {
  },
  methods: {
    getIcon (name) {
      return Dex.getPokemonIcon(name)
    },
  },
  filters: {
    pluralize (value, singular, plural) {
      if (value === 1) {
        return `${value} ${singular}`
      }
      return `${value} ${plural}`
    }
  },
  computed: {
    battleCount () {
      return this.$store.state.battles.length
    },
    winPercentage () {
      const battles = this.$store.state.battles
      const wins = battles.reduce((accumulator, battle) => {
        if (battle.result === 'Won') {
          return accumulator + 1
        }
        return accumulator
      }, 0)
      return (wins / battles.length * 100).toFixed(0)
    },
    commonLosses () {
      const battles = this.$store.state.battles
      let winsAgainstMons = new Map()
      let lossesToMons = new Map()
      for (let battle of battles) {
        if (battle.result === 'Won') {
          for (let mon of battle.opponent.team) {
            if (!mon.brought) {
              continue
            }
            winsAgainstMons.set(mon.name, winsAgainstMons.has(mon.name) ? winsAgainstMons.get(mon.name) + 1 : 1)
          }
        } else {
          for (let mon of battle.opponent.team) {
            if (!mon.brought) {
              continue
            }
            lossesToMons.set(mon.name, lossesToMons.has(mon.name) ? lossesToMons.get(mon.name) + 1 : 1)
            if (!winsAgainstMons.has(mon.name)) {
              winsAgainstMons.set(mon.name, 0)
            }
          }
        }
      }

      let mons = Array.from(lossesToMons.keys())

      function score(name) {
        // The higher this number is the more weight is given to commonly encountered mons
        const weight = 3

        const losses = lossesToMons.get(name)
        const wins = winsAgainstMons.get(name)
        const occurrences = losses + wins
        const numBattles = battles.length

        const occurrenceRate = occurrences / numBattles

        return (losses + (weight * occurrenceRate)) / (occurrences + weight)
      }

      mons.sort((a, b) => {
        return score(b) - score(a)
      })

      mons = mons.slice(0, 10)
      return mons.map((name) => {
        return {
          name: name,
          wins: winsAgainstMons.get(name),
          losses: lossesToMons.get(name),
          score: score(name)
        }
      })
    }
  },
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style scoped>
.picon {
  display: inline-block;
  width: 40px;
  height: 30px;
}
</style>