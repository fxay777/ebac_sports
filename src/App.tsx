import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { GlobalStyle } from './styles'
import { useGetProductsQuery } from '../src/components/services/api'
import { addItem as addToCart } from '../src/components/Store/cartSlice'
import { toggleFavorite } from '../src/components/Store/favoritesSlice'
import { RootState } from '../src/components/Store'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const dispatch = useDispatch()
  const { data: produtos = [] } = useGetProductsQuery()
  const carrinho = useSelector((state: RootState) => state.cart.items)
  const favoritos = useSelector((state: RootState) => state.favorites.items)

  function adicionarAoCarrinho(produto: Produto) {
    if (carrinho.some(p => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(addToCart({ ...produto, quantity: 1 }))
    }
  }

  function favoritar(produto: Produto) {
    dispatch(toggleFavorite(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos} itensNoCarrinho={carrinho} />
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
