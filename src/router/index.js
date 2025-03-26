import { createRouter, createWebHistory } from 'vue-router'
import ListaProdutos from '../views/Produtos.vue'
import CriarProduto from '../views/Criar.vue'
import EditarProduto from '../views/Editar.vue'

const routes = [
  {
    path: '/',
    name: 'produtos',
    component: ListaProdutos
  },
  {
    path: '/criar',
    name: 'criar-produto',
    component: CriarProduto
  },
  {
    path: '/editar/:id',
    name: 'editar-produto',
    component: EditarProduto,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router