export const useArticlesStore = defineStore('articlesStore', {
    state: () => ({
        items: [],
    }),
    actions: {},
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot));
}