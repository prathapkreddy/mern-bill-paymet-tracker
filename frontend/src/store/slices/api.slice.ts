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
        getCreditCardDetailsById: builder.query({
            query: cardId => ({ url: `/api/credit-cards/${cardId}`, method: 'GET' }),
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
            invalidatesTags: ['CreditCards'],
        }),
        deleteCreditCard: builder.mutation({
            query: (id: any) => ({
                url: `/api/credit-cards/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CreditCards'],
        }),

        getPayments: builder.query({
            query: () => ({ url: '/api/payments/', method: 'GET' }),
            providesTags: ['Payments'],
        }),
        addPayment: builder.mutation({
            query: data => ({
                url: '/api/payments/add',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Payments'],
        }),
        updatePayment: builder.mutation({
            query: ({ id, data }: { id: any; data: any }) => ({
                url: `/api/payments/${id}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: ['Payments'],
        }),
        deletePayment: builder.mutation({
            query: (id: any) => ({
                url: `/api/payments/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Payments'],
        }),

        getBills: builder.query({
            query: () => ({ url: '/api/bills/', method: 'GET' }),
            providesTags: ['Bills'],
        }),
        addBill: builder.mutation({
            query: data => ({
                url: '/api/bills/add',
                method: 'POST',
                data: data,
            }),
            invalidatesTags: ['Bills'],
        }),
        updateBill: builder.mutation({
            query: ({ id, data }: { id: any; data: any }) => ({
                url: `/api/bills/${id}`,
                method: 'PUT',
                data: data,
            }),
            invalidatesTags: ['Bills'],
        }),
        deleteBill: builder.mutation({
            query: (id: any) => ({
                url: `/api/bills/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bills'],
        }),
    }),
});

export const {
    useGetCreditCardsQuery,
    useGetCreditCardDetailsByIdQuery,
    useAddCreditCardMutation,
    useUpdateCreditCardMutation,
    useDeleteCreditCardMutation,
    useGetPaymentsQuery,
    useAddPaymentMutation,
    useUpdatePaymentMutation,
    useDeletePaymentMutation,
    useGetBillsQuery,
    useAddBillMutation,
    useUpdateBillMutation,
    useDeleteBillMutation,
} = apiSlice;
export default apiSlice.reducer;
