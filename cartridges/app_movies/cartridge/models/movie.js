'use strict';

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

const Memoizer = require('*/cartridge/scripts/util/Memoizer');

function Movie(id) {
    this.id = id;
    this.memoizer = new Memoizer();
}

Object.defineProperties(Movie.prototype, {
    videos: {
        get: getVideos
    },
    data: {
        get: getData
    }
});

Movie.prototype.toPlainObject = function () {
    return {
        videos: this.videos,
        data: this.data
    }
}

Movie.prototype.toJSON = function () {
    return JSON.stringify(this.toPlainObject());
}

function getVideos() {
    return this.memoizer.get('videos', () => getVideoFetchService()
        .call(this)
        .getObject()

    );
}

function getData() {
    return this.memoizer.get('data', () => getMovieService()
        .call(this)
        .getObject());
}

function getVideoFetchService() {
    return LocalServiceRegistry.createService('movie.videos', {
        createRequest: function (service, params) {
            const { buildQueryStringFromObject } = require('*/cartridge/scripts/util/urlUtils');

            const url = service.getURL()
                .replace('{id}', params.id);

            service.setRequestMethod('GET');
            service.setURL(url + buildQueryStringFromObject({
                'language': request.getLocale(),
                'api_key': service.getConfiguration()
                    .getCredential()
                    .getPassword()
            }));
        },
        parseResponse: function (service, result) {
            try {
                return JSON.parse(result.text).results || [];
            } catch (e) {
                return [];
            }
        }
    });
}

function getMovieService() {
    return LocalServiceRegistry.createService('movie.data', {
        createRequest: function (service, params) {
            const { buildQueryStringFromObject } = require('*/cartridge/scripts/util/urlUtils');

            service.setRequestMethod('GET');

            const url = service.getURL().replace('{id}', params.id);

            service.setURL(url + buildQueryStringFromObject({
                'language': request.getLocale(),
                'api_key': service.getConfiguration()
                    .getCredential()
                    .getPassword()
            }));
        },
        parseResponse: function (service, result) {
            try {
                return JSON.parse(result.text);
            } catch (e) {
                return {};
            }
        }
    })
}

module.exports = Movie;
