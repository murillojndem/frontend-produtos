<template>
  <div class="container">
    <h1 class="mb-4">Editar Produto</h1>

    <div v-if="carregando" class="text-center my-4">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <template v-else>
      <div v-if="produto">
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
            <button type="submit" class="btn btn-primary">
              Salvar
            </button>
            <router-link to="/" class="btn btn-secondary">
              Cancelar
            </router-link>
          </div>
        </form>
      </div>

      <div v-else class="alert alert-danger">
        Produto não encontrado!
      </div>
    </template>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'EditarProduto',
  props: ['id'],
  data() {
    return {
      produto: {
        nome: "",
        categoria: "",
        preco: 0,
        quantidadeEmEstoque: 0
      },
      carregando: true
    };
  },
  async created() {
    try {
      if (!this.id) {
        alert('ID inválido!');
        return this.$router.push('/');
      }
      const response = await api.buscarProduto(this.id);
      this.produto = response;

    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      this.produto = null;
    } finally {
      this.carregando = false;
    }
  },
  methods: {
    async salvar() {
      try {
        await api.atualizarProduto(this.id, this.produto);
        alert('Produto atualizado com sucesso!');
        this.$router.push('/');
      } catch (error) {
        alert(`Erro ao atualizar: ${error.response?.data?.message || error.message}`);
      }
    }
  }
};
</script>