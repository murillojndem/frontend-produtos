<template>
  <div class="container">
    <h1 class="mb-4">Novo Produto</h1>
    
    <form @submit.prevent="salvar">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input 
          v-model="produto.nome" 
          class="form-control" 
          required
          maxlength="100"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Categoria</label>
        <input 
          v-model="produto.categoria" 
          class="form-control" 
          required
          maxlength="50"
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Preço</label>
        <input 
          v-model.number="produto.preco" 
          type="number" 
          step="0.01" 
          min="0"
          class="form-control" 
          required
        >
      </div>

      <div class="mb-3">
        <label class="form-label">Estoque</label>
        <input 
          v-model.number="produto.quantidadeEmEstoque" 
          type="number" 
          min="0"
          class="form-control" 
          required
        >
      </div>

      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" :disabled="carregando">
          <span v-if="carregando" class="spinner-border spinner-border-sm"></span>
          Salvar
        </button>
        <router-link to="/" class="btn btn-secondary">
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'CriarProduto',
  data() {
    return {
      produto: {
        nome: '',
        categoria: '',
        preco: '',
        quantidadeEmEstoque: ''
      },
      carregando: false
    };
  },
  methods: {
    async salvar() {
      this.loading = true;
      try {
        await api.criarProduto(this.produto);
        alert('Produto criado com sucesso!');
        this.$router.push('/');
      } catch (error) {
        alert('Erro ao criar produto: ' + error.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>