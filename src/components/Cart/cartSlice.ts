import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type CartItem = {
  id: number
  title: string
  price: number
  image: string // Adicionando a propriedade "image"
  quantity: number
}

type CartState = {
  items: CartItem[]
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )
      if (itemIndex >= 0) {
        // Incrementa a quantidade se o item já estiver no carrinho
        state.items[itemIndex].quantity += action.payload.quantity
      } else {
        // Adiciona o novo item ao carrinho
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      // Remove o item do carrinho pelo ID
      state.items = state.items.filter((item) => item.id !== action.payload)
    }
  }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer
