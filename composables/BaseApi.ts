export const useBaseApi = (headers = {}, parameters = {}) => {
  const baseApi = $fetch.create({
    baseURL: 'http://145.24.223.227:8080/api/',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    ...parameters,
  });

  return {
    baseApi,
  };
};
