<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Produtos</h1>
      <router-link to="/criar" class="btn btn-success">
        <i class="bi bi-plus-circle"></i> Novo Produto
      </router-link>
    </div>

    <div v-if="carregando" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
    </div>

    <div v-else>
      <div v-if="produtos.length === 0" class="alert alert-info">
        Nenhum produto cadastrado.
      </div>

      <table v-else class="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>Nome</th>
            <th>Data</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Disponível</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="produto in produtos" :key="produto.Id">
            <td>{{ produto.nome }}</td>
            <td>{{ new Date(produto.dataInclusao).toLocaleDateString('pt-BR', options) }}</td>
            <td>{{ produto.categoria }}</td>
            <td>R$ {{ formatarPreco(produto.preco) }}</td>
            <td>{{ produto.quantidadeEmEstoque }}</td>
            <td>
              <span :class="{'text-success': produto.disponivel, 'text-danger': !produto.disponivel}">
                {{ produto.disponivel ? 'Sim' : 'Não' }}
              </span>
            </td>
            <td>
              <router-link 
                :to="'/editar/' + produto.id" 
                class="btn btn-primary btn-sm me-2">
                <i class="bi bi-pencil"></i>
                Editar
              </router-link>
              <button 
                @click="confirmarExclusao(produto.id)" 
                class="btn btn-danger btn-sm">
                <i class="bi bi-trash"></i>
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  name: 'ListaProdutos',
  data() {
    return {
      produtos: [],
      carregando: true
    };
  },
  async created() {
    await this.carregarProdutos();
  },
  methods: {
    async carregarProdutos() {
      try {
        const response = await api.listarProdutos();
        this.produtos = response.data;
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Não foi possível carregar os produtos');
      } finally {
        this.carregando = false;
      }
    },
    formatarPreco(valor) {
      return valor?.toFixed?.(2) || '0.00';
    },

    async confirmarExclusao(id) {
      const confirmado = window.confirm('Tem certeza que deseja excluir este produto?');
      if (confirmado) {
        try {
          await api.excluirProduto(id);
          await this.carregarProdutos();
          alert('Produto excluído com sucesso!');
        } catch (error) {
          console.error('Erro ao excluir produto:', error);
          alert('Falha ao excluir o produto. Verifique o console para detalhes.');
        }
      }
    }
  }
};
</script>