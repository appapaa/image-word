export const closeApp = () => {
    if (window.confirm("Выйти из игры?")) {
        if (navigator.app) {
            navigator.app.exitApp();
        } else if (navigator.device) {
            navigator.device.exitApp();
        } else {
            window.close();
        }
    }
};