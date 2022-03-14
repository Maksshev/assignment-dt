'use strict';

/* Utils */
const Memoizer = require('*/cartridge/scripts/util/Memoizer');

function Movies(queryString) {
    this.queryString = queryString;
    this.memoizer = new Memoizer();
}

Object.defineProperties(Movies.prototype, {
    data: {
        get: getData
    }
});

function getData() {
    return this.memoizer.get('data', () => getMovieSearchService()
        .call(this)
        .getObject()
    );
}

function getMovieSearchService() {
    const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

    return LocalServiceRegistry.createService('movie.db', {
        createRequest: function (service, params) {
            service.setRequestMethod('GET');
            service.addParam('language', params.queryString.lang);
            service.addParam('query', params.queryString.q || '');
            service.addParam('page', params.queryString.page || '1');
            service.addParam('include_adult', 'false');

            service.addParam(
                'api_key',
                service
                    .getConfiguration()
                    .getCredential()
                    .getPassword()
            );
        },
        parseResponse: function (service, result) {
            try {
                return JSON.parse(result.text);
            } catch (e) {
                return { 'page': 1, 'results': [], 'total_pages': 0, 'total_results': 0 };
            }
        }
    });
}

module.exports = Movies;
