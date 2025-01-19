import React from 'react'
import { useAppDispatch, useAppSelector } from './components/store/hooks'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { useGetProductsQuery } from './components/services/api'
import { addItem as addToCart } from './components/Cart/cartSlice'
import { toggleFavorite } from './components/Cart/favoritesSlice'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

export type CartItem = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

function App() {
  const dispatch = useAppDispatch()

  // Busca os produtos da API
  const { data: produtos = [] } = useGetProductsQuery(undefined)

  // Seletores para carrinho e favoritos
  const carrinho = useAppSelector((state) => state.cart.items)
  const favoritos = useAppSelector((state) => state.favorites.items)

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto: Produto) => {
    const produtoExistente = carrinho.find(
      (item: CartItem) => item.id === produto.id
    )

    if (produtoExistente) {
      alert('Item já adicionado ao carrinho.')
      return
    }

    dispatch(
      addToCart({
        id: produto.id,
        title: produto.nome,
        price: produto.preco,
        image: produto.imagem,
        quantity: 1
      })
    )
  }

  // Função para favoritar/desfavoritar produto
  const favoritar = (produto: Produto) => {
    dispatch(toggleFavorite(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header
          favoritos={favoritos}
          itensNoCarrinho={carrinho.map((item: CartItem) => ({
            id: item.id,
            nome: item.title,
            preco: item.price,
            imagem: item.image
          }))}
        />
        <Produtos
          produtos={produtos}
          favoritos={favoritos}
          favoritar={favoritar}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
