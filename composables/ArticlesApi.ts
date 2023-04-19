export const useArticlesApi = () => {
  const endpoint = 'articles';
  const { baseApi } = useBaseApi();

  const getArticleApi = async () => {
    const response = await baseApi(endpoint, {
      method: 'GET',
    });

    return response;
  };

  const postArticleApi = async (articleData:[]) => {
    const response = await baseApi(endpoint, {
      body: {
        ...articleData,
      },
      method: 'POST',
    });

    return response;
  };

  const deleteArticleById = async (id:number) => {
    const response = await baseApi(`${id}`, {
      method: 'DELETE',
    });

    return response;
  };

  return {
    getArticleApi,
    postArticleApi,
    deleteArticleById,
  };
};
