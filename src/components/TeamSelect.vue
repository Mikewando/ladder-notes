<template>
  <div class="team">
    <h1>{{ owner }}</h1>
    <multiselect v-for="index in 6" :key="index" v-model="opponentTeam[index]" :options="options" :option-height="30" :custom-label="searchLabel" placeholder="">
      <template slot="placeholder">
        <div class="plabel">
          <span class="picon" style="background:transparent url(https://play.pokemonshowdown.com/sprites/pokemonicons-sheet.png?g8) no-repeat scroll -0px -0px"></span>
          <span class="pname">Select Pokemon</span>
        </div>
      </template>
      <template slot="singleLabel" slot-scope="props">
        <div class="plabel">
          <span class="picon" :style="props.option.style"></span>
          <span class="pname">{{ props.option.name }}</span>
        </div>
      </template>
      <template slot="option" slot-scope="props">
        <div class="plabel">
          <span class="picon" :style="props.option.style"></span>
          <span class="pname">{{ props.option.name }}</span>
        </div>
      </template>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'TeamSelect',
  props: {
    owner: String
  },
  components: {
    Multiselect
  },
  methods: {
    searchLabel ({ name }) {
      return name.toLowerCase()
    }
  },
  data () {
    const options = Object.entries(BattlePokedex)
      .filter(([key, value]) => {
        return value && value.num >= 0
      })
      .map(([key, value]) => {
        return {
          name: value.species,
          style: Dex.getPokemonIcon(key)
        }
      })
    return {
      opponentTeam: {},
      options: options
    }
  },
  mounted () {
    console.log('Mounted')
  }
}
</script>

<style>
/* This is all kind of a hack... */
.team .multiselect__tags {
  min-height: 48px;
  padding: 0;
}
.team .multiselect__single {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-right: 12px;
  padding-left: 12px;
}
.team .multiselect__input {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-right: 52px;
  padding-left: 52px;
  font-size: 16px;
  line-height: 30px;
}
.team .multiselect__placeholder {
  font-size: 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-right: 12px;
  margin-left: 12px;
  padding: 0;
}
.team .multiselect__select::before {
  z-index: 10;
}
.team .multiselect__select {
  z-index: 10;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* default stuff */
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

/* custom stuff */
.team {
  max-width: 500px;
}
.picon {
  display: inline-block;
  width: 40px;
  height: 30px;
}
.plabel {
  display: flex;
  align-items: center;
}
</style>
