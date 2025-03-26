<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <router-link to="/" class="navbar-brand">Desafio CRUD de produtos</router-link>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
</style>