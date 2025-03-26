import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default {
  async listarProdutos() {
    return api.get('/Produto');
  },

  async criarProduto(produto) {
    return api.post('/Produto', {
      Nome: produto.nome,
      Categoria: produto.categoria,
      Preco: Number(produto.preco),
      QuantidadeEmEstoque: Number(produto.quantidadeEmEstoque)
    });
  },

  async buscarProduto(id) {
    const response = await api.get(`/Produto/${id}`);
    return response.data;
  },

  async atualizarProduto(id, produto) {
    const response = await api.put(`/Produto/${id}`, {
      Nome: produto.nome,
      Categoria: produto.categoria,
      Preco: produto.preco,
      QuantidadeEmEstoque: produto.quantidadeEmEstoque
    });
    return response.data;
  },

  async excluirProduto(id) {
    await api.delete(`/Produto/${id}`);
  }
};