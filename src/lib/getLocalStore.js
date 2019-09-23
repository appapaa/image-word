const getLocalStore = (name) => {
    const store = window.localStorage[name];
    return store
        ? window.JSON.parse(store)
        : undefined;
}
export default getLocalStore;