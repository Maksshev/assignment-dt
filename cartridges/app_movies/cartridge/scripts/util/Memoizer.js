'use strict'

const HashMap = require('dw/util/HashMap');

/**
 * @description Memoizer that allows to store object in memory instead of recalculating
 * @constructor
 */
function Memoizer() {
    this.storage = new HashMap();
}

/**
 * @description Returns value from storage if any, retrieves value from callback and stores it otherwise
 * @param key {object}
 * @param callback {function}
 * @return {object}
 */
Memoizer.prototype.get = function (key, callback) {
    if (this.storage.containsKey(key)) {
        return this.storage.get(key);
    }

    const value = callback();
    this.storage.put(key, value);
    return value;
}

module.exports = Memoizer;
