var App;

var LocalStorageHelper = (function () {
    function LocalStorageHelper() {
    }
    LocalStorageHelper.supportsLocalStorage = function () {
        try  {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    LocalStorageHelper.Set = function (key, value) {
        if (!LocalStorageHelper.supportsLocalStorage()) {
            return false;
        }
        localStorage.setItem(LocalStorageHelper.StorageName + key, value);
    };

    LocalStorageHelper.Get = function (key) {
        if (!LocalStorageHelper.supportsLocalStorage()) {
            return null;
        }
        var value = localStorage[LocalStorageHelper.StorageName + key];
        return value;
    };

    LocalStorageHelper.Del = function (key) {
        if (!LocalStorageHelper.supportsLocalStorage()) {
            return null;
        }
        localStorage.removeItem(LocalStorageHelper.StorageName + key);
    };
    LocalStorageHelper.StorageName = "OSA_Activation_";
    return LocalStorageHelper;
})();
