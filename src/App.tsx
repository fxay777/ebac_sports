import React from 'react'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { useGetProductsQuery } from './components/services/api'
import { useAppDispatch } from './components/Store/store' // Use o dispatch tipado
import { addItem as addToCart } from './components/Store/cartSlice'
import { toggleFavorite } from './components/Store/favoritesSlice'
import { RootState } from './components/Store/store'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useAppDispatch() // Dispatch tipado

  const { data: produtos = [] } = useGetProductsQuery()

  const carrinho = useSelector((state: RootState) => state.cart.items)
  const favoritos = useSelector((state: RootState) => state.favorites.items)

  const adicionarAoCarrinho = (produto: Produto) => {
    const produtoExistente = carrinho.find((p) => p.id === produto.id)

    if (produtoExistente) {
      alert('Item já adicionado')
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

  const favoritar = (produto: Produto) => {
    dispatch(toggleFavorite(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header
          favoritos={favoritos}
          itensNoCarrinho={carrinho.map((item) => ({
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
