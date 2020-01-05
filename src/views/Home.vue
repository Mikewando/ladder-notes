<template>
  <div class="home">
    <h1 class="title">Battles</h1>
    <div class="battles">
      <router-link
          v-for="id in 2"
          :key="id"
          tag="b-button"
          class="battle-link"
          :to="{ name: 'battle', params: { id: id } }">
        Battle {{id}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
.battles {
  display: grid;
  grid-row: 1fr;
  grid-gap: 10px;
  max-width: 300px;
  margin: auto;
}
</style>