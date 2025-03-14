import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '@/api.service/axios.init.ts';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    tagTypes: ['Posts'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => ({ url: '/posts', method: 'GET' }),
            providesTags: ['Posts'],
        }),

        addPost: builder.mutation({
            query: newPost => ({
                url: '/posts',
                method: 'POST',
                data: newPost,
            }),
            invalidatesTags: ['Posts'],
        }),
    }),
});

export const { useGetPostsQuery, useAddPostMutation } = apiSlice;
export default apiSlice.reducer;
