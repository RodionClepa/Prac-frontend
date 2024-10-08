if (typeof localStorage === 'undefined' || localStorage === null) {
    (global as any).localStorage = {
        _data: new Map(),

        setItem: function (key: string, value: string) {
            this._data.set(String(key), String(value));
        },

        getItem: function (key: string) {
            return this._data.has(String(key)) ? this._data.get(String(key)) : null;
        },

        removeItem: function (key: string) {
            this._data.delete(String(key));
        },

        clear: function () {
            this._data.clear();
        },

        key: function (i: number) {
            if (arguments.length === 0) {
                throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.");
            }
            const arr = Array.from(this._data.keys());
            return arr[i];
        },

        get length() {
            return this._data.size;
        }
    };
}

