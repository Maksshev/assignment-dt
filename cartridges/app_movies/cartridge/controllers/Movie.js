'use strict'

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('QuickView', cache.applyDefaultCache, function (req, res, next) {
    const Movie = require('*/cartridge/models/movie');
    const MovieAdapter = require('*/cartridge/scripts/adapters/movieAdapter');
    const {getRenderedHtml} = require('*/cartridge/scripts/renderTemplateHelper');

    const movie = new Movie(req.querystring.id);
    const movieAdapter = new MovieAdapter(movie).adapt();

    res.json({
        renderedTemplate: getRenderedHtml(movieAdapter, 'movies/quickView'),
        productUrl: ''
    });

    next();
});

module.exports = server.exports();
