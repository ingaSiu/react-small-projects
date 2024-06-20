/* eslint-disable no-unused-vars */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// baseUrl now is empty string because we are using proxy
// without proxy it would be localhost...
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
