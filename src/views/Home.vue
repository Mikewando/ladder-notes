<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <router-link class="battle-link" v-for="id in 2" :key="id" :to="{ name: 'battle', params: { id: id } }">
      Battle {{id}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
