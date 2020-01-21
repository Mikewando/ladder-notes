<template>
  <div class="analysis container">
    <div class="level has-centered-text">
      <h1 class="level-item title">Analysis</h1>
    </div>

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
            <h2 class="title is-4">Tough Matchups</h2>
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

    <div class="section">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="box">
            <h2 class="title is-4">Positive Matchups</h2>
            <b-table :data="commonWins">
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
    calculateMatchups (score) {
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
            if (!lossesToMons.has(mon.name)) {
              lossesToMons.set(mon.name, 0)
            }
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

      mons.sort((a, b) => {
        const bScore = score({
          losses: lossesToMons.get(b),
          wins: winsAgainstMons.get(b),
          battles: battles.length
        })
        const aScore = score({
          losses: lossesToMons.get(a),
          wins: winsAgainstMons.get(a),
          battles: battles.length
        })
        return bScore - aScore
      })

      mons = mons.slice(0, 10)
      return mons.map((name) => {
        return {
          name: name,
          wins: winsAgainstMons.get(name),
          losses: lossesToMons.get(name),
          score: score({
          losses: lossesToMons.get(name),
          wins: winsAgainstMons.get(name),
          battles: battles.length
          })
        }
      })
    }
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
      return this.calculateMatchups(({ losses, wins, battles }) => {
        // The higher this number is the more weight is given to commonly encountered mons
        const weight = 3
        const occurrences = losses + wins
        const occurrenceRate = occurrences / battles
        return (losses + (weight * occurrenceRate)) / (occurrences + weight)
      })
    },
    commonWins () {
      return this.calculateMatchups(({ losses, wins, battles }) => {
        // The higher this number is the more weight is given to commonly encountered mons
        const weight = 3
        const occurrences = losses + wins
        const occurrenceRate = occurrences / battles
        return (wins + (weight * occurrenceRate)) / (occurrences + weight)
      })
    },
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