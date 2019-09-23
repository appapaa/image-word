const setLocalStore = (name, data) =>
    window.localStorage[name] = data ?
        JSON.stringify(data)
        : '';
export default setLocalStore;