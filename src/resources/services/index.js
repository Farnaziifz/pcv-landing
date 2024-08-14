import { createApi } from "@reduxjs/toolkit/dist/query/react";

import { axiosInstance } from "./axios";

const baseQuery = async ({ url, method = "GET", data, params }) => {
  const finalUrl = url;
  try {
    const result = await axiosInstance({ url: finalUrl, method, data, params });
    return {
      data: result.data,
    };
  } catch ({ request, ...err }) {
    const metaData = request?.response ? JSON.parse(request?.response) : {};
    return {
      error: {
        status: request?.status,
        ...metaData,
      },
    };
  }
};

export const apiInstance = createApi({
  baseQuery,
  serializeQueryArgs: (args) => args.endpointName,
  endpoints: () => ({}),
  keepUnusedDataFor: 0,
});

export * from "./axios";
