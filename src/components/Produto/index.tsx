import { useGetProductsQuery } from '../../store/api'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'

const { data: products, isLoading } = useGetProductsQuery()
const dispatch = useDispatch()

if (isLoading) return <p>Carregando...</p>

return (
  <>
    {products?.map(product => (
      <div key={product.id}>
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <button onClick={() => dispatch(addToCart(product))}>
          Adicionar ao carrinho
        </button>
      </div>
    ))}
  </>
)
