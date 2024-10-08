// Checks whether the session storage is defined and not null
if (typeof sessionStorage === 'undefined' || sessionStorage === null) {
    (global as any).sessionStorage = {
        _data: {},
        setItem: function (key: string, value: string) {
            this._data[key] = value;
        },
        getItem: function (key: string) {
            return this._data.hasOwnProperty(key) ? this._data[key] : null;
        },
        removeItem: function (key: string) {
            delete this._data[key];
        },
        clear: function () {
            this._data = {};
        },
    };
}