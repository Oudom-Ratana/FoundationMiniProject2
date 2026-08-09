import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseApi } from './baseApi';

// create api slice of ecommerce
export const productApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({
        // crud
        getAllProducts: builder.query({
            query: ({ page = 0, size = 10 } = {}) => `/products?page=${page}&size=${size}`,
            providesTags: ["Products"]
        }),
        //  get single product
        getProductByUuid: builder.query({
            query: (uuid)=> `/products/${uuid}`
        }),

        // create product
        addNewProduct: builder.mutation({
            query: ({createProduct}) =>(
                {
                method: 'POST',
                url:   `/products`,

                body: createProduct
            })
        }),
        
        //Update product
        updateProductByUUID: builder.mutation({
            query: ({updateProduct,  uuid}) =>(
                {
                method: 'PUT',
                url:   `/products/${uuid}`,
         
                body: updateProduct
            })
        }),
        
        // delete product by uuid
        deleteProductByUUID: builder.mutation({
            query: ({uuid}) =>(
                {
                method: 'DELETE',
                url:   `/products/${uuid}`,
       
            })
        })

    }) 
})

export const {
    useGetAllProductsQuery,
    useGetProductByUuidQuery, 
    useAddNewProductMutation,
    useUpdateProductByUUIDMutation,
    useDeleteProductByUUIDMutation
} = productApi;