import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:4000' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/produtos'
    })
  })
})

export const { useGetProductsQuery } = api
