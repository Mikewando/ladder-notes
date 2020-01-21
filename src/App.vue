<template>
  <div id="app">
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <router-link to="/">Home</router-link> |
        <router-link to="/team">Team</router-link> |
        <router-link to="/analysis">Analysis</router-link>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/app.scss"
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  white-space: pre;
}

nav a {
  font-weight: bold;
}
</style>
