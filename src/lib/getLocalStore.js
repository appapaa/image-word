const getLocalStore = (name) => {
    const store = window.localStorage(name);
    return store
        ? window.JSON.parse(window.localStorage(name))
        : undefined;
}
export default getLocalStore;