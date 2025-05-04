import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { removeFromCart } from '../../store/cartSlice'

// Exemplo:
const cartItems = useSelector((state: RootState) => state.cart.items)
const dispatch = useDispatch()

// Para remover:
dispatch(removeFromCart(id))
