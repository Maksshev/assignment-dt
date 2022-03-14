'use strict';

/**
 * @namespace Search
 */

const server = require('server');
const cache = require('*/cartridge/scripts/middleware/cache');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

/* Models */
const Movies = require('*/cartridge/models/movies');

/* Adapters */
const MoviesAdapter = require('*/cartridge/scripts/adapters/moviesAdapter');

server.extend(module.superModule);

server.replace('Show', cache.applyDefaultCache, consentTracking.consent, function (req, res, next) {
    const movies = new Movies(req.querystring);
    const adaptedSearch = new MoviesAdapter(movies, req.querystring).adapt();

    res.render('search/searchResults', adaptedSearch);

    next();
});

server.replace('ShowAjax', cache.applyDefaultCache, consentTracking.consent, function (req, res, next) {
    const movies = new Movies(req.querystring);
    const adaptedSearch = new MoviesAdapter(movies, req.querystring).adapt();

    res.render('search/productGrid', adaptedSearch);

    next();
});

module.exports = server.exports();
