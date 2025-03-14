import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api.service/axios.init.ts';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    }),
    tagTypes: ['CreditCards', 'Payments', 'Bills'],
    endpoints: builder => ({
        getCreditCards: builder.query({
            query: () => ({ url: '/api/credit-cards/', method: 'GET' }),
            providesTags: ['CreditCards'],
        }),

        addCreditCard: builder.mutation({
            query: data => ({
                url: '/api/credit-cards/add',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['CreditCards'],
        }),

        updateCreditCard: builder.mutation({
            query: ({ id, data }: { id: any; data: any }) => ({
                url: `/api/credit-cards/${id}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: ['CreditCards'], // Invalidates the credit cards tag to refresh cache
        }),
    }),
});

export const { useGetCreditCardsQuery, useAddCreditCardMutation, useUpdateCreditCardMutation } = apiSlice;
export default apiSlice.reducer;
