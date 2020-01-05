<template>
  <div class="home">
    <div class="link-wrapper" v-for="id in 2" :key="id">
      <router-link tag="button" class="battle-link" :to="{ name: 'battle', params: { id: id } }">
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
.link-wrapper {
  display: block;
  width: 100%;
}
</style>