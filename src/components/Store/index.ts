import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../Cart/cartSlice'
import favoritesReducer from '../Cart/favoritesSlice'
import { api } from '../services/api'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorites: favoritesReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState> // Tipo do estado global
export type AppDispatch = typeof store.dispatch // Tipo do dispatch
export default store
